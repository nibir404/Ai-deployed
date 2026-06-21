"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { GridLines } from "@/components/site/primitives/GridLines";
import { ThemeToggle } from "./ThemeToggle";

const COLS: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Approach",
    items: [
      { href: "/how-we-work", label: "How we work" },
      { href: "/capabilities", label: "Capabilities" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#roi", label: "ROI calculator" },
    ],
  },
  {
    label: "Legal",
    items: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:hello@ai-deployed.com", label: "hello@ai-deployed.com" },
      { href: "https://www.linkedin.com", label: "LinkedIn" },
      { href: "https://x.com", label: "X" },
    ],
  },
];

export function PageFooter() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    const t = d.toISOString().slice(11, 16); // HH:MM UTC
    setNow(`${t} UTC`);
  }, []);

  return (
    <footer className="relative border-t hairline">
      <GridLines sideRules edgeRule />
      <Container className="relative">
        {/* Top row — identity + columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pt-20 pb-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link
              href="/"
              aria-label="AI Deployed — Home"
              className="inline-flex items-center gap-2 font-display text-[15px] font-medium tracking-[0.2em] uppercase text-ink"
            >
              <span
                aria-hidden
                className="inline-block size-1.5 bg-[var(--color-accent)]"
              />
              AI Deployed
            </Link>
            <p className="max-w-sm text-sm text-ink-muted leading-relaxed">
              Forward-deployed engineering for AI and modern enterprise systems.
              We deploy, integrate, and operate.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              EST · 2024 · Global delivery
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {COLS.map((col) => (
              <div key={col.label}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  {col.label}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-muted hover:text-[var(--color-accent)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — copyright + corner UI */}
        <div className="border-t hairline py-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            © {new Date().getFullYear()} AI Deployed · All rights reserved
            {now ? ` · ${now}` : ""}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink transition-colors"
            >
              Terms
            </Link>
            <ThemeToggle />
            <a
              href="#hero"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink transition-colors inline-flex items-center gap-1.5"
              aria-label="Back to top"
            >
              Top <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
