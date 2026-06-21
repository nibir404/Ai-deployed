import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "How a DeployCo engagement works — AI Deployed",
  description:
    "Four steps from a discovery call to an agent running in production.",
};

const PHASES = [
  {
    title: "Discovery call",
    body: "We learn about the work you want an agent to do, your existing systems, and your governance requirements.",
  },
  {
    title: "Design and build",
    body: "We design the agent — goal, tools, guardrails, approval mode — and build it against your systems.",
  },
  {
    title: "Review outputs",
    body: "Your team reviews the agent's drafts. We tune the configuration based on what your team edits.",
  },
  {
    title: "Monitor and improve",
    body: "We run the agent in production, monitor the queue, and improve the configuration as your business changes.",
  },
];

const PRINCIPLES = [
  {
    t: "Embedded delivery",
    b: "We sit with your team. Knowledge transfer is built in by design.",
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
    b: "Each phase has a clear exit. We are not the right fit for every business.",
  },
];

export default function HowWeWorkPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="How it works"
        title="From a discovery call to an agent in production."
        description="Four steps. Most engagements are running in production by week four. After that, we run the agent for you and tune the configuration as your business changes."
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
                key={p.title}
                data-stack
                className="card-surface p-6 md:p-8 min-h-[260px] flex flex-col gap-5 group hover:bg-[var(--color-surface)] transition-colors"
              >
                <span
                  aria-hidden
                  className="inline-block size-1.5 bg-[var(--color-accent)]"
                />
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {p.body}
                </p>
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                    Principle
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
          {/* Plain <img> rather than next/image: the SVG composites its
              own embedded raster at render time, so the Next image
              optimizer adds no value. The browser scales the SVG to
              fill the section like a photo. The <img> tag is required
              for SVG <image xlink:href> external references to work
              reliably across browsers. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.howWeWork.closingIllustration}
            alt="Decorative chrome illustration"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
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
