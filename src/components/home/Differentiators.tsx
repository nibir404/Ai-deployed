import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { StackReveal } from "@/components/site/primitives/StackReveal";

const PRINCIPLES = [
  {
    t: "Custom build, not a generic assistant.",
    body: (
      <>
        <p>
          Each agent is scoped to one job — a goal, a tool allowlist, a set
          of guardrails, an approval mode. We do not hand you a builder and
          call it done. We design the configuration with you, against your
          existing systems, until it is right.
        </p>
        <p>
          If the configuration is wrong, the agent is wrong. We treat
          configuration as the product.
        </p>
      </>
    ),
  },
  {
    t: "An approval gate you control.",
    body: (
      <>
        <p>
          Every agent operates under an approval queue. Drafts land there
          first. The agent never sends, writes, or triggers directly.
        </p>
        <p>
          You decide the approval mode per agent — auto, review, or strict —
          and the governance layer enforces it. We cannot bypass it from our
          side.
        </p>
      </>
    ),
  },
  {
    t: "We run it. We operate it. We own it.",
    body: (
      <>
        <p>
          We run the runtime, monitor the agents, and improve the
          configurations as your business changes. You get a weekly report
          and an approval queue.
        </p>
        <p>
          If the agent does not perform, we change the configuration, the
          model, or the policy. We do not ask you to operate it.
        </p>
      </>
    ),
  },
];

/**
 * Differentiators — three stacked editorial blocks.
 *
 * Layout: a single column. Each block has a short headline and
 * two short paragraphs. No numbers, no icons, no decorative imagery.
 * The visual weight comes from typography and spacing.
 */
export function Differentiators() {
  return (
    <section
      id="how"
      aria-label="Differentiators"
      className="relative border-b hairline py-[100px] md:py-[140px]"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="max-w-3xl mb-16">
          <Eyebrow>Differentiators</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            What makes us different.
          </DisplayHeading>
        </div>

        <StackReveal className="space-y-16 md:space-y-24">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.t}
              data-stack
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-display text-h2 font-medium text-ink leading-tight">
                  {p.t}
                </h3>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 space-y-5 text-body text-ink-muted leading-relaxed">
                {p.body}
              </div>
            </article>
          ))}
        </StackReveal>
      </Container>
    </section>
  );
}