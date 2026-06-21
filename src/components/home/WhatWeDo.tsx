import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { TextReveal } from "@/components/site/primitives/TextReveal";
import {
  Sparkles,
  Cpu,
  Zap,
  Layers,
  Workflow,
  Cloud,
  Settings,
  Server,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

const SERVICES: {
  n: string;
  t: string;
  b: string;
  Icon: ComponentType<IconProps>;
}[] = [
  { n: "01", t: "AI Transformation", b: "Identify, prioritize, deploy. Tied to outcomes.", Icon: Sparkles },
  { n: "02", t: "Enterprise AI Systems", b: "Production-grade, integrated, monitored.", Icon: Cpu },
  { n: "03", t: "Generative AI", b: "Secure LLM, retrieval, governance built in.", Icon: Zap },
  { n: "04", t: "AI Agents", b: "Workflow automation at enterprise scale.", Icon: Layers },
  { n: "05", t: "Systems Integration", b: "Applications, data, processes — connected.", Icon: Workflow },
  { n: "06", t: "Cloud Infrastructure", b: "Hyperscaler and hybrid, modernized.", Icon: Cloud },
  { n: "07", t: "Managed Services", b: "Operate, monitor, optimize — embedded.", Icon: Settings },
  { n: "08", t: "Modernization", b: "Legacy environments, no disruption.", Icon: Server },
];

/**
 * WhatWeDo — Dispatch-style 4×2 service grid.
 *
 * Each card carries a giant display number top-left, a lime hairline
 * underline that grows on hover, and a small icon. The 4-up grid is
 * visually distinct from the 2-col micro-grid of struggles above and
 * the 5/7 asymmetric layout of sections below.
 */
export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-label="What we do"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>Section 03 · What We Do</Eyebrow>
          <TextReveal
            as="h2"
            className="mt-6 font-display text-section leading-[0.96] tracking-[-0.035em] font-medium text-ink"
          >
            We turn technology investments into operational outcomes.
          </TextReveal>
        </div>

        <StackReveal className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)]">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-stack
              className="card-surface p-6 md:p-8 min-h-[260px] flex flex-col group relative overflow-hidden hover:bg-[var(--color-surface)] transition-colors"
            >
              {/* Big numeric index — display font, lime on hover */}
              <span
                aria-hidden
                className="font-display text-[3.5rem] md:text-[4rem] font-medium leading-none tracking-[-0.04em] text-ink-dim group-hover:text-[var(--color-accent)] transition-colors"
              >
                {s.n}
              </span>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Service
                </span>
                <s.Icon
                  size={20}
                  aria-hidden
                  className="text-ink-muted group-hover:text-ink transition-colors"
                />
              </div>

              <h3 className="mt-3 font-display text-h3 font-medium leading-tight text-ink">
                {s.t}
              </h3>
              <p className="mt-auto pt-6 text-sm text-ink-muted leading-relaxed">
                {s.b}
              </p>

              {/* Bottom hairline — invisible by default, lime on hover */}
              <span
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-px bg-[var(--color-line)] group-hover:bg-[var(--color-accent)] transition-colors"
              />
            </article>
          ))}
        </StackReveal>
      </Container>
    </section>
  );
}
