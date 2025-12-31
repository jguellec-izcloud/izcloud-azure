import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// HTML escape function to prevent XSS attacks
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration: 5 requests per hour per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// Clean up expired entries periodically
const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Check and update rate limit for an IP
const checkRateLimit = (ip: string): { allowed: boolean; remaining: number } => {
  cleanupRateLimitStore();
  
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    // First request or window expired - create new record
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0 };
  }
  
  // Increment count
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
};

// Disposable email domains blacklist
const disposableEmailDomains = [
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.org', 'tempmail.com', 
  'temp-mail.org', '10minutemail.com', 'throwaway.email', 'fakeinbox.com',
  'trashmail.com', 'mailnesia.com', 'tempinbox.com', 'dispostable.com',
  'yopmail.com', 'yopmail.fr', 'sharklasers.com', 'guerrillamailblock.com',
  'pokemail.net', 'spam4.me', 'grr.la', 'getairmail.com', 'mohmal.com',
  'tempail.com', 'burnermail.io', 'maildrop.cc', 'mailsac.com', 'getnada.com',
  'emailondeck.com', 'mintemail.com', 'tempr.email', 'discard.email',
  'fakemailgenerator.com', 'emailfake.com', 'crazymailing.com', 'tempmailo.com'
];

const isDisposableEmail = (email: string): boolean => {
  const domain = email.toLowerCase().split('@')[1];
  return domain ? disposableEmailDomains.includes(domain) : false;
};

// Input validation function
const validateInput = (data: ContactEmailRequest): { valid: boolean; error?: string } => {
  // Validate required fields
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (!data.email || typeof data.email !== "string" || data.email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  if (!data.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  
  // Validate lengths (server-side enforcement)
  if (data.name.length > 100) {
    return { valid: false, error: "Name must be less than 100 characters" };
  }
  if (data.email.length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  if (data.message.length > 1000) {
    return { valid: false, error: "Message must be less than 1000 characters" };
  }
  if (data.phone && data.phone.length > 20) {
    return { valid: false, error: "Phone must be less than 20 characters" };
  }
  if (data.company && data.company.length > 100) {
    return { valid: false, error: "Company must be less than 100 characters" };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }
  
  // Check for disposable email domains
  if (isDisposableEmail(data.email)) {
    return { valid: false, error: "Disposable email addresses are not allowed" };
  }
  
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
  // Check rate limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json", 
          "Retry-After": "3600",
          ...corsHeaders 
        },
      }
    );
  }

  try {
    const requestData: ContactEmailRequest = await req.json();

    // Validate input server-side
    const validation = validateInput(requestData);
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, company, message } = requestData;

    // Escape all user inputs for HTML safety
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : "";
    const safeCompany = company ? escapeHtml(company.trim()) : "";
    // For message: escape first, then convert newlines to <br> tags
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

    console.log(`Processing contact form submission from: ${safeEmail}`);

    // Send notification email to the business
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IzCloud <noreply@izcloud.fr>",
        to: ["julien@izcloud.fr"],
        subject: `Nouvelle demande d'audit - ${safeCompany || safeName}`,
        html: `
          <h2>Nouvelle demande d'audit gratuit</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          ${safePhone ? `<p><strong>Téléphone :</strong> ${safePhone}</p>` : ""}
          ${safeCompany ? `<p><strong>Entreprise :</strong> ${safeCompany}</p>` : ""}
          <p><strong>Message :</strong></p>
          <p>${safeMessage}</p>
          <hr>
          <p><em>Ce message a été envoyé depuis le formulaire de contact du site IzCloud.</em></p>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.json();
      console.error("Failed to send notification email:", errorData);
      throw new Error("Failed to send notification email");
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the user
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IzCloud <noreply@izcloud.fr>",
        to: [email], // Use original email for sending (not escaped)
        subject: "Votre demande d'audit a bien été reçue - IzCloud",
        html: `
          <h2>Merci pour votre demande, ${safeName} !</h2>
          <p>Nous avons bien reçu votre demande d'audit gratuit.</p>
          <p>Notre équipe vous recontactera dans les plus brefs délais pour planifier un rendez-vous.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe IzCloud</strong></p>
          <p>Experts en cybersécurité et infogérance</p>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email, but notification was sent");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to avoid leaking internal details
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
