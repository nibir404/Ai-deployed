"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Target value. */
  to: number;
  /** Duration in seconds. Default 1.8 */
  duration?: number;
  /** Delay in seconds (for stagger). Default 0 */
  delay?: number;
  /** Start the animation when this is true. Default true */
  enabled?: boolean;
};

/**
 * useGsapCountUp — animated counter driven by GSAP's ticker.
 *
 * Uses `gsap.to({...}, { onUpdate })` so the animation is frame-locked
 * to GSAP's high-resolution ticker (not the browser's RAF) and benefits
 * from GSAP's built-in easing catalogue. The value is rounded each
 * frame so the rendered text is always an integer (no "5.7382…"
 * flicker mid-animation).
 *
 * Honors `prefers-reduced-motion`: when set, jumps straight to the
 * target value with no animation.
 *
 * Returns the current display value as an integer.
 */
export function useGsapCountUp({
  to,
  duration = 1.8,
  delay = 0,
  enabled = true,
}: Options): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current) return;
    startedRef.current = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setValue(Math.round(to));
      return;
    }

    let cleanup: (() => void) | undefined;
    const obj = { v: 0 };

    (async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default ?? gsapMod.gsap;

      const tween = gsap.to(obj, {
        v: to,
        duration,
        delay,
        ease: "power3.out",
        onUpdate: () => {
          setValue(Math.round(obj.v));
        },
      });

      cleanup = () => {
        tween.kill();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [enabled, to, duration, delay]);

  return value;
}
