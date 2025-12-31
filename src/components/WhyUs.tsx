import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Experts en sécurité dédiés assignés à votre compte",
  "Plus de 19 années d'expertise chez les GAFAM",
  "Utilisation d'outils de pointes dotés de fonctionnalités d'IA",
  "Chasse aux menaces proactive et gestion des vulnérabilités",
  "Intégration transparente avec votre infrastructure existante",
  "Rapports de sécurité réguliers",
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Pourquoi Nous Choisir
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Votre Partenaire <span className="text-gradient">Sécurité de Confiance</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Nous allons au-delà des services de sécurité standards. Notre équipe devient une extension 
              de votre organisation, fournissant des solutions personnalisées qui évoluent avec 
              les besoins de votre entreprise.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Notre force réside dans notre capacité à démocratiser des outils de pointe, habituellement 
              réservés aux grands groupes, en adaptant nos solutions et nos tarifs aux besoins des plus petites structures.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <a href="#contact">
              <Button variant="hero" size="lg">
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-card rounded-3xl p-8 border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_hsl(var(--primary)/0.15)] hover:border-primary/50 group">
              {/* Terminal Style UI */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              
              <div className="font-mono text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">initialisation scan sécurité...</span>
                </div>
                <div className="text-green-400">✓ Périmètre réseau sécurisé</div>
                <div className="text-green-400">✓ Protection des terminaux active</div>
                <div className="text-green-400">✓ Renseignements sur les menaces à jour</div>
                <div className="text-green-400">✓ Zéro vulnérabilité détectée</div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-primary">$</span>
                  <span className="text-foreground">Statut système:</span>
                  <span className="text-green-400 font-semibold">PROTÉGÉ</span>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
