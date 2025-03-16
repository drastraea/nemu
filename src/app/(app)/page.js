import { HeroSection } from "./_components/hero-section";
import { FlowSection } from "./_components/flow-section";
import { AboutSection } from "./_components/about-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FlowSection />
      <AboutSection />
    </div>
  );
}
