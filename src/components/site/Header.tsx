"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight } from "./icons";
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
        // Always glassy — backdrop-blur is on at all times so the
        // header reads as a frosted layer over the page content.
        // The scrolled state deepens the tint and adds a hairline
        // divider, but the blur is permanent.
        "fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-150",
        "-webkit-backdrop-blur-xl",
        "transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-bg)]/70 border-b hairline supports-[backdrop-filter]:bg-[var(--color-bg)]/55"
          : "bg-[var(--color-bg)]/30 supports-[backdrop-filter]:bg-[var(--color-bg)]/20",
      )}
      style={{
        // Fallback layered gradient that adds a subtle dark tint on
        // top of the blurred content — gives the glass extra body
        // even on browsers with limited backdrop-filter support.
        backgroundImage:
          "linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0.25))",
      }}
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
            className="btn-pill hidden md:inline-flex"
          >
            <span className="btn-pill__icon" aria-hidden>
              <ArrowUpRight size={14} />
            </span>
            Book Consultation
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
        <div className="lg:hidden border-t hairline bg-[var(--color-bg)]/85 backdrop-blur-xl">
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
                className="btn-pill"
              >
                <span className="btn-pill__icon" aria-hidden>
                  <ArrowUpRight size={14} />
                </span>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

