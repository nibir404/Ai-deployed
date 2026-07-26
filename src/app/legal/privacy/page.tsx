import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Privacy — AI Deployed",
  description: "How we handle data, on the AI Deployed platform.",
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Legal"
        title="Privacy."
        description="How we handle data on the AI Deployed platform."
      />

      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container>
          <div className="max-w-3xl space-y-6 text-body text-ink-muted leading-relaxed">
            <p>
              We collect the minimum data needed to architect, build, deploy,
              and run the systems you have asked us to run. We do not sell
              data. We do not use your data to train models we do not operate
              for you.
            </p>
            <p>
              The audit log captures every input and output. Append-only,
              exportable on request.
            </p>
            <p>
              Sensitive fields stripped before the model. PII is never sent to
              the model.
            </p>
            <p>
              For the full privacy policy — data retention, sub-processors,
              regional rights — write to us at the address in the footer.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
