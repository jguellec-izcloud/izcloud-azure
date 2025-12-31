import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, HelpCircle, MessageCircleQuestion, Sparkles, Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

// Helper component for rich formatted answers
const RichAnswer = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
);

const AnswerParagraph = ({ children }: { children: React.ReactNode }) => (
  <p>{children}</p>
);

const AnswerSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="font-semibold text-foreground mt-4">{children}</p>
);

const AnswerList = ({ items, ordered = false }: { items: React.ReactNode[], ordered?: boolean }) => {
  if (ordered) {
    return (
      <ol className="space-y-3 ml-1">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
              {index + 1}
            </span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-3 ml-1">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqItems: { question: string; answer: React.ReactNode; searchText: string }[] = [
    {
      question: "Pourquoi externaliser la gestion de mon informatique ?",
      searchText: "externaliser gestion informatique parc performant sécurisé ressources internes accompagnement proactif",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            L'externalisation avec IzCloud, c'est l'assurance d'un parc informatique <strong className="text-foreground">performant et sécurisé</strong> sans mobiliser vos ressources internes.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p>Notre accompagnement proactif anticipe les problèmes avant qu'ils n'impactent votre cœur de métier.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Quels sont les risques si je ne fais rien ?",
      searchText: "risques cyberattaques hameçonnage piratage compte rançongiciel profit données volées chantage rançon Darknet",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Déjà, ils sont bien réels ! Il suffit de regarder le journal de 20 h pour s'en apercevoir… Aucune attaque ne se ressemble.
          </AnswerParagraph>
          <AnswerSubtitle>Le "trio de tête" des cyberattaques :</AnswerSubtitle>
          <AnswerList items={[
            <><strong className="text-foreground">L'hameçonnage</strong> — des emails frauduleux pour voler vos identifiants</>,
            <><strong className="text-foreground">Le piratage de compte</strong> — accès non autorisé à vos systèmes</>,
            <><strong className="text-foreground">Le rançongiciel</strong> — blocage de vos données contre rançon</>
          ]} />
          <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <p className="font-semibold text-foreground">La finalité est toujours la même :</p>
            <p className="mt-1">Faire du profit, que ce soit par la revente des données volées, le chantage ou une demande de rançon. Vous êtes perdants dans 100 % des cas car, même si vous payez une rançon, vos données sont systématiquement revendues sur le Darknet.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Je n'ai jamais été attaqué, ma petite entreprise n'intéresse pas les cybercriminels",
      searchText: "petite entreprise PME cybercriminels attaque cambrioleur pirates profit IA automatisation cible opportunité",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            <strong className="text-foreground">Au contraire !</strong> Un cambrioleur préférera toujours une rue avec dix maisons aux serrures fragiles plutôt qu'une banque ultra-sécurisée.
          </AnswerParagraph>
          <AnswerParagraph>
            En cybersécurité, c'est la même chose. Les pirates cherchent le <strong className="text-foreground">profit maximal pour un effort minimal</strong>.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <p>Avec la démocratisation de l'IA, ils automatisent des milliers d'attaques simultanées : votre entreprise n'est peut-être pas une cible stratégique, mais elle est une <strong className="text-foreground">opportunité statistique de profit rapide</strong>.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Comment choisir le forfait qui me convient le mieux ?",
      searchText: "choisir forfait offre évolutif sur-mesure étude personnalisée protection prix tarif",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Chaque entreprise est unique, c'est pourquoi nos forfaits sont <strong className="text-foreground">100 % évolutifs</strong> et adaptables sur-mesure.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-semibold text-foreground">Notre recommandation :</p>
            <p className="mt-1">Contactez-nous pour une étude personnalisée : nous vous conseillerons l'offre offrant le meilleur rapport protection/prix pour votre activité.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Comment sécurisez-vous mes machines ?",
      searchText: "sécurisation machines postes Essentiel Pro Premium durcissement hardening EDR failles surface attaque",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            La sécurisation dépend du niveau de protection choisi :
          </AnswerParagraph>
          <AnswerList ordered items={[
            <><strong className="text-foreground">Forfait Essentiel :</strong> Chaque poste est configuré selon les meilleures pratiques et, surtout, ces réglages ne dérivent pas dans le temps.</>,
            <><strong className="text-foreground">Forfait Pro :</strong> Nous introduisons le "durcissement" (hardening) — nous verrouillons les failles potentielles pour réduire votre surface d'attaque et décourager les pirates.</>,
            <><strong className="text-foreground">Forfait Premium :</strong> Déploiement d'une protection d'élite avec un EDR, une technologie capable de détecter et de stopper les menaces complexes en temps réel.</>
          ]} />
        </RichAnswer>
      )
    },
    {
      question: "Est-ce que cela changera ma façon de travailler ?",
      searchText: "travailler habitudes outils transparence sécurité Premium modernisation accompagnement",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            <strong className="text-foreground">Pas du tout !</strong> Vos équipes conservent leurs outils et leurs habitudes : nous intervenons en toute transparence pour garantir leur sécurité.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p>Seul le forfait Premium propose une modernisation plus profonde de vos usages, pour laquelle nous vous accompagnons <strong className="text-foreground">pas à pas</strong>.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Quels outils utilisez-vous ?",
      searchText: "outils Microsoft Gartner Forrester expertise configuration réactivité",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Nous utilisons en grande partie des <strong className="text-foreground">outils Microsoft</strong>, qui se classent parmi les meilleurs du marché d'après les rapports du Gartner ou de Forrester.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-semibold text-foreground">Notre expertise :</p>
            <p className="mt-1">Notre maîtrise de ces outils est très solide, vous garantissant ainsi une configuration optimale et une réactivité maximale.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Qu'est-ce qu'un EDR ? Est-ce que j'en ai vraiment besoin ?",
      searchText: "EDR Endpoint Detection Response antivirus virus comportements suspects temps réel sentinelle attaque",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Contrairement à un antivirus classique qui ne reconnaît que les virus "connus", l'<strong className="text-foreground">EDR (Endpoint Detection and Response)</strong> analyse les comportements suspects en temps réel.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p>C'est une <strong className="text-foreground">sentinelle intelligente</strong> capable de stopper une attaque complexe avant qu'elle ne vous touche.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Mes données sont-elles stockées en France et IzCloud y a-t-il accès ?",
      searchText: "données France Microsoft Zéro Trust accès fichiers emails maintenance propriété intellectuelle confidentielle",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Vos données résident dans les <strong className="text-foreground">centres de données français de Microsoft</strong>.
          </AnswerParagraph>
          <AnswerSubtitle>Concernant l'accès — notre philosophie "Zéro Trust" :</AnswerSubtitle>
          <AnswerList items={[
            <>Nous administrons la sécurité de votre plateforme (les "portes et les verrous")</>,
            <>Nous n'accédons <strong className="text-foreground">jamais</strong> au contenu de vos fichiers ou de vos emails</>,
            <>Exception : sur demande explicite de votre part pour une opération de maintenance</>
          ]} />
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p>Votre propriété intellectuelle reste <strong className="text-foreground">strictement confidentielle</strong>.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Est-ce que vos politiques de sécurité vont ralentir les ordinateurs de mes équipes ?",
      searchText: "ralentir ordinateurs performances antivirus lourds ressources système durcissement réactivité",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            C'est une crainte légitime. Contrairement aux antivirus "lourds" d'ancienne génération qui scannent le disque en permanence, les solutions que nous déployons <strong className="text-foreground">utilisent peu de ressources système</strong>.
          </AnswerParagraph>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-semibold text-foreground">Bonus :</p>
            <p className="mt-1">Le "durcissement" consiste d'ailleurs souvent à désactiver des services inutiles, ce qui peut même <strong className="text-foreground">améliorer la réactivité globale</strong> de la machine.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Pourquoi l'intelligence artificielle est-elle une aubaine pour les cybercriminels ?",
      searchText: "intelligence artificielle IA cybercriminels arnaques phishing deepfake usurpation identité fraude président attaques massives hackers",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            L'intelligence artificielle (IA) simplifie et accélère les attaques, rendant les petites et moyennes entreprises des cibles plus vulnérables. Voici comment elle change la donne :
          </AnswerParagraph>
          <AnswerList items={[
            <><strong className="text-foreground">Des arnaques indétectables :</strong> Fini les e-mails remplis de fautes. L'IA génère des messages de phishing parfaits et très convaincants, souvent personnalisés avec le nom de vos clients ou de vos partenaires.</>,
            <><strong className="text-foreground">L'usurpation d'identité (Deepfake) :</strong> Un pirate peut désormais imiter la voix d'un dirigeant ou d'un fournisseur au téléphone pour demander un virement urgent (la "fraude au président").</>,
            <><strong className="text-foreground">Des attaques massives et rapides :</strong> Là où un humain mettait des jours à chercher une faille dans votre réseau, l'IA le fait en quelques secondes, permettant de multiplier les tentatives d'intrusion sans effort.</>
          ]} />
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-semibold text-foreground">L'essentiel à retenir :</p>
            <p className="mt-1">L'IA permet à des hackers, même peu expérimentés, de lancer des attaques massives et sophistiquées.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "Qu'est-ce que l'hameçonnage (phishing) et comment cela peut-il impacter mon entreprise ?",
      searchText: "hameçonnage phishing email SMS urgence peur lien malveillant pièce jointe vol identité malware rançongiciel dark-net",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            L'hameçonnage est la technique favorite des cybercriminels car elle ne s'attaque pas à vos serveurs, mais à l'humain. Le principe est simple : vous recevez un message (email, SMS, …) qui usurpe l'identité d'un tiers de confiance — comme votre banque, l'administration fiscale, un collègue, ...
          </AnswerParagraph>
          <AnswerParagraph>
            Le but est de créer un sentiment d'urgence ou de peur (« Votre compte va être bloqué », « Facture impayée », « Colis en attente ») pour vous pousser à cliquer sur un lien malveillant ou à ouvrir une pièce jointe infectée.
          </AnswerParagraph>
          <AnswerSubtitle>Une fois le piège activé, deux scénarios majeurs se produisent :</AnswerSubtitle>
          <AnswerList ordered items={[
            <><strong className="text-foreground">Le vol d'identité :</strong> Vous arrivez sur une page qui ressemble trait pour trait à un site officiel. En saisissant vos identifiants, vous les donnez directement au pirate qui pourra ensuite s'introduire dans votre réseau, détourner vos virements ou espionner vos échanges.</>,
            <><strong className="text-foreground">L'infection par malware :</strong> L'ouverture d'un fichier (souvent un faux PDF ou Excel) installe un logiciel espion ou un rançongiciel qui va chiffrer l'intégralité de vos données en quelques minutes.</>
          ]} />
          <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <p>Les données ainsi dérobées sont ensuite presque systématiquement revendues sur des plateformes du dark-net, permettant au cybercriminel d'en tirer un profit supplémentaire immédiat, et à d'autres de conduire, ultérieurement, de nouvelles attaques.</p>
          </div>
        </RichAnswer>
      )
    },
    {
      question: "En quoi consiste une attaque par rançongiciel (ransomware) ?",
      searchText: "rançongiciel ransomware virus intrusion blocage cryptage chiffrement chantage rançon cryptomonnaies payer récupération extorsion Darknet",
      answer: (
        <RichAnswer>
          <AnswerParagraph>
            Le rançongiciel est un logiciel malveillant qui agit comme un "preneur d'otages numérique". C'est aujourd'hui la menace la plus redoutée par les entreprises.
          </AnswerParagraph>
          
          <AnswerSubtitle>Le scénario est généralement le suivant :</AnswerSubtitle>
          <AnswerList ordered items={[
            <><strong className="text-foreground">L'intrusion :</strong> Le virus pénètre dans votre informatique (via un e-mail piégé ou une faille de sécurité).</>,
            <><strong className="text-foreground">Le blocage :</strong> Il verrouille et crypte instantanément tous vos fichiers (factures, dossiers clients, comptabilité). Ils deviennent totalement illisibles.</>,
            <><strong className="text-foreground">Le chantage :</strong> Une fenêtre s'affiche sur vos écrans demandant le paiement d'une rançon (souvent en cryptomonnaies) en échange de la clé de déchiffrage.</>
          ]} />

          <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <p className="font-semibold text-foreground">Les conséquences :</p>
            <p className="mt-1">Au-delà du prix de la rançon, c'est l'arrêt total de votre activité qui est dangereux. Sans accès à vos données, vous ne pouvez plus facturer, produire ou accéder à vos contacts.</p>
          </div>

          <AnswerSubtitle>Pourquoi ne faut-il jamais payer la rançon ?</AnswerSubtitle>
          <AnswerParagraph>
            S'il est tentant de payer pour débloquer son activité, les autorités et les experts le déconseillent formellement pour trois raisons majeures :
          </AnswerParagraph>
          <AnswerList ordered items={[
            <><strong className="text-foreground">Aucune garantie de récupération :</strong> Même si, dans les faits, les criminels restituent souvent l'accès pour maintenir leur "réputation", rien ne vous assure que vos fichiers ne seront pas corrompus ou partiellement illisibles.</>,
            <><strong className="text-foreground">La double extorsion :</strong> En payant, vous récupérez peut-être vos accès, mais les pirates conservent une copie de vos données. Ils peuvent alors vous faire chanter une seconde fois en menaçant de revendre vos secrets commerciaux ou les données de vos clients sur le Darknet.</>,
            <><strong className="text-foreground">Vous devenez une cible privilégiée :</strong> En payant, vous envoyez un signal fort au monde du cybercrime : votre entreprise est rentable et "coopérative". Vous augmentez ainsi considérablement le risque d'être à nouveau attaqué par le même groupe ou par d'autres.</>
          ]} />

          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-semibold text-foreground">Le constat est simple :</p>
            <p className="mt-1">Payer finance le crime de demain et ne résout en rien la vulnérabilité de votre système informatique.</p>
          </div>
        </RichAnswer>
      )
    }
  ];

  // Filter FAQ items based on search query
  const filteredFaqItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    
    const query = searchQuery.toLowerCase().trim();
    return faqItems.filter(item => 
      item.question.toLowerCase().includes(query) ||
      item.searchText.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Iz<span className="text-gradient">Cloud</span>
              </span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <MessageCircleQuestion className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Centre d'aide</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Questions <span className="text-gradient">Fréquentes</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Retrouvez les réponses aux questions les plus courantes sur nos services de cybersécurité et d'infogérance.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-card border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  {filteredFaqItems.length} résultat{filteredFaqItems.length > 1 ? 's' : ''} trouvé{filteredFaqItems.length > 1 ? 's' : ''}
                </p>
              )}
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={searchQuery} // Re-animate when search changes
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredFaqItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem 
                      value={`item-${index}`}
                      className="group bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl px-6 overflow-hidden data-[state=open]:border-primary/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300 hover:border-border"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:no-underline py-6 gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-data-[state=open]:bg-primary/20 transition-colors">
                            <HelpCircle className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-base md:text-lg leading-relaxed pr-4">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 pl-14 pr-4 leading-relaxed text-base">
                        {typeof item.answer === 'string' ? (
                          <p className="whitespace-pre-line">{item.answer}</p>
                        ) : (
                          item.answer
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl" />
              <div className="relative p-8 md:p-12 bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Vous avez d'autres questions ?
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Notre équipe est là pour vous accompagner dans votre démarche de sécurisation.
                    </p>
                  </div>
                  <Link 
                    to="/#contact"
                    className="flex-shrink-0 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 glow-primary"
                  >
                    Contactez-nous
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-card/50 border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground mb-4 group">
            <Shield className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-heading font-bold">
              Iz<span className="text-gradient">Cloud</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IzCloud. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
