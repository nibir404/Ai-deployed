"use client";

import { useEffect, useRef, useState } from "react";
import { countUp, formatStat } from "@/lib/countUp";
import { cn } from "@/lib/cn";

type StatBlockProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption?: string;
  className?: string;
};

/**
 * StatBlock — oversized editorial number + caption + hairline.
 * Animates from 0 once it enters the viewport.
 */
export function StatBlock({
  value,
  prefix,
  suffix,
  label,
  caption,
  className,
}: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPlayed(true);
            const reduced = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            if (reduced) {
              setDisplay(value);
            } else {
              countUp(value, 1500, (v) => setDisplay(v));
            }
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [played, value]);

  return (
    <div ref={ref} className={cn("py-8", className)}>
      <div className="font-display text-[clamp(1.875rem,1.25rem+2vw,3rem)] leading-none font-medium text-ink tabular-nums">
        {formatStat(display, suffix, prefix)}
      </div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </div>
      {caption && (
        <p className="mt-3 text-sm text-ink-muted max-w-xs leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
}
