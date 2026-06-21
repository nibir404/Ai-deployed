import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "How we work — AI Deployed",
  description:
    "Structured, embedded, accountable. The four phases of every engagement.",
};

const PHASES = [
  {
    n: "01",
    title: "Discover",
    duration: "1–2 weeks",
    body: "Workflows, systems, operating model, constraints. We listen before we propose.",
    outputs: ["Stakeholder map", "System inventory", "Opportunity register"],
  },
  {
    n: "02",
    title: "Design",
    duration: "2–4 weeks",
    body: "Architecture, integration points, data flows, governance, rollout plan.",
    outputs: ["Target architecture", "Roadmap", "Risk register"],
  },
  {
    n: "03",
    title: "Deploy",
    duration: "6–18 months",
    body: "Embedded engineers build, integrate, and operationalize in production.",
    outputs: ["Working systems", "Runbooks", "Trained teams"],
  },
  {
    n: "04",
    title: "Operate",
    duration: "Ongoing",
    body: "Continuous optimization, managed services, knowledge transfer.",
    outputs: ["Measured outcomes", "Capability transfer", "Operational ownership"],
  },
];

const PRINCIPLES = [
  {
    t: "Embedded",
    b: "Our engineers sit with your teams. Knowledge transfers in the work.",
  },
  {
    t: "Outcome-defined",
    b: "Engagements measured by operational outcome, not deliverables shipped.",
  },
  {
    t: "Vendor-neutral",
    b: "Right technology for the problem. No preferred platforms.",
  },
  {
    t: "Time-bound",
    b: "Each phase has a clear exit. No infinite discovery.",
  },
];

export default function HowWeWorkPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="How we work · Section 04"
        title="Structured. Embedded. Accountable."
        description="Four phases. Embedded engineers. Outcome-defined, time-bound, measured against operational reality."
        image={{
          src: ASSETS.hero.controlRoom.lg,
          alt: "Operations control room",
        }}
      />

      {/* Phases timeline */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="max-w-4xl">
            <Eyebrow>Phases</Eyebrow>
            <h2 className="mt-6 font-display text-section font-medium text-ink leading-[0.96] tracking-[-0.035em]">
              From first conversation to operational ownership.
            </h2>
          </div>

          <StackReveal className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)]">
            {PHASES.map((p) => (
              <article
                key={p.n}
                data-stack
                className="card-surface p-6 md:p-8 min-h-[320px] flex flex-col gap-5 group hover:bg-[var(--color-surface)] transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    {p.n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                    {p.duration}
                  </span>
                </div>
                <h3 className="font-display text-display font-medium text-ink leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-auto pt-6 border-t hairline">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim mb-3">
                    Outputs
                  </div>
                  <ul className="space-y-2">
                    {p.outputs.map((o) => (
                      <li
                        key={o}
                        className="text-xs text-ink-muted leading-snug flex items-baseline gap-2"
                      >
                        <span
                          aria-hidden
                          className="inline-block size-1 bg-current opacity-50 shrink-0"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </StackReveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow>Principles</Eyebrow>
              <h2 className="mt-6 font-display text-section font-medium text-ink leading-[0.96] tracking-[-0.035em]">
                How we work, regardless of phase.
              </h2>
            </div>

            <ol className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-line)]">
              {PRINCIPLES.map((p, i) => (
                <li
                  key={p.t}
                  className="card-surface p-6 md:p-8 min-h-[180px] flex flex-col gap-4 group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                    {p.t}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {p.b}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Closing photo + line */}
      <section className="relative py-[120px] overflow-hidden border-b hairline">
        <div className="absolute inset-0 -z-0 opacity-30">
          <Image
            src={ASSETS.hero.architectural.lg}
            alt="Architectural facade"
            fill
            sizes="100vw"
            className="object-cover grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/60 via-[var(--color-bg)]/40 to-[var(--color-bg)]" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>What we ask of clients</Eyebrow>
            <p className="mt-8 font-display text-display text-ink leading-snug">
              Access to your teams. Patience with the work. Commitment to
              outcome over output. In return, we bring engineers who ship, who
              transfer what they build, and who stay accountable end-to-end.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}