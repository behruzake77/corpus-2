import { AnatomySystems } from "@/components/sections/anatomy-systems";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Gamification } from "@/components/sections/gamification";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductExperience } from "@/components/sections/product-experience";
import { Stats } from "@/components/sections/stats";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <AnatomySystems />
      <ProductExperience />
      <Gamification />
      <FinalCta />
    </main>
  );
}
