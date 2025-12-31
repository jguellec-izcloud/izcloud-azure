import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import ContactFormDialog from "@/components/ContactFormDialog";

const CTA = () => {
  return <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-card border border-border p-12 md:p-16 text-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 cyber-grid opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-primary">
              <Shield className="w-10 h-10 text-primary" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à <span className="text-gradient">Sécuriser Votre Entreprise ?</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Obtenez une évaluation de sécurité gratuite et découvrez comment nous pouvons protéger 
              votre organisation contre les cybermenaces. Sans engagement, juste des conseils d'experts.
            </p>

            <ContactFormDialog>
              <Button variant="hero" size="xl">
                Programmer un Audit gratuit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </ContactFormDialog>

            {/* Trust Text */}
            <p className="mt-8 text-sm text-muted-foreground">Réponse rapide garantie</p>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;