import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalLayout, type LegalDoc } from "@/components/pages/legal/LegalLayout";

export const metadata: Metadata = { title: "Terms of service · AI Deployed" };

const DOC: LegalDoc = {
  kind: "terms",
  title: "Terms of service",
  updated: "LAST UPDATED 20 OCT 2026",
  readTime: "2 MIN READ",
  summary: "In short: you own your data, your code and your configuration. We run agents under an approval gate you control, and either side can end the engagement with notice.",
  sections: [
    { id: "scope", title: "1. Scope of services", body: "We architect, build, deploy and run AI agents and software systems as described in your engagement agreement. Each agent is scoped to one job." },
    { id: "ownership", title: "2. Your data and ownership", body: "You retain ownership of your data, the code built for you, and the agent configuration. Code lives in your repositories from day one." },
    { id: "approval-gate", title: "3. Approval gate and liability", body: "Every output is a draft until a person on your team approves it. Agents never send, write or trigger directly unless you set the approval mode to auto." },
    { id: "fees", title: "4. Fees and term", body: "Engagements are ongoing by default. Cost is structured around the work the agent does, as set in your order form." },
    { id: "termination", title: "5. Termination and handoff", body: "Either side may end the engagement with 30 days notice. We hand off runbooks and remove our access when we leave." },
    { id: "contact", title: "6. Contact", email: "legal@aideployed.io" },
  ],
};

export default function TermsPage() {
  return (
    <PageShell cta={false}>
      <LegalLayout doc={DOC} />
    </PageShell>
  );
}
