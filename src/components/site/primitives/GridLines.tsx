import { cn } from "@/lib/cn";

type Props = {
  /** Show vertical hairline rules at the container's left & right gutter. */
  sideRules?: boolean;
  /** Show a dotted accent line at the far-right edge of the section. */
  edgeRule?: boolean;
  /** Show a faint 12-column baseline reference grid behind content. */
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
 *                      left/right gutter. Subtle, monochrome.
 *   2. edgeRule      — a single dotted accent line at the right edge
 *                      of the section (visible from viewport edge to
 *                      section bottom). Like an editorial column rule.
 *   3. baselineGrid  — a faint 12-column reference grid that fades out
 *                      toward the bottom. Reads as a blueprint.
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
          {/* Left gutter rule */}
          <div className="absolute inset-y-0 left-[max(1rem,calc((100vw-1280px)/2+1rem))] w-px bg-[var(--color-line)]" />
          {/* Right gutter rule */}
          <div className="absolute inset-y-0 right-[max(1rem,calc((100vw-1280px)/2+1rem))] w-px bg-[var(--color-line)]" />
        </>
      )}

      {edgeRule && (
        <>
          {/* Far-right dotted accent line */}
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
        <div
          className="absolute inset-x-0 top-0 h-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
        >
          <div className="mx-auto max-w-[1280px] h-full grid grid-cols-12 gap-px px-[max(1rem,calc((100vw-1280px)/2+1rem))]">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="h-full w-px bg-[var(--color-line)] opacity-40"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}