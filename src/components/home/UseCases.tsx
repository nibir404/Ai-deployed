import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";

const CASES = [
  {
    t: "Support",
    d: "Triage inbound. Draft replies for your team to approve.",
  },
  {
    t: "Sales",
    d: "Personalized follow-ups after every demo. Matched to your voice.",
  },
  {
    t: "Operations",
    d: "Reorder low-stock SKUs, route approvals, keep the ops inbox clean.",
  },
  {
    t: "Analytics",
    d: "Weekly pipeline summaries, risk callouts, board-ready notes.",
  },
  {
    t: "Finance",
    d: "Reconcile invoices, flag anomalies, draft approvals for the controller.",
  },
  {
    t: "Marketing",
    d: "Newsletter drafts, subject-line tests, social scheduling.",
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
        <div className="max-w-3xl">
          <Eyebrow>Use cases</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            Built for one job.{" "}
            <span className="text-ink-muted">Built for your environment.</span>
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            Six functions. Each agent scoped to the work, governed by your
            rules, reviewed by your team.
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