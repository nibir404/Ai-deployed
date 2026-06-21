import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";
import { cn } from "@/lib/cn";

const MODELS = [
  {
    label: "01 · Project",
    title: "Outcome-defined delivery",
    body: "Define a clear scope, deliver a defined outcome. Ideal for targeted initiatives with measurable deliverables.",
    points: ["Defined scope", "Defined timeline", "Defined outcome"],
    featured: false,
  },
  {
    label: "02 · Embedded",
    title: "Engineers inside the organization",
    body: "Engineers work as part of the internal team. Knowledge transfer, ownership, and capability are built in.",
    points: ["Embedded engineers", "Knowledge transfer", "Long-term ownership"],
    featured: true,
  },
  {
    label: "03 · Managed",
    title: "Continuous operation at scale",
    body: "Operate, monitor, and continuously improve deployed systems with structured service delivery and SLAs.",
    points: ["24/7 operation", "Continuous improvement", "Operational SLAs"],
    featured: false,
  },
];

/**
 * EngagementModels — Dispatch-style 3-up with lime middle card.
 *
 * The middle "Embedded" card carries a lime border, lime "Most chosen"
 * badge, and lime accents. The outer two cards remain hairline. This
 * contrasts with the tabbed pill control of capabilities above and
 * the pricing tier toggle below.
 */
export function EngagementModels() {
  return (
    <section
      id="engagement"
      aria-label="Engagement models"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="max-w-4xl">
          <Eyebrow>Section 09 · Engagement Models</Eyebrow>
          <DisplayHeading as="h2" className="mt-6">
            Three Ways To Work With Us.
          </DisplayHeading>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
          {MODELS.map((m) => (
            <article
              key={m.title}
              className={cn(
                "card-surface p-6 md:p-8 min-h-[400px] flex flex-col relative overflow-hidden",
                m.featured && "border border-[var(--color-accent)]",
              )}
            >
              {m.featured && (
                <span className="absolute top-0 right-0 px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-mono text-[10px] uppercase tracking-[0.18em]">
                  Most chosen
                </span>
              )}
              <span
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.16em]",
                  m.featured ? "accent-text" : "text-ink-muted",
                )}
              >
                {m.label}
              </span>
              <h3 className="mt-6 font-display text-h3 font-medium leading-tight text-ink">
                {m.title}
              </h3>
              <p className="mt-6 text-body text-ink-muted leading-relaxed">
                {m.body}
              </p>
              <ul className="mt-auto pt-8 space-y-3">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "inline-block size-1",
                        m.featured
                          ? "bg-[var(--color-accent)]"
                          : "bg-current opacity-70",
                      )}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <ButtonLink href="/how-we-work" variant="secondary">
            See the full process
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Discuss your context →
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
