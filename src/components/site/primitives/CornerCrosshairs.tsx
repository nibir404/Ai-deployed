import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Size of the bracket arms in pixels. Default 16 */
  size?: number;
  /** Color of the brackets. Default uses --color-ink-muted. */
  color?: string;
};

/**
 * CornerCrosshairs — four L-shaped corner brackets positioned at the
 * edges of the parent. Editorial blueprint feel. Pointer-events-none.
 */
export function CornerCrosshairs({
  className,
  size = 16,
  color = "var(--color-ink-muted)",
}: Props) {
  const stroke = `1px solid ${color}`;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {/* Top-left */}
      <span
        className="absolute top-0 left-0"
        style={{
          width: size,
          height: size,
          borderTop: stroke,
          borderLeft: stroke,
        }}
      />
      {/* Top-right */}
      <span
        className="absolute top-0 right-0"
        style={{
          width: size,
          height: size,
          borderTop: stroke,
          borderRight: stroke,
        }}
      />
      {/* Bottom-left */}
      <span
        className="absolute bottom-0 left-0"
        style={{
          width: size,
          height: size,
          borderBottom: stroke,
          borderLeft: stroke,
        }}
      />
      {/* Bottom-right */}
      <span
        className="absolute bottom-0 right-0"
        style={{
          width: size,
          height: size,
          borderBottom: stroke,
          borderRight: stroke,
        }}
      />
    </div>
  );
}