import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";
import {
  Bolt,
  Gauge,
  LineChart,
  Target,
  Star,
  Sparkles,
  Cloud,
  Layers,
  Shield,
  ArrowUpRight,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

const OUTCOMES: {
  t: string;
  b: string;
  Icon: ComponentType<IconProps>;
}[] = [
  { t: "Faster operations", b: "Lower latency, higher throughput.", Icon: Bolt },
  { t: "Higher productivity", b: "Embedded automation, compounding.", Icon: Gauge },
  { t: "Lower cost", b: "Quantified opex reduction.", Icon: LineChart },
  { t: "Better decisions", b: "Decision intelligence, real-time.", Icon: Target },
  { t: "Improved CX", b: "Quicker, higher-quality service.", Icon: Star },
  { t: "Less manual work", b: "Repetitive work automated.", Icon: Sparkles },
  { t: "Modern stack", b: "Cloud-native, observable.", Icon: Cloud },
  { t: "Scalable AI", b: "Pilot to production, intact.", Icon: Layers },
  { t: "Resilience", b: "Continuity through change.", Icon: Shield },
  { t: "Quantifiable value", b: "Measured in outcomes, not deliverables.", Icon: ArrowUpRight },
];

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

          <StackReveal className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-line)]">
            {OUTCOMES.map((o, i) => (
              <li
                key={o.t}
                data-stack
                className="card-surface p-6 md:p-7 min-h-[140px] flex flex-col gap-4 group"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <o.Icon
                    size={18}
                    aria-hidden
                    className="text-ink-muted group-hover:text-ink transition-colors"
                  />
                </div>
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {o.t}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
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