import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{
    name: "La menace",
    href: "#about"
  }, {
    name: "Notre offre",
    href: "#services"
  }, {
    name: "Pourquoi nous",
    href: "#why-us"
  }, {
    name: "FAQ",
    href: "/faq",
    isRoute: true
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Iz<span className="text-gradient">Cloud</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => 
              link.isRoute ? (
                <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium">
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="hidden md:block">
            <a href="#contact">
              <Button variant="hero" size="default">
                Protégez-Vous
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => 
                link.isRoute ? (
                  <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base font-medium" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base font-medium" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </a>
                )
              )}
              <a href="#contact" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="lg" className="mt-4 w-full">
                  Protégez-Vous
                </Button>
              </a>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;