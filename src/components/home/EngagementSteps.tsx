import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { EnterpriseMap } from "@/components/home/EnterpriseMap";
import { cn } from "@/lib/cn";
import {
  Target,
  Workflow,
  Settings,
  BarChart,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

const STEPS: {
  t: string;
  d: string;
  dur: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    t: "Discovery call",
    d: "We learn about the work you want an agent to do, your existing systems, and your governance requirements.",
    dur: "First",
    Icon: Target,
  },
  {
    t: "Design and build",
    d: "We design the agent — goal, tools, guardrails, approval mode — and build it against your systems.",
    dur: "Build",
    Icon: Workflow,
  },
  {
    t: "Review outputs",
    d: "Your team reviews the agent's drafts. We tune the configuration based on what your team edits.",
    dur: "Review",
    Icon: Settings,
  },
  {
    t: "Monitor and improve",
    d: "We run the agent in production, monitor the queue, and improve the configuration as your business changes.",
    dur: "Operate",
    Icon: BarChart,
  },
];

/**
 * EngagementSteps — four-step engagement timeline.
 *
 * Layout: a vertical 4-step timeline with a connecting hairline
 * rule on the left. Each step carries an icon, a short title, a
 * one-line description, and a duration label. Mirrors DeployCo's
 * &ldquo;From discovery to a working agent in production&rdquo;
 * section.
 */
export function EngagementSteps() {
  return (
    <section
      id="engagement"
      aria-label="How a DeployCo engagement works"
      className="relative border-b hairline py-[100px] md:py-[140px] overflow-hidden"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="max-w-3xl">
          <Eyebrow>Engagement</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            From discovery to a working agent in production.
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            Four steps. Most engagements are running in production by week
            four. After that, we run the agent for you and tune the
            configuration as your business changes.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)]">
          {STEPS.map((s, idx) => (
            <li
              key={s.t}
              className={cn(
                "card-surface p-6 md:p-7 min-h-[260px] flex flex-col group",
                idx === 1 && "border border-[var(--color-accent)]",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  Step {String(idx + 1).padStart(2, "0")}
                </span>
                <s.Icon
                  size={18}
                  aria-hidden
                  className="text-ink-muted group-hover:text-ink transition-colors"
                />
              </div>
              <h3 className="mt-6 font-display text-h3 font-medium text-ink leading-snug">
                {s.t}
              </h3>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">
                {s.d}
              </p>
              <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                {s.dur}
              </span>
            </li>
          ))}
        </ol>

        {/* Operating map — full-width band, kept as a supporting diagram */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
              FIG · 01
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Deployment capability map
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