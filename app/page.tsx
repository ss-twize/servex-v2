import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Integrations from "@/components/sections/Integrations";
import Comparison from "@/components/sections/Comparison";
import Results from "@/components/sections/Results";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Comparison />
      <Integrations />
      <Results />
      <Stats />
      <FinalCTA />
    </main>
  );
}
