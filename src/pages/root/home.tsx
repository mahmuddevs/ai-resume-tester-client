import HeroBanner from "../../components/home/hero-banner";
import Timeline from "../../components/home/timeline";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-brand-bg flex flex-col justify-start items-center">
      <HeroBanner />
      <Timeline />
    </div>
  );
}