import { AlertTriangle, Target, Brain, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const threats = [
  {
    icon: Target,
    title: "Cibles privilégiées",
    description: "Les cybercriminels ciblent particulièrement les TPE-PME. Pourquoi ? Le ROI est bien meilleur ! Attaquer une grosse structure nécessite plus de moyens et de temps : c'est moins rentable."
  },
  {
    icon: Brain,
    title: "L'IA au service des attaquants",
    description: "Elle sophistique les menaces et accroît considérablement la productivité des cybercriminels. Ces attaques s'avèrent souvent indétectables pour les petites structures dépourvues de service informatique."
  },
  {
    icon: AlertTriangle,
    title: "Des menaces bien réelles",
    description: "Vol de données, piratage de comptes, usurpation d'identité, rançongiciels, hameçonnage… Ces menaces sont bien réelles et peuvent vous toucher durablement."
  }
];

const ThreatSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-destructive/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-destructive text-sm font-semibold tracking-wider uppercase mb-4 block">
            Comprendre le Risque
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            La Menace <span className="text-gradient">Cyber</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comme l'atteste chaque année le rapport de <span className="text-foreground font-medium">Cybermalveillance.gouv.fr</span>, 
            la menace cyber pour les TPE/PME, ainsi que pour les collectivités locales est bien réelle. Elle est de surcroît très sous-estimée.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            L'absence de réponse adaptée face aux cybermenaces expose votre entreprise à des risques opérationnels, juridiques et réputationnels majeurs.
          </p>
        </div>

        {/* Threat Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {threats.map((threat, index) => (
            <div 
              key={threat.title}
              className="group bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_hsl(var(--primary)/0.1)]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:bg-destructive/20 group-hover:scale-110 transition-all duration-300">
                <threat.icon className="w-7 h-7 text-destructive group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {threat.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {threat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Banner */}
        <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Notre <span className="text-gradient">Expertise</span> à Votre Service
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Pourquoi les meilleures protections seraient-elles réservées aux multinationales ? Grâce à notre expérience au sein des leaders technologiques mondiaux, nous avons <span className="text-foreground font-medium">simplifié et adapté ces méthodes de pointe</span> pour offrir à votre structure une <span className="text-primary font-semibold">sécurité maximale</span>, sans les coûts ni la complexité des grands groupes.
              </p>
            </div>

            <a href="#contact" className="flex-shrink-0">
              <Button variant="hero" size="lg">
                Programmer un Audit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatSection;
