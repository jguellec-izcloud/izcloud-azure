import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GDPRRequest {
  name: string;
  email: string;
  requestType: string;
  requestTypeLabel: string;
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

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

const checkRateLimit = (ip: string): { allowed: boolean; remaining: number } => {
  cleanupRateLimitStore();
  
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
};

// Input validation function
const validateInput = (data: GDPRRequest): { valid: boolean; error?: string } => {
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (!data.email || typeof data.email !== "string" || data.email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  if (!data.requestType || typeof data.requestType !== "string") {
    return { valid: false, error: "Request type is required" };
  }
  if (!data.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  
  if (data.name.length > 100) {
    return { valid: false, error: "Name must be less than 100 characters" };
  }
  if (data.email.length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  if (data.message.length > 1000) {
    return { valid: false, error: "Message must be less than 1000 characters" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }
  
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received GDPR request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
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
    const requestData: GDPRRequest = await req.json();

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

    const { name, email, requestType, requestTypeLabel, message } = requestData;

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeRequestType = escapeHtml(requestTypeLabel || requestType);
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

    console.log(`Processing GDPR request from: ${safeEmail}, type: ${requestType}`);

    // Send notification email to the business
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IzCloud RGPD <noreply@izcloud.fr>",
        to: ["julien@izcloud.fr"],
        subject: `[RGPD] ${safeRequestType} - ${safeName}`,
        html: `
          <h2>Nouvelle demande RGPD</h2>
          <p><strong>Type de demande :</strong> ${safeRequestType}</p>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Détails :</strong></p>
          <p>${safeMessage}</p>
          <hr>
          <p><em>⚠️ Rappel : Vous avez 30 jours maximum pour répondre à cette demande conformément au RGPD.</em></p>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.json();
      console.error("Failed to send notification email:", errorData);
      throw new Error("Failed to send notification email");
    }

    console.log("GDPR notification email sent successfully");

    // Send confirmation email to the user
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IzCloud <noreply@izcloud.fr>",
        to: [email],
        subject: "Confirmation de votre demande RGPD - IzCloud",
        html: `
          <h2>Votre demande a bien été reçue, ${safeName}</h2>
          <p>Nous avons bien reçu votre demande concernant vos données personnelles :</p>
          <p><strong>Type de demande :</strong> ${safeRequestType}</p>
          <br>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), nous traiterons votre demande dans un délai maximum de <strong>30 jours</strong>.</p>
          <p>Si nous avons besoin d'informations complémentaires pour vérifier votre identité ou préciser votre demande, nous vous contacterons.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe IzCloud</strong></p>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email, but notification was sent");
    } else {
      console.log("GDPR confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "GDPR request sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-gdpr-request function:", error);
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
