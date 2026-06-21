import { Hero } from "@/components/home/Hero";
import { LiveDemo } from "@/components/home/LiveDemo";
import { UseCases } from "@/components/home/UseCases";
import { Differentiators } from "@/components/home/Differentiators";
import { EngagementSteps } from "@/components/home/EngagementSteps";
import { Commitments } from "@/components/home/Commitments";
import { CompanyNote } from "@/components/home/CompanyNote";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <LiveDemo />
      <UseCases />
      <Differentiators />
      <EngagementSteps />
      <Commitments />
      <CompanyNote />
      <FinalCta />
    </main>
  );
}
