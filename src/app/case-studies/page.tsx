import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { RevealScope } from "@/components/motion/Reveal";
import { CasesHero } from "@/components/pages/case-studies/CasesHero";
import { CaseList } from "@/components/pages/case-studies/CaseList";

export const metadata: Metadata = { title: "Case studies · AI Deployed" };

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CasesHero />
      <RevealScope className="full" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CaseList />
      </RevealScope>
    </PageShell>
  );
}
