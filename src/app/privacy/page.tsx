import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LegalLayout, type LegalDoc } from "@/components/pages/legal/LegalLayout";

export const metadata: Metadata = { title: "Privacy policy · AI Deployed" };

const DOC: LegalDoc = {
  kind: "privacy",
  title: "Privacy policy",
  updated: "LAST UPDATED 20 OCT 2026",
  readTime: "2 MIN READ",
  summary: "In short: data inside client engagements stays in the client’s environment and under their governance. This policy covers the data we collect through this website.",
  sections: [
    { id: "who-we-are", title: "1. Who we are", body: "AI Deployed embeds with your team to architect, build, deploy and run AI and software systems. This policy explains what personal data we process when you visit aideployed.io or contact us." },
    { id: "what-we-collect", title: "2. What we collect", body: "Contact details you send us through the booking form: name, work email, company and the context you share. Basic, privacy-preserving analytics on page views. We do not sell personal data." },
    { id: "client-data", title: "3. Client data in engagements", body: "Agents run in your environment. Sensitive fields are stripped before the model and PII never reaches it. Processing terms for engagements are set in a separate data processing agreement." },
    { id: "retention", title: "4. How long we keep it", body: "Contact requests are kept for 24 months unless you ask us to delete them sooner." },
    { id: "your-rights", title: "5. Your rights", body: "You can ask to access, correct, export or delete your data at any time." },
    { id: "contact", title: "6. Contact", email: "privacy@aideployed.io" },
  ],
};

export default function PrivacyPage() {
  return (
    <PageShell cta={false}>
      <LegalLayout doc={DOC} />
    </PageShell>
  );
}
