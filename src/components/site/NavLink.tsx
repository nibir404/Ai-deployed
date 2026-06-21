"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isAnchor = href.startsWith("/#");
  const isActive = !isAnchor && pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "font-mono text-[12px] tracking-[0.14em] uppercase text-ink-muted hover:text-ink transition-colors",
        isActive && "text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
