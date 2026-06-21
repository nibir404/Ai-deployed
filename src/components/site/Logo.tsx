import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-display text-[15px] font-medium tracking-[0.18em] uppercase select-none",
        className,
      )}
      aria-label="AI Deployed — Home"
    >
      <span className="inline-flex items-center gap-1">
        <span aria-hidden className="inline-block size-1.5 bg-current" />
        AI Deployed
      </span>
    </Link>
  );
}
