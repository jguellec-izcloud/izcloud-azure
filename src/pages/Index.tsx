import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThreatSection from "@/components/ThreatSection";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressIndicator />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <AnimatedSection>
        <ThreatSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Stats />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Pricing />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <WhyUs />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <CTA />
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default Index;
