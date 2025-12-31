import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

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
const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom doit contenir moins de 100 caractères"),
  email: z.string().trim()
    .email("Adresse email invalide")
    .max(255, "L'email doit contenir moins de 255 caractères")
    .refine((val) => !isDisposableEmail(val), {
      message: "Les adresses email temporaires ne sont pas acceptées",
    }),
  phone: z.string().trim()
    .max(20, "Le numéro doit contenir moins de 20 caractères")
    .refine((val) => val === "" || phoneRegex.test(val), {
      message: "Format invalide (ex: 06 12 34 56 78 ou +33 6 12 34 56 78)",
    })
    .optional(),
  company: z.string().trim().max(100, "Le nom d'entreprise doit contenir moins de 100 caractères").optional(),
  message: z.string().trim().min(1, "Le message est requis").max(1000, "Le message doit contenir moins de 1000 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormDialogProps {
  children: React.ReactNode;
}

const ContactFormDialog = ({ children }: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { toast } = useToast();

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset success state when dialog closes
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: result.data,
      });

      if (error) {
        throw error;
      }

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <DialogHeader className="space-y-2">
              <DialogTitle className="font-heading text-xl">Demande envoyée !</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Merci pour votre demande d'audit. Notre équipe vous recontactera rapidement pour planifier un rendez-vous.
              </DialogDescription>
            </DialogHeader>
            <Button variant="outline" onClick={() => handleClose(false)} className="mt-4">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">C'est ici que débute notre relation</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@entreprise.fr"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    placeholder="Nom de l'entreprise"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Votre besoin *</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez brièvement votre projet ou vos besoins..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
