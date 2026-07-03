/**
 * QORX Landing Page — Home
 * Design: Obsidian Command Center
 * Assembles all sections: Nav → Hero → How It Works → Metrics → Architecture → GTM → Pricing → Competitors → Contact → Footer
 */
import QorxNav from "@/components/QorxNav";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MetricsShowcaseSection from "@/components/MetricsShowcaseSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import GTMSection from "@/components/GTMSection";
import PricingSection from "@/components/PricingSection";
import CompetitorSection from "@/components/CompetitorSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#080B14" }}>
      <QorxNav />
      <HeroSection />
      <HowItWorksSection />
      <MetricsShowcaseSection />
      <ArchitectureSection />
      <GTMSection />
      <PricingSection />
      <CompetitorSection />
      <ContactSection />
    </div>
  );
}
