"use client";

/**
 * countUp — animate a number from 0 to `target` over `duration` ms.
 * Returns a cancel function. Used by StatBlock for editorial metric reveals.
 */
export function countUp(
  target: number,
  duration = 1600,
  onUpdate: (value: number) => void,
  onComplete?: () => void,
) {
  const start = performance.now();
  let raf = 0;

  const tick = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    // easeOutExpo
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    onUpdate(target * eased);
    if (t < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export function formatStat(value: number, suffix?: string, prefix?: string) {
  const rounded = Math.round(value);
  const withCommas = rounded.toLocaleString("en-US");
  return `${prefix ?? ""}${withCommas}${suffix ?? ""}`;
}
