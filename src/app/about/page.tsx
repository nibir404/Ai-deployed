import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/primitives/Button";
import Link from "next/link";
import { ArrowUpRight } from "@/components/site/icons";
import { cn } from "@/lib/cn";
import { COMMITMENTS } from "@/lib/copy/commitments";

export const metadata: Metadata = {
  title: "About — AI Deployed",
  description:
    "AI Deployed embeds with your team to architect, build, deploy, and run AI and software systems across cloud, private, and tightly controlled environments.",
};

const PRINCIPLES = [
  {
    t: "Embedded",
    d: "An agent you do not run is a pilot. We run the runtime, monitor the queue, and keep the configuration in step with how your business moves.",
  },
  {
    t: "Governed",
    d: "Every output is checked before it leaves the queue. Every action is logged. The policy stack fails closed.",
  },
  {
    t: "Accountable",
    d: "We own the outcome. If the agent does not perform, we change the configuration, the model, or the policy.",
  },
];

const PRODUCTS = [
  {
    id: "ai-deployed",
    t: "AI Deployed",
    sub: "Embedded AI and software, built and run.",
    body: "Each agent is scoped to one job, runs against your data, and operates under an approval gate you control. Built, configured, and run by our team.",
    href: "/platform",
    hrefLabel: "See the platform",
  },
  {
    id: "compliance",
    t: "Compliance",
    sub: "Governance tooling for AI in production.",
    body: "The same policy stack, audit logs, and fail-closed behavior we use internally. Available for teams that run their own agents.",
    href: "/governance",
    hrefLabel: "Read the governance details",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Embedded. Architect, build, run."
        description="AI Deployed embeds with your team to architect, build, deploy, and run AI and software systems across cloud, private, and tightly controlled environments."
      />

      {/* Why we exist */}
      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Why we exist</Eyebrow>
              <DisplayHeading
                as="h2"
                size="section"
                className="mt-6 leading-[0.96] tracking-[-0.035em]"
              >
                Most AI tools assume you will build.{" "}
                <span className="text-ink-muted">
                  We assume you won&apos;t.
                </span>
              </DisplayHeading>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-body text-ink-muted leading-relaxed">
              <p>
                Most AI tools hand you a builder and call it done. We have
                watched customers stall — not because the model is wrong, but
                because operating AI in production is a job, and the job is
                not done by the buyer.
              </p>
              <p>
                We do that job. We architect, build, run, and govern the
                agent. Your team reviews the queue.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What we believe */}
      <section className="relative border-b hairline py-[100px] md:py-[120px] overflow-hidden">
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow>Principles</Eyebrow>
            <blockquote className="mt-8 font-display text-section leading-[0.98] tracking-[-0.035em] text-ink font-medium">
              &ldquo;AI in business needs to be{" "}
              <span className="text-[var(--color-accent)]">embedded</span> and{" "}
              <span className="text-[var(--color-accent)]">governed</span> —
              not just deployed.&rdquo;
            </blockquote>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
            {PRINCIPLES.map((p) => (
              <div
                key={p.t}
                className="card-surface p-6 md:p-8 min-h-[220px] flex flex-col gap-4"
              >
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {p.t}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our products */}
      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>Our products</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              Two products. One stack.
            </DisplayHeading>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--color-line)]">
            {PRODUCTS.map((p) => (
              <article
                key={p.id}
                className="card-surface p-6 md:p-10 flex flex-col gap-6 min-h-[320px]"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="inline-block size-1.5 bg-[var(--color-accent)]"
                  />
                </div>
                <h3 className="font-display text-h2 font-medium text-ink leading-tight">
                  {p.t}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  {p.sub}
                </p>
                <p className="text-body text-ink-muted leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-auto">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-[var(--color-accent)] transition-colors"
                  >
                    {p.hrefLabel}
                    <ArrowUpRight size={12} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Unified callout */}
          <div className="mt-8 card-surface p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:flex-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                When used together
              </span>
              <p className="mt-2 text-body text-ink leading-relaxed max-w-2xl">
                The platform&apos;s policy stack, audit logs, and approval gate
                work the same way whether you run our agents or your own. One
                governance surface, one audit trail.
              </p>
            </div>
            <Link href="/platform" className="btn-pill shrink-0">
              <span className="btn-pill__icon" aria-hidden>
                <ArrowUpRight size={14} />
              </span>
              <span className="btn-pill__label">See the platform</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* What we commit to */}
      <section className="relative border-b hairline py-[100px] md:py-[120px]">
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>Commitments</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              Three operational guarantees.
            </DisplayHeading>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
            {COMMITMENTS.map((c) => (
              <div
                key={c.t}
                className="card-surface p-6 md:p-8 min-h-[200px] flex flex-col gap-4"
              >
                <span
                  aria-hidden
                  className="inline-block size-1.5 bg-[var(--color-accent)]"
                />
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {c.t}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="relative border-b hairline py-[100px] md:py-[140px] overflow-hidden">
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <DisplayHeading
                as="h2"
                size="section"
                className="leading-[0.96] tracking-[-0.035em]"
              >
                If this is what you&apos;re looking for —
              </DisplayHeading>
              <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
                We&apos;d like to hear about your context. One conversation
                with one of the engineers who would do the work.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn-pill">
                <span className="btn-pill__icon" aria-hidden>
                  <ArrowUpRight size={14} />
                </span>
                <span className="btn-pill__label">Start a conversation</span>
              </Link>
              <ButtonLink href="/platform" variant="secondary">
                See the platform
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}