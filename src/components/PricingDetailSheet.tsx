import { ReactNode } from "react";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactFormDialog from "./ContactFormDialog";
import { Button } from "@/components/ui/button";

interface PricingDetailSheetProps {
  children: ReactNode;
  planName: "Essentiel" | "Pro" | "Premium";
}

const features = [
  { name: "Audit de votre environnement (gratuit)", essentiel: true, pro: true, premium: true },
  { name: "Configuration initiale (onboarding)", essentiel: true, pro: true, premium: true },
  { name: "Gestion des politiques de conformité", essentiel: true, pro: true, premium: true },
  { name: "Gestion et surveillance 24/7 de l'antivirus", essentiel: true, pro: true, premium: true },
  { name: "Gestion et surveillance 24/7 du pare-feu", essentiel: true, pro: true, premium: true },
  { name: "Configuration des paramètres de sécurité selon les recommandations du marché", essentiel: true, pro: true, premium: true },
  { name: "Gestion des mises à jour (sécurité et fonctionnelle) du système d'exploitation", essentiel: true, pro: true, premium: true },
  { name: "Déploiement d'applications de base", essentiel: true, pro: true, premium: true },
  { name: "Blocage et effacement à distance (en cas de perte ou de vol)", essentiel: true, pro: true, premium: true },
  { name: "Support à distance (limité, sur rendez-vous)", essentiel: true, pro: true, premium: true },
  { name: "Support à distance ou sur site (prioritaire, sur rendez-vous)", essentiel: false, pro: true, premium: true },
  { name: "Audit avancé 24/7 de l'ensemble de votre infrastructure", essentiel: false, pro: true, premium: true },
  { name: "Optimisation en continue des performances des systèmes d'exploitation", essentiel: false, pro: true, premium: true },
  { name: "Application des règles de durcissement (hardening) des postes de travail", essentiel: false, pro: true, premium: true },
  { name: "Réduction de votre surface d'attaque", essentiel: false, pro: true, premium: true },
  { name: "Alerting proactif en cas de détection d'anomalie ou de menace", essentiel: false, pro: true, premium: true },
  { name: "Mise en œuvre du chiffrement des postes de travail", essentiel: false, pro: true, premium: true },
  { name: "Surveillance et optimisation de la sécurité avec un EDR (Defender for Endpoint)", essentiel: false, pro: false, premium: true },
  { name: "Conseils et gestion proactive de votre posture de sécurité globale", essentiel: false, pro: false, premium: true },
  { name: "Mise en place de la double authentification et des accès conditionnels", essentiel: false, pro: false, premium: true },
  { name: "Réponse proactive aux incidents", essentiel: false, pro: false, premium: true },
  { name: "Support de niveau L2/L3 dans le cadre de la réponse aux incidents (sous 4 heures)", essentiel: false, pro: false, premium: true },
  { name: "Surveillance proactive des fuites de vos données sur le Dark Web", essentiel: false, pro: false, premium: true },
  { name: "Configuration et sécurisation de votre messagerie sous Office 365", essentiel: false, pro: false, premium: true },
  { name: "Sauvegarde Cloud de vos données (1To par utilisateur)", essentiel: false, pro: false, premium: true },
  { name: "Rapports de sécurité trimestriels", essentiel: false, pro: false, premium: true },
  { name: "Outils de bureautique Microsoft (Office) et Windows", essentiel: false, pro: false, premium: true },
  { name: "Jusqu'à 5 ordinateurs par utilisateur pour le même tarif", essentiel: false, pro: false, premium: true },
];

const options = [
  { name: "Sauvegarde dans le Cloud avec protection contre les ransomwares (1To/utilisateur)", essentiel: "option", pro: "option", premium: "inclus" },
  { name: "EDR (Microsoft Defender for Endpoint)", essentiel: "option", pro: "option", premium: "inclus" },
  { name: "Configuration et mise en œuvre des règles d'accès conditionnel", essentiel: "option", pro: "option", premium: "inclus" },
];

const planDescriptions = {
  Essentiel: "Protection de base pour sécuriser votre environnement informatique sans engagement.",
  Pro: "Sécurité avancée avec durcissement des postes et alerting proactif, sans engagement.",
  Premium: "La cybersécurité de niveau \"Grand Compte\" enfin accessible avec engagement 12 mois.",
};

const PricingDetailSheet = ({ children, planName }: PricingDetailSheetProps) => {
  const planKey = planName.toLowerCase() as "essentiel" | "pro" | "premium";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-heading text-2xl md:text-3xl">
            Forfait <span className="text-primary">{planName}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {planDescriptions[planName]}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          {/* Features Table */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Fonctionnalités incluses</h3>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-medium text-foreground">Fonctionnalité</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "essentiel" ? "text-primary bg-primary/10" : "text-foreground"}`}>Essentiel</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "pro" ? "text-primary bg-primary/10" : "text-foreground"}`}>Pro</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "premium" ? "text-primary bg-primary/10" : "text-foreground"}`}>Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`border-t border-border ${
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                    >
                      <td className="p-4 text-sm text-muted-foreground">{feature.name}</td>
                      <td className="p-4 text-center">
                        {feature.essentiel ? (
                          <Check className={`w-5 h-5 mx-auto ${planKey === "essentiel" ? "text-primary" : "text-muted-foreground/50"}`} />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.pro ? (
                          <Check className={`w-5 h-5 mx-auto ${planKey === "pro" ? "text-primary" : "text-muted-foreground/50"}`} />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.premium ? (
                          <Check className={`w-5 h-5 mx-auto ${planKey === "premium" ? "text-primary" : "text-muted-foreground/50"}`} />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Options Table */}
          <div className="mt-8 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Options disponibles</h3>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-medium text-foreground">Option</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "essentiel" ? "text-primary bg-primary/10" : "text-foreground"}`}>Essentiel</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "pro" ? "text-primary bg-primary/10" : "text-foreground"}`}>Pro</th>
                    <th className={`text-center p-4 font-medium w-24 ${planKey === "premium" ? "text-primary bg-primary/10" : "text-foreground"}`}>Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((option, index) => (
                    <tr
                      key={option.name}
                      className={`border-t border-border ${
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                    >
                      <td className="p-4 text-sm text-muted-foreground">{option.name}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          option.essentiel === "inclus" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {option.essentiel === "inclus" ? "Inclus" : "En option"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          option.pro === "inclus" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {option.pro === "inclus" ? "Inclus" : "En option"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          option.premium === "inclus" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {option.premium === "inclus" ? "Inclus" : "En option"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollArea>

        {/* Footer CTA */}
        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Intéressé par le forfait {planName} ? Contactez-nous pour un devis personnalisé.
            </p>
            <ContactFormDialog>
              <Button variant="hero" size="lg">
                Demander un devis
              </Button>
            </ContactFormDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDetailSheet;
