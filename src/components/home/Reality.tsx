import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";

const STRUGGLES = [
  "Disconnected systems",
  "Manual processes",
  "Low adoption",
  "Poor integration",
  "Operational bottlenecks",
  "Limited visibility",
  "Knowledge silos",
  "Underutilized investments",
];

/**
 * Reality — Dispatch-style two-column problem framing.
 *
 * Left column (5/12): oversized heading that mixes muted + accent.
 * Right column (7/12): a 2-col micro grid of ✕ items, each tile is
 * a hairline-bordered card with a lime ✕ glyph. This contrasts with
 * the marquee of sectors above and the icon grid of services below.
 */
export function Reality() {
  return (
    <section
      id="reality"
      aria-label="The reality of modern organizations"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Section 02 · Reality</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Technology is everywhere.
              <br />
              <span className="text-ink-muted">
                Operational outcome is{" "}
                <span className="accent-text">rare</span>.
              </span>
            </DisplayHeading>
            <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-md">
              Most organizations invest heavily in technology. Few translate it
              into measurable operational outcome.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] accent-text">
                ✕
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                What we hear
              </span>
              <span aria-hidden className="flex-1 h-px bg-[var(--color-line)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                {STRUGGLES.length} symptoms
              </span>
            </div>

            <StackReveal className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-line)]">
              {STRUGGLES.map((s) => (
                <li
                  key={s}
                  data-stack
                  className="card-surface p-5 flex items-center gap-4 group"
                >
                  <span
                    aria-hidden
                    className="font-mono text-sm tracking-[0] accent-text shrink-0"
                  >
                    ✕
                  </span>
                  <span className="text-sm md:text-base text-ink group-hover:text-ink transition-colors">
                    {s}
                  </span>
                </li>
              ))}
            </StackReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
