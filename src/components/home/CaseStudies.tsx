import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";
import { ArrowUpRight } from "@/components/site/icons";
import { ASSETS } from "@/lib/assets";

type Study = {
  sector: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  img: string;
};

const STUDIES: Study[] = [
  {
    sector: "Banking",
    title: "AI-driven operations, tier-1 bank",
    summary:
      "Embedded engineers deployed intelligent operations across service, risk, and compliance.",
    metric: "47%",
    metricLabel: "manual processing reduction",
    img: ASSETS.caseStudies.banking,
  },
  {
    sector: "Government",
    title: "Citizen services modernization",
    summary:
      "Re-architected service delivery with cloud, integration, and AI.",
    metric: "98%",
    metricLabel: "service continuity",
    img: ASSETS.caseStudies.government,
  },
  {
    sector: "Healthcare",
    title: "Clinical workflows, regional system",
    summary:
      "Deployed clinical AI workflows integrated with EHR and billing.",
    metric: "3.4x",
    metricLabel: "throughput per clinician",
    img: ASSETS.caseStudies.healthcare,
  },
];

/**
 * CaseStudies — Dispatch-style full-bleed featured + 3-col secondary.
 *
 * The featured card is a 7/12 tile with the architectural photo,
 * a Venn JPG badge in the corner, and an oversized metric. Two
 * secondary cards stack in a 5/12 column with their own metrics.
 */
export function CaseStudies() {
  const [featured, ...rest] = STUDIES;
  return (
    <section
      id="case-studies"
      aria-label="Selected case studies"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>Section 11 · Selected Work</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Long-term engagements. Lasting outcomes.
            </DisplayHeading>
          </div>
          <ButtonLink href="/case-studies" variant="secondary">
            All case studies <ArrowUpRight size={14} aria-hidden />
          </ButtonLink>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--color-line)]">
          {/* Featured — full-bleed grayscale photo with metric overlay */}
          <article
            data-stack
            className="card-surface lg:col-span-7 relative overflow-hidden group min-h-[420px] md:min-h-[520px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 -z-0">
              <Image
                src={ASSETS.hero.architectural.md}
                alt="Modern enterprise operations — architectural facade"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="relative p-6 md:p-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] accent-text">
                  ● Featured
                </span>
                <span aria-hidden className="text-ink-dim">·</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  {featured.sector}
                </span>
              </div>
              <h3 className="mt-3 font-display text-display font-medium leading-tight text-ink">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed max-w-xl">
                {featured.summary}
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl md:text-6xl text-ink tabular-nums leading-none">
                  {featured.metric}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {featured.metricLabel}
                </span>
              </div>
            </div>
          </article>

          {/* Secondary — 5/12 column, 2 stacked cards */}
          <StackReveal className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-px bg-[var(--color-line)]">
            {rest.map((s, i) => (
              <article
                key={s.title}
                data-stack
                className="card-surface p-6 md:p-7 flex flex-col group relative overflow-hidden min-h-[260px]"
              >
                <div className="absolute inset-0 -z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-[var(--color-card)]/85 to-[var(--color-card)]/60" />
                </div>
                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      0{i + 2} · {s.sector}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-h3 font-medium leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {s.summary}
                  </p>
                  <div className="mt-auto pt-6 flex items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl text-ink tabular-nums">
                        {s.metric}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                        {s.metricLabel}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="text-ink-muted group-hover:text-[var(--color-accent)] transition-colors shrink-0"
                    />
                  </div>
                </div>
              </article>
            ))}
          </StackReveal>
        </div>
      </Container>
    </section>
  );
}
