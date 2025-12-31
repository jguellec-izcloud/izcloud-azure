import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GDPRFormDialog from "@/components/GDPRFormDialog";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">
                Iz<span className="text-gradient">Cloud</span>
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
          Politique de <span className="text-gradient">Confidentialité</span>
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. Identité du responsable de traitement
            </h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Nom :</strong> Julien Guellec (IzCloud)</li>
              <li>
                <strong className="text-foreground">Contact :</strong>{" "}
                <GDPRFormDialog>
                  <Button variant="link" className="text-primary hover:underline p-0 h-auto font-normal">
                    Formulaire de contact RGPD
                  </Button>
                </GDPRFormDialog>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. Données collectées
            </h2>
            <p>
              Dans le cadre de l'utilisation de notre site, nous collectons les données suivantes via notre formulaire de contact :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom complet</li>
              <li>Adresse email professionnelle</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Nom de l'entreprise (optionnel)</li>
              <li>Message décrivant votre besoin</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. Finalité du traitement
            </h2>
            <p>
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Répondre à vos demandes de contact et d'audit gratuit</li>
              <li>Vous recontacter dans le cadre de votre projet</li>
              <li>Établir un devis personnalisé si nécessaire</li>
            </ul>
            <p>
              Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Base légale du traitement
            </h2>
            <p>
              Le traitement de vos données personnelles repose sur votre consentement explicite lors de l'envoi du formulaire de contact, conformément à l'article 6.1.a du Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Durée de conservation
            </h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de <strong className="text-foreground">1 an</strong> à compter de votre dernier échange avec nous. Passé ce délai, vos données sont automatiquement supprimées de nos systèmes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong className="text-foreground">Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong className="text-foreground">Droit à la limitation :</strong> restreindre le traitement de vos données</li>
              <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            </ul>
            <p>
              Pour exercer ces droits :{" "}
              <GDPRFormDialog>
                <Button variant="link" className="text-primary hover:underline p-0 h-auto font-normal">
                  Faire une demande RGPD
                </Button>
              </GDPRFormDialog>
            </p>
            <p>
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Cookies
            </h2>
            <p>
              Ce site utilise uniquement des cookies techniques essentiels au bon fonctionnement du site. Ces cookies ne collectent aucune donnée personnelle et ne nécessitent pas votre consentement.
            </p>
            <p>
              Aucun cookie de tracking, d'analyse ou publicitaire n'est utilisé sur ce site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              8. Hébergement
            </h2>
            <p>
              Ce site est hébergé par Lovable (GPT Engineer Inc.), dont les serveurs sont situés dans l'Union Européenne, garantissant la conformité avec le RGPD.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              9. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Cela inclut :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chiffrement des communications (HTTPS/TLS)</li>
              <li>Validation et sanitisation des données côté serveur</li>
              <li>Protection contre les attaques par injection</li>
              <li>Limitation du taux de requêtes pour prévenir les abus</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              10. Modifications de cette politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-border">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Contact
            </h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous :
            </p>
            <p>
              <strong className="text-foreground">Contact :</strong>{" "}
              <GDPRFormDialog>
                <Button variant="link" className="text-primary hover:underline p-0 h-auto font-normal">
                  Formulaire de demande RGPD
                </Button>
              </GDPRFormDialog>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IzCloud. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PolitiqueConfidentialite;
