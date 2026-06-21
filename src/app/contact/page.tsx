import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — AI Deployed",
  description:
    "Tell us about your context. A senior engineer will respond within one business day.",
};

const META = [
  { k: "Response", v: "Within 1 business day" },
  { k: "First call", v: "30 minutes, senior engineer" },
  { k: "Format", v: "Video or in-person" },
  { k: "Cost", v: "No fee, no obligation" },
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact · Section 16"
        title="Start the conversation."
        description="Tell us about your context. A senior engineer will respond within one business day — no slide decks, no qualification calls, no sales pipeline."
      />

      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>What to expect</Eyebrow>
              <dl className="mt-8 space-y-6 text-sm">
                {META.map((m) => (
                  <div key={m.k} className="flex items-baseline gap-6">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim w-24 shrink-0">
                      {m.k}
                    </dt>
                    <dd className="text-ink">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12 card-surface p-6 md:p-8">
                <Eyebrow>Direct</Eyebrow>
                <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                  Prefer email? Reach the engineering team directly:
                </p>
                <a
                  href="mailto:engineering@aideployed.com"
                  className="mt-3 inline-block font-display text-base text-ink hover:text-ink-muted transition-colors"
                >
                  engineering@aideployed.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}