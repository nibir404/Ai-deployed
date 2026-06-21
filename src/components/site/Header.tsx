"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/#roi", label: "ROI" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-bg)]/90 backdrop-blur-md border-b hairline"
          : "bg-transparent",
      )}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.href} href={n.href}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle className="hidden md:inline-flex" />
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border hairline text-ink font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors"
          >
            Book Consultation
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center size-9 border hairline"
          >
            <span aria-hidden className="font-mono text-xs">
              {open ? "✕" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t hairline bg-[var(--color-bg)]">
          <div className="container-editorial py-6 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 border hairline font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                Book Consultation →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
