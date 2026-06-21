import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Research — AI Deployed",
  description:
    "Analysis on AI agents, deployment, and governance. Field notes from our engineers and operators.",
};

const ARTICLES = [
  {
    slug: "72-hours",
    cat: "Industry analysis",
    title: "72 hours",
    dek: "What a working AI agent looks like in the first three days of a real engagement — and what the rest of the year is for.",
  },
  {
    slug: "replacement-trap",
    cat: "Industry analysis",
    title: "The replacement trap",
    dek: "Why the framing &ldquo;AI will replace X&rdquo; produces the wrong design decisions for agents in production.",
  },
  {
    slug: "pilots-never-reach-production",
    cat: "Industry analysis",
    title: "Why most AI pilots never reach production",
    dek: "A field read on the four failure modes we see across customer pilots — and the structural fix that closes them.",
  },
  {
    slug: "openai-action-layer",
    cat: "Industry analysis",
    title: "OpenAI and the action layer",
    dek: "Model providers are moving down the stack. What that means for the operators who run agents against real systems.",
  },
];

export default function ResearchPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="AI Deployed Research"
        title="Analysis on AI agents, deployment, and governance."
        description="Field notes from our engineers and operators — what we are seeing, what we are building against, and where the framing is wrong."
      />

      {/* Article list */}
      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow>Articles</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              Recent writing.
            </DisplayHeading>
          </div>

          <ul className="grid gap-px bg-[var(--color-line)]">
            {ARTICLES.map((a) => (
              <li key={a.slug} className="card-surface">
                <Link
                  href={`/research/${a.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-6 md:gap-10 p-6 md:p-8 hover:bg-[var(--color-surface)] transition-colors"
                >
                  {/* Meta column */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                      {a.cat}
                    </span>
                  </div>

                  {/* Content column */}
                  <div className="min-w-0">
                    <h3 className="font-display text-h2 md:text-h1 font-medium text-ink leading-tight">
                      {a.title}
                    </h3>
                    <p
                      className="mt-3 text-body text-ink-muted leading-relaxed max-w-2xl"
                      dangerouslySetInnerHTML={{ __html: a.dek }}
                    />
                  </div>

                  {/* CTA column */}
                  <div className="md:self-center">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      Read
                      <ArrowUpRight size={12} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
