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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const gdprSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom doit contenir moins de 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email doit contenir moins de 255 caractères"),
  requestType: z.string().min(1, "Veuillez sélectionner un type de demande"),
  message: z.string().trim().min(1, "Le message est requis").max(1000, "Le message doit contenir moins de 1000 caractères"),
});

type GDPRFormData = z.infer<typeof gdprSchema>;

interface GDPRFormDialogProps {
  children: React.ReactNode;
}

const requestTypes = [
  { value: "access", label: "Droit d'accès - Obtenir une copie de mes données" },
  { value: "rectification", label: "Droit de rectification - Corriger mes données" },
  { value: "deletion", label: "Droit à l'effacement - Supprimer mes données" },
  { value: "limitation", label: "Droit à la limitation - Restreindre le traitement" },
  { value: "portability", label: "Droit à la portabilité - Recevoir mes données" },
  { value: "opposition", label: "Droit d'opposition - M'opposer au traitement" },
  { value: "other", label: "Autre demande" },
];

const GDPRFormDialog = ({ children }: GDPRFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<GDPRFormData>({
    name: "",
    email: "",
    requestType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GDPRFormData, string>>>({});
  const { toast } = useToast();

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  const handleChange = (field: keyof GDPRFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = gdprSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof GDPRFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof GDPRFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const requestLabel = requestTypes.find(r => r.value === result.data.requestType)?.label || result.data.requestType;
      
      const { error } = await supabase.functions.invoke("send-gdpr-request", {
        body: {
          ...result.data,
          requestTypeLabel: requestLabel,
        },
      });

      if (error) {
        throw error;
      }

      setFormData({ name: "", email: "", requestType: "", message: "" });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error sending GDPR request:", error);
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
                Votre demande RGPD a bien été reçue. Nous vous répondrons dans un délai maximum de 30 jours conformément à la réglementation.
              </DialogDescription>
            </DialogHeader>
            <Button variant="outline" onClick={() => handleClose(false)} className="mt-4">
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Exercer vos droits RGPD</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Remplissez ce formulaire pour exercer vos droits sur vos données personnelles.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="gdpr-name">Nom complet *</Label>
                <Input
                  id="gdpr-name"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gdpr-email">Email *</Label>
                <Input
                  id="gdpr-email"
                  type="email"
                  placeholder="jean@exemple.fr"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gdpr-type">Type de demande *</Label>
                <Select
                  value={formData.requestType}
                  onValueChange={(value) => handleChange("requestType", value)}
                >
                  <SelectTrigger className={errors.requestType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez votre demande" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requestType && <p className="text-sm text-destructive">{errors.requestType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gdpr-message">Détails de votre demande *</Label>
                <Textarea
                  id="gdpr-message"
                  placeholder="Précisez votre demande (données concernées, contexte, etc.)..."
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

export default GDPRFormDialog;
