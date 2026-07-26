import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center select-none",
        className,
      )}
      aria-label="AI Deployed — Home"
    >
      {/* Dark source — shown in light theme (dark ink on paper) */}
      <Image
        src="/img/AiDeployed logo dark.png"
        alt="AI Deployed"
        width={720}
        height={160}
        priority
        className="logo-dark h-14 md:h-20 w-auto"
      />
      {/* Light source — shown in dark theme (light ink on charcoal) */}
      <Image
        src="/img/AiDeployed logo white.png"
        alt=""
        aria-hidden
        width={720}
        height={160}
        className="logo-light h-14 md:h-20 w-auto"
      />
    </Link>
  );
}