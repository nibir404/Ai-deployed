// eslint-disable-next-line @next/next/no-img-element
import { cn } from "@/lib/cn";

type JpgBadgeProps = {
  src: string;
  alt: string;
  /** Rendered size in px. Default 64. */
  size?: number;
  /** Show a 1px lime ring around the badge. Default false. */
  accentRing?: boolean;
  /** Rounded shape: square (default), circle, blob. */
  shape?: "square" | "circle" | "blob";
  /** Optional className. */
  className?: string;
};

/**
 * JpgBadge — small wrapper for the cream-tone JPG illustrations.
 *
 * Used to surface one of the four 3D editorial illustrations (hex
 * nut, venn, diamond, sphere) as a tactile accent inside a card or
 * section header. The image is rendered via plain `<img>` (these are
 * tiny ~50 KB JPGs, not worth Next/image optimization). Cream-tone
 * content reads well on the dark base, and a lime ring on hover ties
 * the badge to the rest of the accent system.
 */
export function JpgBadge({
  src,
  alt,
  size = 64,
  accentRing = false,
  shape = "square",
  className,
}: JpgBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block relative overflow-hidden",
        shape === "square" && "rounded-[4px]",
        shape === "circle" && "rounded-full",
        shape === "blob" && "rounded-[28%_72%_70%_30%_/_30%_30%_70%_70%]",
        accentRing && "ring-1 ring-[var(--color-accent)]/60",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
