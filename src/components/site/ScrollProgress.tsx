"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — fixed-position vertical progress indicator on the
 * right edge of the viewport. Tracks document scroll progress as a
 * dotted vertical line + a moving mono "·" marker with the current %.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = h <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / h));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="hidden lg:flex fixed top-0 bottom-0 right-3 w-6 z-30 pointer-events-none flex-col items-center justify-center"
    >
      {/* The dotted track */}
      <div
        className="absolute inset-y-16 left-1/2 -translate-x-1/2 w-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-ink-muted) 0 1px, transparent 1px 6px)",
          opacity: 0.45,
        }}
      />
      {/* The moving marker */}
      <div
        className="absolute left-1/2 -translate-x-1/2 size-3 flex items-center justify-center"
        style={{
          top: `calc(${progress * 100}% - ${progress * 64}px + 64px - 6px)`,
        }}
      >
        <span className="block size-1.5 bg-[var(--color-ink)] rounded-full" />
      </div>
      {/* Percentage label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted"
        style={{
          top: `calc(${progress * 100}% - ${progress * 64}px + 64px + 12px)`,
        }}
      >
        {Math.round(progress * 100)
          .toString()
          .padStart(2, "0")}
      </div>
    </div>
  );
}