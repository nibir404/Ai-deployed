import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { ArrowUpRight } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Resources — AI Deployed",
  description:
    "Notes, frameworks, and field reports on deploying AI and operating modern enterprises.",
};

const CATEGORIES = [
  {
    t: "AI Strategy",
    d: "Frameworks for sequencing AI initiatives.",
    count: 12,
  },
  {
    t: "Operationalization",
    d: "Pilots to production — field notes.",
    count: 18,
  },
  {
    t: "Systems Integration",
    d: "Enterprise-scale architecture patterns.",
    count: 9,
  },
  {
    t: "Generative AI",
    d: "Governance, retrieval, production patterns.",
    count: 14,
  },
  {
    t: "AI Governance",
    d: "Risk, compliance, observability in production.",
    count: 7,
  },
  {
    t: "Enterprise Architecture",
    d: "Modern patterns for legacy environments.",
    count: 11,
  },
  {
    t: "Cloud Infrastructure",
    d: "Hyperscaler, hybrid, multi-cloud.",
    count: 8,
  },
  {
    t: "Data Platforms",
    d: "Pipelines and the systems that feed AI.",
    count: 10,
  },
  {
    t: "Engineering Practice",
    d: "How we build, deploy, and operate.",
    count: 16,
  },
  {
    t: "Transformation",
    d: "Operating models, the human side.",
    count: 6,
  },
];

const FEATURED = [
  {
    cat: "Operationalization",
    title: "From pilot to production in 90 days",
    excerpt:
      "A working pattern for moving AI initiatives past the prototype stage.",
    read: "8 min",
  },
  {
    cat: "Generative AI",
    title: "Retrieval that scales: lessons from a billion-document system",
    excerpt:
      "Architecture, evaluation, and the failure modes we learned to expect.",
    read: "14 min",
  },
  {
    cat: "AI Governance",
    title: "Observability for production AI",
    excerpt:
      "What to measure, how to alert, and what to do when models drift.",
    read: "11 min",
  },
];

export default function ResourcesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Research · Section 12"
        title="We write what we build."
        description="Field notes from our engineers and architects. Frameworks, architecture patterns, and operational reality."
      />

      {/* Featured */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <Eyebrow>Featured</Eyebrow>
          <StackReveal>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
              {FEATURED.map((f, i) => (
                <article
                  key={f.title}
                  data-stack
                  className="card-surface p-6 md:p-8 flex flex-col gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} · {f.cat}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                      {f.read}
                    </span>
                  </div>
                  <h3 className="font-display text-h3 font-medium text-ink leading-snug group-hover:text-ink-muted transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {f.excerpt}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href="/resources"
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:text-ink-muted transition-colors"
                    >
                      Read <ArrowUpRight size={12} aria-hidden />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </StackReveal>
        </Container>
      </section>

      {/* Categories index */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow>Categories</Eyebrow>
              <h2 className="mt-6 font-display text-section font-medium text-ink leading-[0.96] tracking-[-0.035em]">
                Browse by topic.
              </h2>
              <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-md">
                {CATEGORIES.length} categories. {CATEGORIES.reduce((s, c) => s + c.count, 0)}{" "}
                pieces published.
              </p>
            </div>

            <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-line)]">
              {CATEGORIES.map((c, i) => (
                <li key={c.t}>
                  <Link
                    href="/resources"
                    className="card-surface p-5 md:p-6 flex items-start justify-between gap-4 group hover:bg-[var(--color-surface)] transition-colors h-full"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                        {String(i + 1).padStart(2, "0")} · {c.count} pieces
                      </span>
                      <h3 className="mt-2 font-display text-lg md:text-xl font-medium text-ink leading-snug">
                        {c.t}
                      </h3>
                      <p className="mt-2 text-xs md:text-sm text-ink-muted leading-relaxed">
                        {c.d}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="text-ink-muted group-hover:text-ink transition-colors shrink-0 mt-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}