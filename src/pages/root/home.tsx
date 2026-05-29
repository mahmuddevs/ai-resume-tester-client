import HeroBanner from "../../components/home/hero-banner";
import FeatureGrid from "../../components/home/feature-grid";
import Timeline from "../../components/home/timeline";
import FAQAccordion from "../../components/home/faq";
import ClosingCTABanner from "../../components/home/cta-banner";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-brand-bg">
      <HeroBanner />
      <FeatureGrid />
      <Timeline />
      <FAQAccordion />
      <ClosingCTABanner />
    </div>
  );
}