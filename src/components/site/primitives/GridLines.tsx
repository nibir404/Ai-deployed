import { cn } from "@/lib/cn";

type Props = {
  /**
   * Show vertical hairline rules at the container's left & right
   * gutter. These sit OUTSIDE the content (in the gutter) so they
   * never overlap text or cards.
   */
  sideRules?: boolean;
  /**
   * Show a dotted accent line at the far-right edge of the section.
   * Sits in the gutter, away from content.
   */
  edgeRule?: boolean;
  /**
   * Show a faint 12-column reference grid behind content. The lines
   * are aligned with the actual content column structure (12 cols,
   * matching `grid-cols-12` layouts used by the card sections) and
   * confined to the container width — they do NOT bleed outside
   * the container or behind the gutter padding.
   *
   * Lines are very low opacity and sit BEHIND the content (z-0).
   * Card surfaces have opaque backgrounds, so the lines are only
   * visible in the gaps between cards or around text columns.
   */
  baselineGrid?: boolean;
  /** Optional fixed height for the baseline grid layer (default 100%). */
  gridHeight?: string;
  className?: string;
};

/**
 * GridLines — non-interactive overlay that adds editorial structural
 * cues to any section. Three layers, all opt-in via props:
 *
 *   1. sideRules     — vertical hairlines flanking the container's
 *                      left/right gutter (sit in the gutter, never
 *                      cross content).
 *   2. edgeRule      — a single dotted accent line at the right edge
 *                      of the section (visible from viewport edge to
 *                      section bottom).
 *   3. baselineGrid  — a faint 12-column reference grid aligned to
 *                      the container's exact width and column
 *                      boundaries. Reads as a structural blueprint,
 *                      not as random noise.
 *
 * The component is purely visual — it adds no semantics and is
 * marked aria-hidden via its parent.
 */
export function GridLines({
  sideRules = false,
  edgeRule = false,
  baselineGrid = false,
  className,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0",
        className,
      )}
    >
      {sideRules && (
        <>
          {/* Left gutter rule — sits in the page gutter, OUTSIDE the
              container's content area. */}
          <div className="absolute inset-y-0 left-[max(1rem,calc((100vw-1280px)/2+1rem))] w-px bg-[var(--color-line)]" />
          {/* Right gutter rule */}
          <div className="absolute inset-y-0 right-[max(1rem,calc((100vw-1280px)/2+1rem))] w-px bg-[var(--color-line)]" />
        </>
      )}

      {edgeRule && (
        <>
          {/* Far-right dotted accent line — sits inside the right
              gutter, away from content. */}
          <div
            className="absolute top-0 bottom-0 right-3 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--color-ink-muted) 0 1px, transparent 1px 6px)",
              opacity: 0.4,
            }}
          />
          {/* Tick marks at top and bottom of edge rule */}
          <div className="absolute top-0 right-3 -translate-y-1/2 h-2 w-px bg-[var(--color-ink-muted)]" />
          <div className="absolute bottom-0 right-3 translate-y-1/2 h-2 w-px bg-[var(--color-ink-muted)]" />
        </>
      )}

      {baselineGrid && (
        /*
         * Confined to the container width (.container-editorial =
         * max 1280px with gutter padding). 12 vertical lines mark
         * the column boundaries — these align with the `grid-cols-12`
         * layouts used by card sections so the grid reads as a
         * structural blueprint rather than random noise.
         *
         * Lines are very low opacity. Card surfaces have opaque
         * backgrounds, so the lines only show through the gaps
         * between cards — they do not overlap text.
         */
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
          <div className="container-editorial h-full">
            <div className="relative h-full">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-[var(--color-line)]"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    opacity: 0.25,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
