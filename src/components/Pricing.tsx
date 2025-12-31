import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingDetailSheet from "./PricingDetailSheet";

const plans = [
  {
    name: "Essentiel",
    description: "Protection de base pour sécuriser votre environnement (sans engagement)",
    features: [
      "Audit de votre environnement (gratuit)",
      "Configuration initiale (gratuit)",
      "Gestion des politiques de conformité",
      "Gestion et surveillance 24/7 de l'antivirus",
      "Gestion et surveillance 24/7 du pare-feu",
      "Configuration des paramètres de sécurité essentiels",
      "Gestion des mises à jour système",
      "Déploiement d'applications de base",
      "Blocage et effacement à distance en cas de perte/vol",
      "Support à distance sur RDV",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Sécurité avancée pour une protection optimale (sans engagement)",
    features: [
      "Tout le forfait Essentiel",
      "Durcissement (hardening) des postes de travail",
      "Réduction de votre surface d'attaque",
      "Chiffrement des postes de travail",
      "Audit avancé 24/7 de votre infrastructure",
      "Optimisation en continue des performances",
      "Alerting proactif sur anomalies",
      "Support à distance prioritaire ou sur site",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    description: "La cybersécurité de niveau \"Grand Compte\" enfin accessible (engagement 12 mois)",
    features: [
      "Tout le forfait Pro",
      "EDR (Endpoint Detection and Response)",
      "Gestion proactive de votre posture de sécurité",
      "Réponse proactive aux incidents",
      "Surveillance Dark Web",
      "Sécurisation messagerie Office 365",
      "Sauvegarde Cloud (1To/utilisateur)",
      "Rapports de sécurité trimestriels",
      "Microsoft Office et Windows",
      "Support L2/L3 réponse à incident sous 4h",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Nos Forfaits
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Une offre adaptée à <span className="text-gradient">vos besoins</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choisissez le niveau de protection qui correspond à votre entreprise. 
            Tous nos forfaits incluent un audit gratuit de votre environnement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/10 to-background border-primary shadow-[0_0_40px_hsl(var(--primary)/0.15)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.25)]"
                  : "bg-gradient-card border-border hover:border-primary/50 hover:shadow-[0_20px_40px_hsl(var(--primary)/0.1)]"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Recommandé
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 flex-grow mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <PricingDetailSheet planName={plan.name as "Essentiel" | "Pro" | "Premium"}>
                <Button
                  variant={plan.highlighted ? "hero" : "hero-outline"}
                  size="lg"
                  className="w-full"
                >
                  Plus d'informations
                </Button>
              </PricingDetailSheet>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
