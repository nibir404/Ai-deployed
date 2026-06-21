import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";
import {
  Target,
  Terminal,
  Network,
  Gauge,
  Building,
  Workflow,
  Layers,
  Shield,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

const REASONS: {
  t: string;
  b: string;
  Icon: ComponentType<IconProps>;
}[] = [
  { t: "We operationalize", b: "Beyond delivery — into adoption, integration, daily use.", Icon: Target },
  { t: "We engineer", b: "Embedded teams build and operate, not just advise.", Icon: Terminal },
  { t: "We sit embedded", b: "Knowledge transfer happens in the work itself.", Icon: Network },
  { t: "We lead with outcomes", b: "Vendor-neutral. Problem before tool.", Icon: Gauge },
  { t: "We work at scale", b: "Banks, telecoms, governments, hospitals, manufacturers.", Icon: Building },
  { t: "We bridge domains", b: "Engineering depth, operational fluency.", Icon: Workflow },
  { t: "We transfer capability", b: "Clients own what we build.", Icon: Layers },
  { t: "We own the lifecycle", b: "Strategy → deployment → operation → support.", Icon: Shield },
];

/**
 * WhyAiDeployed — 4×2 grid with 3-digit index.
 *
 * Each card carries a 3-digit display index, an icon, a heading,
 * and a 1-line description. On hover the index and icon shift to
 * platinum — subtle, editorial. Header is text-only — no decorative
 * JPG illustration.
 */
export function WhyAiDeployed() {
  return (
    <section
      id="why"
      aria-label="Why AI Deployed"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="max-w-4xl">
          <Eyebrow>Section 13 · Why AI Deployed</Eyebrow>
          <DisplayHeading as="h2" className="mt-6">
            Eight reasons organizations choose us.
          </DisplayHeading>
        </div>

        <StackReveal className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)]">
          {REASONS.map((r, i) => (
            <li
              key={r.t}
              data-stack
              className="card-surface p-6 md:p-7 min-h-[220px] flex flex-col gap-4 group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="font-display text-3xl md:text-4xl font-medium leading-none tracking-[-0.04em] text-ink-dim group-hover:accent-text transition-colors"
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
                <r.Icon
                  size={20}
                  aria-hidden
                  className="text-ink-muted group-hover:text-ink transition-colors"
                />
              </div>
              <h3 className="font-display text-h3 font-medium leading-snug text-ink">
                {r.t}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {r.b}
              </p>
            </li>
          ))}
        </StackReveal>
      </Container>
    </section>
  );
}
