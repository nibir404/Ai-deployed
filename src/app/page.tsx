import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Reality } from "@/components/home/Reality";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ForwardDeployed } from "@/components/home/ForwardDeployed";
import { Stats } from "@/components/home/Stats";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { Industries } from "@/components/home/Industries";
import { Capabilities } from "@/components/home/Capabilities";
import { HowWeWork } from "@/components/home/HowWeWork";
import { EngagementModels } from "@/components/home/EngagementModels";
import { Pricing } from "@/components/home/Pricing";
import { Outcomes } from "@/components/home/Outcomes";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Research } from "@/components/home/Research";
import { WhyAiDeployed } from "@/components/home/WhyAiDeployed";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <Reality />
      <WhatWeDo />
      <ForwardDeployed />
      <Stats />
      <RoiCalculator />
      <Industries />
      <Capabilities />
      <HowWeWork />
      <EngagementModels />
      <Pricing />
      <Outcomes />
      <CaseStudies />
      <Research />
      <WhyAiDeployed />
      <Faq />
      <FinalCta />
    </main>
  );
}