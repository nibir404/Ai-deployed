import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";

const OUTCOMES = [
  { t: "Faster operations", b: "Lower latency, higher throughput." },
  { t: "Higher productivity", b: "Embedded automation, compounding." },
  { t: "Lower cost", b: "Quantified opex reduction." },
  { t: "Better decisions", b: "Decision intelligence, real-time." },
  { t: "Improved CX", b: "Quicker, higher-quality service." },
  { t: "Less manual work", b: "Repetitive work automated." },
  { t: "Modern stack", b: "Cloud-native, observable." },
  { t: "Scalable AI", b: "Pilot to production, intact." },
  { t: "Resilience", b: "Continuity through change." },
  { t: "Quantifiable value", b: "Measured in outcomes, not deliverables." },
];

/**
 * Outcomes — Dispatch-style 5×2 dense grid.
 *
 * 10 outcomes laid out in a 5-col × 2-row grid. Each tile carries
 * a giant lime display index and a one-line description. No icons —
 * the index IS the icon. This contrasts with the 4-up service grid
 * above and the 3-up pricing below.
 */
export function Outcomes() {
  return (
    <section
      id="outcomes"
      aria-label="Outcomes we deliver"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>Section 10 · Outcomes</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Measurable impact.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-md">
              Measured by outcomes, not deliverables.
            </p>
          </div>

          <StackReveal className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-line)]">
            {OUTCOMES.map((o, i) => (
              <li
                key={o.t}
                data-stack
                className="card-surface p-5 md:p-6 min-h-[180px] flex flex-col group"
              >
                <span
                  aria-hidden
                  className="font-display text-4xl md:text-5xl font-medium leading-none tracking-[-0.04em] text-ink"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-h3 font-medium text-ink leading-snug">
                  {o.t}
                </h3>
                <p className="mt-auto pt-4 text-sm text-ink-muted leading-relaxed">
                  {o.b}
                </p>
              </li>
            ))}
          </StackReveal>
        </div>
      </Container>
    </section>
  );
}
