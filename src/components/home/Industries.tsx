import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ArrowUpRight } from "@/components/site/icons";
import { ASSETS } from "@/lib/assets";

const INDUSTRIES = [
  {
    n: "01",
    t: "Banking & Financial Services",
    b: "Operations, risk, compliance, service.",
    img: ASSETS.industries.finance,
    featured: true,
  },
  {
    n: "02",
    t: "Telecommunications & ISPs",
    b: "Network intelligence, CX, optimization.",
    img: ASSETS.industries.telecom,
  },
  {
    n: "03",
    t: "Government",
    b: "Citizen services, transformation, data.",
    img: ASSETS.industries.government,
  },
  {
    n: "04",
    t: "Healthcare",
    b: "Clinical ops, engagement, analytics.",
    img: ASSETS.industries.healthcare,
  },
  {
    n: "05",
    t: "Education",
    b: "Learning systems, modernization.",
    img: ASSETS.industries.education,
  },
  {
    n: "06",
    t: "Manufacturing",
    b: "Production, forecasting, quality.",
    img: ASSETS.industries.manufacturing,
  },
  {
    n: "07",
    t: "Enterprise & Conglomerates",
    b: "Integration, data, transformation.",
    img: ASSETS.industries.logistics,
  },
];

/**
 * Industries — Dispatch-style featured + 6 small cards.
 *
 * 7/5 split. The featured (Banking) card gets a lime accent border
 * + corner badge (hex-nut JPG) that signals "deepest engagement".
 * Six secondary cards become smaller with numeric prefixes; hover
 * shows an arrow in lime.
 */
export function Industries() {
  const [featured, ...rest] = INDUSTRIES;
  return (
    <section
      id="industries"
      aria-label="Industries we serve"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>Section 06 · Industries</Eyebrow>
          <DisplayHeading as="h2" className="mt-6">
            Built for complex organizations.
          </DisplayHeading>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--color-line)]">
          {/* Featured industry — 7/12 wide, lime border + hex badge */}
          <article className="card-surface lg:col-span-7 relative overflow-hidden group min-h-[340px] md:min-h-[480px] flex flex-col justify-end p-6 md:p-10 border border-[var(--color-accent)]">
            <div className="absolute inset-0 -z-0">
              <Image
                src={featured.img}
                alt={featured.t}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                <span
                  aria-hidden
                  className="inline-block size-1.5 bg-[var(--color-accent)]"
                />
                {featured.n} · Featured
              </span>
              <h3 className="mt-3 font-display text-display font-medium leading-tight text-ink">
                {featured.t}
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed max-w-xl">
                {featured.b}
              </p>
            </div>
          </article>

          {/* 6 secondary industries — 5/12 wide, 2 cols × 3 rows */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-px bg-[var(--color-line)]">
            {rest.map((i) => (
              <article
                key={i.n}
                className="card-surface relative overflow-hidden group min-h-[160px] flex flex-col justify-end p-5 md:p-6"
              >
                <div className="absolute inset-0 -z-0 opacity-60 group-hover:opacity-80 transition-opacity">
                  <Image
                    src={i.img}
                    alt={i.t}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="relative flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      {i.n}
                    </span>
                    <h4 className="mt-1.5 font-display text-sm md:text-base font-medium text-ink leading-tight">
                      {i.t}
                    </h4>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-ink-muted group-hover:text-[var(--color-accent)] transition-colors shrink-0"
                    aria-hidden
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
