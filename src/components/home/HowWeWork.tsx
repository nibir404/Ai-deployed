import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { EnterpriseMap } from "@/components/home/EnterpriseMap";
import { cn } from "@/lib/cn";
import {
  Target,
  Workflow,
  Server,
  Settings,
  Gauge,
  Shield,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

const STEPS: {
  n: string;
  t: string;
  b: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    n: "01",
    t: "Discovery & Assessment",
    b: "Understand the organization: goals, systems, operations, people, constraints, and opportunities.",
    Icon: Target,
  },
  {
    n: "02",
    t: "Strategy & Architecture",
    b: "Translate strategy into an executable plan: AI initiatives, systems, infrastructure, governance, and rollout.",
    Icon: Workflow,
  },
  {
    n: "03",
    t: "Deployment & Integration",
    b: "Engineers deploy and integrate solutions into the real environment — applications, data, and operations.",
    Icon: Server,
  },
  {
    n: "04",
    t: "Operationalization",
    b: "Embed into teams, train operators, transfer knowledge, and ensure systems work under real conditions.",
    Icon: Settings,
  },
  {
    n: "05",
    t: "Optimization & Scale",
    b: "Iterate based on feedback, expand adoption, optimize performance, and support the organization as needs grow.",
    Icon: Gauge,
  },
  {
    n: "06",
    t: "Managed Support",
    b: "Continuous operation, monitoring, and improvement of deployed systems, with structured service delivery.",
    Icon: Shield,
  },
];

/**
 * HowWeWork — Dispatch-style with embedded EnterpriseMap.
 *
 * Layout:
 *   - Heading + intro on the left (5/12)
 *   - The 6 step cards (2x3) take the right (7/12)
 *   - A full-width EnterpriseMap diagram is promoted to the bottom,
 *     visually anchoring the whole "how we work" narrative.
 */
export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      aria-label="How we work"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Section 08 · How We Work</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Structured. Embedded. Accountable.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-md">
              Every engagement follows a structured operating framework —
              from discovery to long-term managed support.
            </p>
          </div>

          <ol className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-line)]">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className={cn(
                  "card-surface p-6 md:p-8 min-h-[200px] flex flex-col group relative overflow-hidden",
                  i === 2 && "border border-[var(--color-accent)]", // Step 3 (Deployment) — lime border to mark a "center" step
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    Step {s.n}
                  </span>
                  <s.Icon
                    size={20}
                    aria-hidden
                    className="text-ink-muted group-hover:text-ink transition-colors"
                  />
                </div>
                <h3 className="mt-6 font-display text-h3 font-medium text-ink leading-snug">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Enterprise operating map — promoted to a full-width band */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
              FIG · 03
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Operating framework
            </span>
            <span aria-hidden className="flex-1 h-px bg-[var(--color-line)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
              8 nodes
            </span>
          </div>
          <div className="card-surface border hairline p-2 md:p-4 text-ink">
            <EnterpriseMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
