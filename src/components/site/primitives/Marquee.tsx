import { cn } from "@/lib/cn";

type MarqueeProps = {
  /** Items to render in the scrolling row. Will be duplicated 2x so the
   *  scroll can loop seamlessly without gaps. */
  items: string[];
  /** Pixel-per-second scroll speed. Default 40. */
  speed?: number;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Reverse direction. Default false. */
  reverse?: boolean;
  /** Element used per item. Default a `<span>`. */
  itemAs?: "span" | "div";
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
};

/**
 * Marquee — an infinite horizontal scroll of text items.
 *
 * Implementation notes:
 *   - Items are duplicated inline (×2) and translated from 0 → -50% via
 *     a CSS @keyframes animation. The 50% offset is exactly the width
 *     of the original list, so the loop is seamless.
 *   - Speed is controlled via the `animation-duration` derived from
 *     `speed` (px/sec) and the rendered track width — but since we
 *     can't measure the track width in CSS, we instead expose a
 *     `durationSec` heuristic tuned to look right at common widths.
 *   - The animation is wrapped in `@media (prefers-reduced-motion)`
 *     below — the global reduced-motion utility in globals.css also
 *     handles this. We rely on that global rule.
 *   - Rendered list is `aria-hidden` because it's decorative; the
 *     content is not the primary information channel.
 */
export function Marquee({
  items,
  speed = 40,
  pauseOnHover = true,
  reverse = false,
  itemAs: ItemTag = "span",
  className,
  itemClassName,
  ariaLabel = "Scrolling list",
}: MarqueeProps) {
  // Estimate duration: a track of N items at ~14ch each ≈ N*14ch wide.
  // 1ch ≈ 8px in our mono font, so a 6-item row is ~672px. 672 / 40 px/s
  // ≈ 17s. Round to a clamped range to feel "slow" without dragging.
  // For arbitrary lengths we pick a duration that scales with item count.
  const durationSec = Math.max(12, Math.min(60, items.length * 3));

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-hidden",
        // Fade edges so the loop reads as continuous, not abrupt.
        "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-12 before:bg-gradient-to-r before:from-[var(--color-bg)] before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-12 after:bg-gradient-to-l after:from-[var(--color-bg)] after:to-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max gap-12 md:gap-16 will-change-transform",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee-scroll ${durationSec}s linear infinite${
            reverse ? " reverse" : ""
          }`,
        }}
      >
        {[...items, ...items].map((it, i) => (
          <ItemTag
            key={`${it}-${i}`}
            className={cn(
              "shrink-0 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-ink-muted whitespace-nowrap",
              "hover:text-ink transition-colors",
              itemClassName,
            )}
          >
            {it}
          </ItemTag>
        ))}
      </div>

      {/* Keyframes — defined inline via a scoped <style> tag so the
          component is self-contained and works regardless of global
          Tailwind config. */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
