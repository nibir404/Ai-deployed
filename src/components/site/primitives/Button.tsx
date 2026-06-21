import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";

type CommonProps = {
  variant?: Variant;
  /** Add a soft platinum glow + 1px ring on hover. Default false. */
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classes(
  variant: Variant,
  className?: string,
  glow?: boolean,
) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 rounded-[4px] font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 select-none";
  return cn(
    base,
    variant === "primary" &&
      "bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90",
    variant === "accent" &&
      "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:opacity-90",
    variant === "secondary" &&
      "border hairline text-ink hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]",
    variant === "ghost" &&
      "text-ink-muted hover:text-ink",
    glow && "hover:shadow-[0_0_0_1px_var(--color-accent),0_8px_32px_-8px_var(--color-accent-glow)]",
    className,
  );
}

export function ButtonLink({
  href,
  variant = "secondary",
  glow,
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, className, glow)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "secondary",
  glow,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, className, glow)} {...rest}>
      {children}
    </button>
  );
}
