"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Cell size in px. Each cell renders one character. Default 14. */
  cellSize?: number;
  /** Radius of the cursor influence (cells). Default 14. */
  radius?: number;
  /** Optional className. */
  className?: string;
};

const ASCII_CHARS = [
  "·",
  "·",
  "·",
  "·",
  "·",
  "·",
  "⋅",
  "∘",
  "○",
  "◌",
  "◦",
  "◍",
  "◎",
  "●",
  "█",
];

/**
 * InteractiveDotGrid — full-bleed interactive ASCII/dot background.
 *
 * Renders a fine grid of dots. Near the cursor, dots animate through
 * ASCII glyphs (from `·` to `█`) based on inverse distance. Outside
 * the influence radius, dots stay quiet. The grid subtly drifts with
 * time to feel "alive" without being distracting.
 *
 * Theme-aware: dots use `var(--color-line)` for the resting state
 * and `var(--color-ink)` for the cursor-hot center, so the grid
 * reads on both dark and light themes without per-theme tweaks.
 *
 * Honors `prefers-reduced-motion`: skips the ambient drift and the
 * cursor influence — just a static dot field.
 *
 * Implementation:
 *   - One `<canvas>` per instance, sized to the container.
 *   - requestAnimationFrame redraws on every cursor move (or every
 *     60ms for ambient drift when idle).
 *   - The full grid of cells is precomputed once; only the per-cell
 *     character/color is recomputed per frame.
 */
export function InteractiveDotGrid({
  cellSize = 14,
  radius = 14,
  className,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;

    const setup = () => {
      const rect = wrapper.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(cw / cellSize) + 1;
      rows = Math.ceil(ch / cellSize) + 1;
    };

    setup();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, cw, ch);

      const cx = mouseRef.current.x;
      const cy = mouseRef.current.y;
      const active = mouseRef.current.active && !reduceMotion;
      const maxR = radius * cellSize;

      // Pull theme colors via CSS vars so the grid reads on both
      // dark and light themes.
      const styles = getComputedStyle(canvas);
      const lineColor = styles.getPropertyValue("--color-line").trim() ||
        "rgba(255,255,255,0.08)";
      const inkColor = styles.getPropertyValue("--color-ink").trim() ||
        "#ffffff";
      const dimColor = styles.getPropertyValue("--color-ink-muted").trim() ||
        "rgba(255,255,255,0.5)";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${cellSize}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;

      // Ambient drift offset — tiny figure-8 in pixels. Disabled when
      // reduceMotion is set OR when the cursor is active (so the
      // cursor takes full attention).
      const drift = active || reduceMotion
        ? { x: 0, y: 0 }
        : {
            x: Math.sin(t * 0.0003) * 4,
            y: Math.cos(t * 0.0002) * 3,
          };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize + cellSize / 2 + drift.x;
          const y = r * cellSize + cellSize / 2 + drift.y;

          // Default rest state — a quiet dot.
          let intensity = 0;
          if (active) {
            const dx = x - cx;
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxR) {
              // Inverse-distance falloff (0 at edge, 1 at center)
              intensity = Math.max(0, 1 - dist / maxR);
              // Sharpen the falloff with a power so only cells very
              // close to the cursor get the bright ASCII glyphs.
              intensity = Math.pow(intensity, 1.6);
            }
          }

          if (intensity < 0.04) {
            // Quiet dot — use line color
            ctx.fillStyle = lineColor;
            ctx.fillText("·", x, y);
          } else {
            // Map intensity (0–1) to a character index and color.
            const charIdx = Math.min(
              ASCII_CHARS.length - 1,
              Math.floor(intensity * ASCII_CHARS.length),
            );
            const glyph = ASCII_CHARS[charIdx];
            // Color blends from line → muted → ink based on intensity.
            if (intensity > 0.7) {
              ctx.fillStyle = inkColor;
            } else if (intensity > 0.35) {
              ctx.fillStyle = dimColor;
            } else {
              ctx.fillStyle = lineColor;
            }
            ctx.fillText(glyph, x, y);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);
    wrapper.addEventListener("pointerenter", () => {
      mouseRef.current.active = true;
    });

    const ro = new ResizeObserver(() => setup());
    ro.observe(wrapper);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, [cellSize, radius]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "auto",
        cursor: "crosshair",
      }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}