import { Shield, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    services: [{
      name: "La menace",
      href: "#about"
    }, {
      name: "Notre offre",
      href: "#services"
    }, {
      name: "Pourquoi nous",
      href: "#why-us"
    }],
    company: [{
      name: "IzCloud",
      href: "#"
    }, {
      name: "FAQ",
      href: "/faq",
      isRoute: true
    }, {
      name: "Contact",
      href: "#contact"
    }],
    legal: [{
      name: "Politique de Confidentialité",
      href: "/politique-confidentialite",
      isRoute: true
    }, {
      name: "Mentions Légales",
      href: "#"
    }]
  };
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">
                Iz<span className="text-gradient">Cloud</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Solutions de cybersécurité et d'infogérance de niveau entreprise pour les organisations du monde entier.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/jguellec/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map(link => <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.name}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Mentions Légales</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => <li key={link.name}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} IzCloud. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;