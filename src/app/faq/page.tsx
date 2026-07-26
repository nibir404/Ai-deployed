import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "FAQ — AI Deployed",
  description:
    "Common questions about engagements, agents, governance, and how we work.",
};

const QUESTIONS = [
  {
    q: "What does AI Deployed actually do?",
    a: "We architect, build, deploy, and run AI and software systems for your business. Each agent is scoped to one job, runs against your data, and operates under an approval gate you control. You review the queue — we do the rest.",
  },
  {
    q: "How is this different from buying an AI tool?",
    a: "An AI tool gives you software. We give you an outcome — the agent is configured for your business, run by our team, and tuned as your business changes.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Businesses where AI is operationally important — real work for an agent every day, governance that matters.",
  },
  {
    q: "What does &ldquo;run&rdquo; mean?",
    a: "We own the runtime after launch — model selection, retries, queue monitoring, configuration updates. If the model drifts, we change it. If the policy needs to evolve, we update it.",
  },
  {
    q: "What does the approval gate look like?",
    a: "Every agent has a queue. Drafts land there first. The agent never sends, writes, or triggers directly. Your team reviews, edits, approves.",
  },
  {
    q: "Can I keep using my existing tools?",
    a: "Yes. Agents plug into the systems you already use — email, CRM, support, internal APIs. We do the wiring. The audit log captures every call.",
  },
  {
    q: "How long does an engagement last?",
    a: "Ongoing by default. We tune the configuration as your business changes. The cost is structured around the work the agent does.",
  },
  {
    q: "How do we start?",
    a: "A discovery conversation. We learn the work, your systems, your governance requirements. If we&apos;re not the right fit, we&apos;ll say so.",
  },
];

export default function FaqPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Frequently asked"
        title="Common questions about engagements."
        description="If your question is not here, reach out — we are happy to discuss your specific context."
      />

      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-line)]">
            {QUESTIONS.map((item) => (
              <article
                key={item.q}
                className="card-surface p-6 md:p-8 flex flex-col gap-4 min-h-[200px]"
              >
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {item.q}
                </h3>
                <p
                  className="text-sm text-ink-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-b hairline py-[100px] md:py-[120px] text-center">
        <Container>
          <div className="max-w-xl mx-auto">
            <DisplayHeading
              as="h2"
              size="section"
              className="leading-[0.96] tracking-[-0.035em]"
            >
              A question we haven&apos;t answered?
            </DisplayHeading>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              Start a conversation
              <ArrowUpRight size={12} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}