import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { ArrowUpRight } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Case studies — AI Deployed",
  description:
    "Long-term engagements, lasting outcomes. Selected work across banking, government, healthcare, and beyond.",
};

const STUDIES = [
  {
    sector: "Banking",
    title: "AI-driven operations, tier-1 bank",
    summary:
      "Embedded engineers deployed intelligent operations across service, risk, and compliance.",
    metric: "47%",
    metricLabel: "manual processing reduction",
    duration: "14 months",
    img: "/img/casestudies/cs-banking-1920.webp",
    featured: true,
  },
  {
    sector: "Government",
    title: "Citizen services modernization",
    summary:
      "Re-architected service delivery with cloud, integration, and AI.",
    metric: "98%",
    metricLabel: "service continuity",
    duration: "11 months",
    img: "/img/casestudies/cs-government-1920.webp",
  },
  {
    sector: "Healthcare",
    title: "Clinical workflows, regional system",
    summary:
      "Deployed clinical AI workflows integrated with EHR and billing.",
    metric: "3.4x",
    metricLabel: "throughput per clinician",
    duration: "9 months",
    img: "/img/casestudies/cs-healthcare-1920.webp",
  },
  {
    sector: "Telecom",
    title: "Network intelligence, national operator",
    summary:
      "Operationalized AI across network, service, and customer workflows.",
    metric: "12mo",
    metricLabel: "assessment to scale",
    duration: "12 months",
    img: "/img/industries/ind-telecom-1920.webp",
  },
  {
    sector: "Manufacturing",
    title: "Production optimization, industrial group",
    summary:
      "Forecasting, quality control, and process automation across plants.",
    metric: "28%",
    metricLabel: "yield improvement",
    duration: "8 months",
    img: "/img/industries/ind-manufacturing-1920.webp",
  },
  {
    sector: "Education",
    title: "Learning systems, public university",
    summary:
      "Modernized learning platforms and academic operations.",
    metric: "2.1x",
    metricLabel: "student service throughput",
    duration: "7 months",
    img: "/img/industries/ind-education-1920.webp",
  },
];

export default function CaseStudiesPage() {
  const featured = STUDIES[0]!;
  const rest = STUDIES.slice(1);

  return (
    <main id="main">
      <PageHero
        eyebrow="Selected work · Section 11"
        title="Long-term engagements. Lasting outcomes."
        description="Each engagement is measured against operational outcome — not deliverables shipped. Average duration: 11 months."
        image={{
          src: "/img/hero/hero-architectural-1920.webp",
          alt: "Architectural facade",
        }}
      />

      {/* Featured */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <article className="relative overflow-hidden group min-h-[420px] md:min-h-[560px] flex flex-col justify-end card-surface">
            <div className="absolute inset-0 -z-0">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                priority
                sizes="100vw"
                className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent" />
            </div>
            <div className="relative p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  Featured
                </span>
                <span aria-hidden className="text-ink-dim">·</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  {featured.sector}
                </span>
                <span aria-hidden className="text-ink-dim">·</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  {featured.duration}
                </span>
              </div>
              <h2 className="mt-6 font-display text-display md:text-section font-medium leading-tight text-ink max-w-3xl">
                {featured.title}
              </h2>
              <p className="mt-6 text-sm md:text-base text-ink-muted leading-relaxed max-w-xl">
                {featured.summary}
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-5xl md:text-6xl text-ink tabular-nums">
                  {featured.metric}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {featured.metricLabel}
                </span>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* All studies */}
      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <Eyebrow>All engagements</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              {STUDIES.length} selected · 47+ total
            </span>
          </div>

          <StackReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
            {rest.map((s, i) => (
              <article
                key={s.title}
                data-stack
                className="card-surface relative overflow-hidden group min-h-[380px] flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-[var(--color-card)]/30 to-transparent" />
                </div>
                <div className="relative p-6 md:p-7 flex-1 flex flex-col gap-4 -mt-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      {String(i + 2).padStart(2, "0")} · {s.sector}
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="text-ink-muted group-hover:text-ink transition-colors shrink-0"
                    />
                  </div>
                  <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {s.summary}
                  </p>
                  <div className="mt-auto pt-4 border-t hairline flex items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-ink tabular-nums">
                        {s.metric}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                        {s.metricLabel}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                      {s.duration}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </StackReveal>
        </Container>
      </section>
    </main>
  );
}