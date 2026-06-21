import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Terms — AI Deployed",
  description: "Terms of service for the AI Deployed platform.",
};

export default function TermsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Legal"
        title="Terms."
        description="Terms of service for the AI Deployed platform."
      />

      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container>
          <div className="max-w-3xl space-y-6 text-body text-ink-muted leading-relaxed">
            <p>
              These terms cover the design, build, and operation of AI agents
              by AI Deployed for your business. The full agreement is shared
              during the engagement — this page is a short summary.
            </p>
            <p>
              You own the agent configuration, the audit log, and any output
              that is approved. We operate the runtime on your behalf. The
              approval gate, the policy stack, and the audit trail are yours.
            </p>
            <p>
              For a full copy of our terms of service, including liability,
              termination, and warranties, write to us at the address listed
              in the footer.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
