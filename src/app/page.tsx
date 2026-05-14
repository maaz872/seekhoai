import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { PillarsPinned } from "@/components/sections/PillarsPinned";
import { Curriculum } from "@/components/sections/Curriculum";
import { WhoFor } from "@/components/sections/WhoFor";
import { Instructor } from "@/components/sections/Instructor";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <SocialProof />
      <PillarsPinned />
      <Curriculum />
      <WhoFor />
      <Instructor />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
