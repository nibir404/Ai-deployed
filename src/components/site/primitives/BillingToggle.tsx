"use client";

import { cn } from "@/lib/cn";

export type BillingPeriod = "monthly" | "annual";

type BillingToggleProps = {
  value: BillingPeriod;
  onChange: (v: BillingPeriod) => void;
  className?: string;
  annualSavingsLabel?: string;
  /**
   * Visual variant:
   *   - "ink" (default) — segmented control with ink fill on active
   *   - "lime" — segmented pill with lime fill on active (Dispatch-style)
   */
  variant?: "ink" | "lime";
};

const OPTIONS: { id: BillingPeriod; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual" },
];

/**
 * BillingToggle — 2-option segmented control.
 *
 * Active option gets inverted styling. Honors `prefers-reduced-motion`
 * via global CSS rule.
 */
export function BillingToggle({
  value,
  onChange,
  className,
  annualSavingsLabel = "Save 17%",
  variant = "ink",
}: BillingToggleProps) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className={cn(
        "inline-flex items-center border hairline p-1",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const isActive = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative inline-flex items-center gap-2 px-5 py-2.5",
              "font-mono text-[11px] uppercase tracking-[0.16em]",
              "transition-colors duration-200",
              isActive
                ? variant === "lime"
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                  : "bg-[var(--color-ink)] text-[var(--color-bg)]"
                : "text-ink-muted hover:text-ink",
            )}
          >
            {opt.label}
            {opt.id === "annual" && !isActive && (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                · {annualSavingsLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
