import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Server } from "lucide-react";
import ContactFormDialog from "@/components/ContactFormDialog";

const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero cyber-grid pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 opacity-0 animate-fade-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Solutions de Sécurité Professionnelles</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up animation-delay-200">
            Sécurisez Votre
            <br />
            <span className="text-gradient">Infrastructure Numérique</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up animation-delay-400">Solutions complètes d'infogérance et de cybersécurité qui protègent votre entreprise contre les menaces les plus évoluées, tout en vous libérant des contraintes liées à l'administration de votre informatique.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-600">
            <ContactFormDialog>
              <Button variant="hero" size="xl">
                Programmer un Audit gratuit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </ContactFormDialog>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-up animation-delay-600">
            <div className="flex flex-col items-center">
              <Lock className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Certifié SOC 2</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">ISO 27001</span>
            </div>
            <div className="flex flex-col items-center">
              <Server className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">99.9% Disponibilité</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default Hero;