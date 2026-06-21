import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { StackReveal } from "@/components/site/primitives/StackReveal";

const CASES = [
  {
    t: "Support",
    d: "Triage and respond to inbound support. Drafts queued for your review before anything is sent.",
  },
  {
    t: "Sales",
    d: "Personalized follow-ups after every demo. Voice matched to your team, edited only where needed.",
  },
  {
    t: "Operations",
    d: "Reorder low-stock SKUs, route approvals to the right lead, and keep the ops inbox clean.",
  },
  {
    t: "Analytics",
    d: "Summarize weekly pipeline, surface risk callouts, and produce board-ready notes from your data.",
  },
  {
    t: "Finance",
    d: "Reconcile invoices, flag anomalies, and draft approvals for the controller — never the other way around.",
  },
  {
    t: "Marketing",
    d: "Newsletter drafts, subject-line tests, social scheduling. Reviewed before anything goes out.",
  },
];

/**
 * UseCases — six labeled cards in a 3-col grid (lg) / 2-col (sm) /
 * 1-col (mobile). Each card carries a job title and one-line
 * description; no numbers, no decorative imagery.
 */
export function UseCases() {
  return (
    <section
      id="use-cases"
      aria-label="Where AI Deployed agents work"
      className="relative border-b hairline py-[100px] md:py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="max-w-3xl">
          <Eyebrow>Use cases</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            Built for specific jobs.{" "}
            <span className="text-ink-muted">Built for your business.</span>
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            Six functions where an AI agent does real, repeatable work —
            scoped to the job, governed by your rules, reviewed by your team.
          </p>
        </div>

        <StackReveal className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
          {CASES.map((c) => (
            <article
              key={c.t}
              data-stack
              className="card-surface p-6 md:p-8 min-h-[200px] flex flex-col gap-4 group hover:bg-[var(--color-surface)] transition-colors"
            >
              <span
                aria-hidden
                className="inline-block size-1.5 bg-[var(--color-accent)]"
              />
              <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                {c.t}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {c.d}
              </p>
            </article>
          ))}
        </StackReveal>
      </Container>
    </section>
  );
}