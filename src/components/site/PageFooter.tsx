import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Logo } from "./Logo";

const PRODUCT = [
  { href: "/platform", label: "Platform" },
  { href: "/governance", label: "Governance" },
  { href: "/how-we-work", label: "How it works" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
];

/**
 * PageFooter — 4-column site footer (brand + tagline, Product,
 * Company, Legal) over a thin copyright/disclaimer/email bar.
 *
 * Clean columns, mono labels, hairline rules, no decorative imagery.
 */
export function PageFooter() {
  return (
    <footer className="relative border-t hairline">
      <Container className="relative">
        {/* Top row — 4-column grid: brand | product | company | legal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-20 pb-12">
          {/* Brand block */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm text-ink-muted leading-relaxed">
              Custom AI agents, built and run for you.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Product
            </div>
            <ul className="mt-5 space-y-3">
              {PRODUCT.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Company
            </div>
            <ul className="mt-5 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Legal
            </div>
            <ul className="mt-5 space-y-3">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row — copyright + disclaimer + email */}
        <div className="border-t hairline py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            © {new Date().getFullYear()} AI Deployed · California
          </p>
          <a
            href="mailto:hello@ai-deployed.com"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim hover:text-ink transition-colors"
          >
            hello@ai-deployed.com
          </a>
        </div>
      </Container>
    </footer>
  );
}