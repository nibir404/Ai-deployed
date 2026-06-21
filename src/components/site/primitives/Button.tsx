import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

function classes(variant: Variant, className?: string) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 select-none";
  return cn(
    base,
    variant === "primary" &&
      "bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90",
    variant === "secondary" &&
      "border hairline text-ink hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]",
    variant === "ghost" &&
      "text-ink-muted hover:text-ink",
    className,
  );
}

export function ButtonLink({
  href,
  variant = "secondary",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "secondary",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
