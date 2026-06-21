import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
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

export function Research() {
  return (
    <section
      id="research"
      aria-label="Research and writing"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>Section 12 · Research</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              We write what we build.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-md">
              Field notes from our engineers and architects.
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
                      Index {String(i + 1).padStart(2, "0")}
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
  );
}