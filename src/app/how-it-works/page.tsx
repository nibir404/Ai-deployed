import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/pages/how-it-works/Hero";
import { Steps } from "@/components/pages/how-it-works/Steps";
import { Team } from "@/components/pages/how-it-works/Team";
import { Principles } from "@/components/pages/how-it-works/Principles";

export const metadata: Metadata = {
  title: "How it works · AI Deployed",
  description: "Four steps from first conversation to operational ownership. Running in production by week four.",
};

export default function HowItWorksPage() {
  return (
    <PageShell>
      <Hero />
      <Steps />
      <Team />
      <Principles />
    </PageShell>
  );
}
