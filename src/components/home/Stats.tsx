"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { GridLines } from "@/components/site/primitives/GridLines";
import { useGsapCountUp } from "@/lib/useGsapCountUp";

const STATS = [
  { value: 47, suffix: "+", label: "Enterprise deployments", caption: "Across banking, telecom, government, healthcare, and manufacturing." },
  { value: 12, label: "Industries served", caption: "Highly regulated, operationally complex, organization-wide programs." },
  { value: 98, suffix: "%", label: "Client retention", caption: "Long-term engagement with measurable operational outcomes." },
  { value: 6, suffix: "–18 mo", label: "Average engagement", caption: "Time from assessment through operationalization to scale." },
];

const STAGGER = 0.18; // seconds between each counter starting

/**
 * Stats — clean editorial single row of operating metrics.
 *
 * Layout:
 *   - Eyebrow sits above the grid, no extra display heading.
 *   - 4 oversized numbers with their suffix inline. The suffix uses
 *     the same white as the number so the callout reads as one
 *     typographic block — no competing platinum accent that ends
 *     up dimmer than the digit.
 *   - Under each number: a single mono label + 1-line caption.
 *   - Bottom: a single hairline + a centred mono caption that ties
 *     the row back to the page's editorial language.
 *
 * Counter animation:
 *   - GSAP-driven (high-resolution ticker, smoother than RAF).
 *   - Each counter starts in sequence (STAGGER seconds apart) for a
 *     deliberate cascading reveal.
 *   - Displayed value is rounded every frame, so the rendered text
 *     is always an integer — no fractional flicker mid-animation.
 *   - Respects prefers-reduced-motion (jumps straight to final value).
 */
export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats"
      aria-label="Operating metrics"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <Eyebrow>Section 05 · Operating Metrics</Eyebrow>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {STATS.map((s, i) => (
            <StatCell
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              caption={s.caption}
              delay={i * STAGGER}
              enabled={inView}
            />
          ))}
        </div>

        {/* Single horizontal hairline beneath the row */}
        <div className="mt-16 h-px bg-[var(--color-line)]" />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim text-center">
          Benchmarked across 47+ multi-year enterprise deployments
        </p>
      </Container>
    </section>
  );
}

function StatCell({
  value,
  suffix,
  label,
  caption,
  delay,
  enabled,
}: {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
  delay: number;
  enabled: boolean;
}) {
  const display = useGsapCountUp({ to: value, duration: 1.8, delay, enabled });

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1 leading-none">
        <span className="font-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-medium tracking-[-0.04em] text-ink tabular-nums">
          {display}
          {suffix && (
            <span className="ml-1 text-[0.6em] font-medium">{suffix}</span>
          )}
        </span>
      </div>
      <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </span>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xs">
        {caption}
      </p>
    </div>
  );
}