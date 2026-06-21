import { cn } from "@/lib/cn";

type AccentGlowProps = {
  /**
   * Position of the glow center:
   * - `top` (default) — radial ellipse anchored to the top of the container,
   *   good for hero / CTA sections where light "shines down" from above.
   * - `center` — circle in the middle, good for centered CTAs.
   * - `corner-tl` / `corner-tr` / `corner-bl` / `corner-br` — soft corner glow.
   */
  position?: "top" | "center" | "corner-tl" | "corner-tr" | "corner-bl" | "corner-br";
  /** Glow intensity (0-100). Higher = more opaque. Default 60. */
  intensity?: number;
  /** Optional className passed to the wrapping div. */
  className?: string;
};

/**
 * AccentGlow — a soft platinum radial glow placed behind content.
 *
 * Always `aria-hidden` and `pointer-events-none` — purely decorative.
 * Renders a single absolutely-positioned div with a radial-gradient
 * background. Sibling content needs `relative` + a higher z-index to
 * sit above the glow.
 *
 * No JS, no animation — keep it cheap so it can live in every section
 * without measurable paint cost.
 */
export function AccentGlow({
  position = "top",
  intensity = 60,
  className,
}: AccentGlowProps) {
  // Build a per-position gradient. The light end of the palette
  // (platinum) acts as the highlight wash — pure white would be
  // clinical, so we use #e7e7e7 mixed toward transparent.
  const alpha = Math.max(0, Math.min(100, intensity)) / 100;
  const inner = `rgba(var(--color-accent-rgb), ${0.45 * alpha})`;
  const mid = `rgba(var(--color-accent-rgb), ${0.18 * alpha})`;

  let gradient = "";
  switch (position) {
    case "top":
      gradient = `radial-gradient(ellipse 80% 60% at 50% 0%, ${inner} 0%, ${mid} 35%, transparent 70%)`;
      break;
    case "center":
      gradient = `radial-gradient(circle at center, ${inner} 0%, ${mid} 30%, transparent 65%)`;
      break;
    case "corner-tl":
      gradient = `radial-gradient(ellipse 60% 60% at 0% 0%, ${inner} 0%, transparent 60%)`;
      break;
    case "corner-tr":
      gradient = `radial-gradient(ellipse 60% 60% at 100% 0%, ${inner} 0%, transparent 60%)`;
      break;
    case "corner-bl":
      gradient = `radial-gradient(ellipse 60% 60% at 0% 100%, ${inner} 0%, transparent 60%)`;
      break;
    case "corner-br":
      gradient = `radial-gradient(ellipse 60% 60% at 100% 100%, ${inner} 0%, transparent 60%)`;
      break;
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0",
        className,
      )}
      style={{ backgroundImage: gradient }}
    />
  );
}
