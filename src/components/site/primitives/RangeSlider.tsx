"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type RangeSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
  className?: string;
  hint?: string;
};

/**
 * RangeSlider — editorial mono range input with eyebrow label + tabular value.
 *
 * Visual:
 *   - Label in mono uppercase eyebrow
 *   - Large tabular value display (right-aligned)
 *   - Native `<input type="range">` styled with monochrome track + square thumb
 *   - Optional hint below
 *
 * Keyboard accessibility comes from the native range input (arrow keys adjust).
 */
export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
  className,
  hint,
}: RangeSliderProps) {
  const id = useId();
  const display = format ? format(value) : String(value);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted"
        >
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-xl md:text-2xl font-medium text-ink tabular-nums"
        >
          {display}
        </output>
      </div>

      <div className="relative mt-4">
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[var(--color-line)]"
        />
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-[var(--color-accent)]"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "relative w-full appearance-none bg-transparent cursor-pointer",
            "h-10 outline-none",
            // Square thumb — accent fill to match the Dispatch palette
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:bg-[var(--color-accent)]",
            "[&::-webkit-slider-thumb]:border-0",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:duration-150",
            "hover:[&::-webkit-slider-thumb]:scale-110",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:bg-[var(--color-accent)]",
            "[&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:cursor-pointer",
            // Use accent-color for native track fill where supported
            "[&::-webkit-slider-runnable-track]:h-px",
            "[&::-webkit-slider-runnable-track]:bg-[var(--color-line)]",
            "[&::-moz-range-track]:h-px",
            "[&::-moz-range-track]:bg-[var(--color-line)]",
          )}
          style={{ accentColor: "var(--color-accent)" }}
        />
      </div>

      {hint && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
          {hint}
        </p>
      )}
    </div>
  );
}
