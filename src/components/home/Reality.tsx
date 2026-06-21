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
              Operational outcome is rare.
            </DisplayHeading>
          </div>

          <div className="lg:col-span-7">
            <p className="text-body text-ink-muted leading-relaxed max-w-2xl">
              Most organizations invest heavily in technology. Few translate it
              into measurable operational outcome.
            </p>

            <StackReveal className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-line)]">
              {STRUGGLES.map((s) => (
                <li
                  key={s}
                  data-stack
                  className="card-surface p-5 flex items-center gap-4"
                >
                  <span
                    aria-hidden
                    className="font-mono text-[10px] tracking-[0.16em] text-ink-muted"
                  >
                    ✕
                  </span>
                  <span className="text-sm md:text-base text-ink">{s}</span>
                </li>
              ))}
            </StackReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}