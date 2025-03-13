import { HeroSection } from "./_components/hero-section";
import { FlowSection } from "./_components/flow-section";
import { AboutSection } from "./_components/about-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="py-20">
        <div className="container px-6 mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Content</h2>
        </div>
      </section>
      <FlowSection />
      <AboutSection />
    </div>
  );
}
