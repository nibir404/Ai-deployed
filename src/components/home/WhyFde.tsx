import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { EditorialRule } from "@/components/site/primitives/EditorialRule";
import { FDE_REASONS, FDE_RESPONSIBILITIES } from "@/lib/copy/whyFde";

/**
 * WhyFde — defines the Forward Deployed Engineer role and explains
 * why the role exists for AI deployment in the enterprise.
 *
 * Layout:
 *   - Top: eyebrow + oversized heading + supporting paragraph
 *     (definition of FDE, in the customer's voice)
 *   - Middle: three-up "Why the role exists" hairline-grid cards
 *     (last mile / embedded / accountable in production)
 *   - Bottom: two-column "What an FDE actually does" block —
 *     numbered responsibility list on the left, a quiet callout
 *     on the right set as oversized display type.
 *
 * No CTAs in this section. No chromatic accent. Pure typographic
 * weight and hairline rules.
 */
export function WhyFde() {
  return (
    <section
      id="why-fde"
      aria-label="Why Forward Deployed Engineers"
      className="relative border-b hairline py-[100px] md:py-[120px]"
    >
      <Container className="relative">
        {/* Top — definition */}
        <div className="max-w-3xl">
          <Eyebrow>Embedded engineers</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            The role that closes the gap.{" "}
            <span className="text-ink-muted">
              Between the demo and the production system.
            </span>
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            A Forward Deployed Engineer is a senior engineer embedded with
            your team — owning the deployment, translating between the AI
            system and the operations it serves.
          </p>
        </div>

        {/* Middle — three-up reasons */}
        <StackReveal className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
          {FDE_REASONS.map((r) => (
            <article
              key={r.t}
              data-stack
              className="card-surface p-6 md:p-8 min-h-[220px] flex flex-col gap-5"
            >
              <span
                aria-hidden
                className="inline-block size-1.5 bg-[var(--color-accent)]"
              />
              <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                {r.t}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{r.d}</p>
            </article>
          ))}
        </StackReveal>

        {/* Bottom — two-column "what an FDE does" block */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              What they do
            </div>
            <h3 className="mt-4 font-display text-h2 font-medium text-ink leading-tight">
              In your environment, against your systems.
            </h3>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-8 text-body text-ink-muted leading-relaxed">
            <ol className="space-y-6">
              {FDE_RESPONSIBILITIES.map((r) => (
                <li
                  key={r.n}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-4 md:gap-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim pt-1">
                    {r.n}
                  </span>
                  <span className="text-sm md:text-base text-ink-muted leading-relaxed">
                    {r.d}
                  </span>
                </li>
              ))}
            </ol>

            <EditorialRule />

            <p className="font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-ink-muted">
              Embedded. Accountable. On-call.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}