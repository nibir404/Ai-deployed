import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { ArrowUpRight } from "@/components/site/icons";

const CATEGORIES = [
  { t: "AI Strategy", d: "Frameworks for sequencing AI initiatives." },
  { t: "Operationalization", d: "Pilots to production — field notes." },
  { t: "Systems Integration", d: "Enterprise-scale architecture patterns." },
  { t: "Generative AI", d: "Governance, retrieval, production patterns." },
  { t: "AI Governance", d: "Risk, compliance, observability in production." },
  { t: "Enterprise Architecture", d: "Modern patterns for legacy environments." },
  { t: "Cloud Infrastructure", d: "Hyperscaler, hybrid, multi-cloud." },
  { t: "Data Platforms", d: "Pipelines and the systems that feed AI." },
  { t: "Engineering Practice", d: "How we build, deploy, and operate." },
  { t: "Transformation", d: "Operating models, the human side." },
];

/**
 * Research — full-bleed 5×2 grid with centered editorial header.
 *
 * Layout (distinct from neighbouring sections):
 *   - Centered eyebrow + oversized two-line heading + 1-line body,
 *     set on a single max-width column. The "{n} categories — Browse
 *     all →" mono row sits below the body.
 *   - Single horizontal hairline beneath the header — gives the
 *     grid a clear top edge.
 *   - 5-col × 2-row grid spanning the full container (no left
 *     sidebar) so every card has plenty of horizontal room. No more
 *     awkward 2-line title wraps or overflowing descriptions.
 *
 * Card anatomy:
 *   - Numeric index top-left, arrow top-right (consistent with the
 *     rest of the site's card grammar).
 *   - Title in display font, allowing up to 2 lines.
 *   - Description in body font, allowing up to 3 lines.
 *   - Hover: title shifts to platinum (the "accent" tone) and the
 *     card surface lightens one shade. Subtle, editorial.
 *
 * Footer:
 *   - Centered "Browse all research →" secondary button below the
 *     grid — gives the section a clear close and matches the
 *     editorial grammar of neighbouring sections.
 */
export function Research() {
  return (
    <section
      id="research"
      aria-label="Research and writing"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>Section 12 · Research</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-6">
            We write what
            <br />
            we build.
          </DisplayHeading>
          <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-xl mx-auto">
            Field notes from our engineers and architects. Operator-grade
            depth — no fluff.
          </p>
          <div className="mt-8 inline-flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {String(CATEGORIES.length).padStart(2, "0")} categories
            </span>
            <span aria-hidden className="h-px w-12 bg-[var(--color-line)]" />
            <Link
              href="/resources"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink inline-flex items-center gap-1.5"
            >
              Browse all <ArrowUpRight size={12} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Single horizontal hairline that frames the grid below */}
        <div className="mt-16 h-px bg-[var(--color-line)]" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-line)]">
          {CATEGORIES.map((c, i) => (
            <li key={c.t} className="card-surface">
              <Link
                href="/resources"
                className="group relative flex flex-col justify-between p-6 md:p-7 min-h-[220px] h-full hover:bg-[var(--color-surface)] transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="text-ink-muted transition-colors duration-200 group-hover:text-[var(--color-platinum)]"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-[var(--color-platinum)]">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-ink-muted leading-relaxed transition-colors duration-200 group-hover:text-[var(--color-platinum)]/80">
                    {c.d}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/resources" variant="secondary">
            Browse all research <ArrowUpRight size={12} aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}