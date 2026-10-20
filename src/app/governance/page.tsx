import { PageShell } from "@/components/layout/PageShell";
import { GovHero } from "@/components/pages/governance/GovHero";
import { GovChecks } from "@/components/pages/governance/GovChecks";
import { GovFailsClosed } from "@/components/pages/governance/GovFailsClosed";
import { GovPolicies, GovNotBand } from "@/components/pages/governance/GovPolicies";

export const metadata = { title: "Governance · AI Deployed" };

export default function GovernancePage() {
  return (
    <PageShell>
      <GovHero />
      <GovChecks />
      <GovFailsClosed />
      <GovPolicies />
      <GovNotBand />
    </PageShell>
  );
}
