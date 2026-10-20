import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AboutHero, Why, Products, Commitments } from "@/components/pages/about/Sections";
import { Quote } from "@/components/pages/about/Quote";

export const metadata: Metadata = {
  title: "About · AI Deployed",
  description: "AI Deployed embeds with your team to architect, build, deploy and run AI and software systems.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <Why />
      <Quote />
      <Products />
      <Commitments />
    </PageShell>
  );
}
