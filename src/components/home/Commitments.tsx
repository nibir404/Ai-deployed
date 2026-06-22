import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { COMMITMENTS } from "@/lib/copy/commitments";

/**
 * Commitments — three operational guarantees.
 *
 * Each block carries a short title and one-line description. No
 * numbers, no icons, no decorative imagery. Pure typographic weight
 * carries the section.
 */
export function Commitments() {
  return (
    <section
      id="commitments"
      aria-label="Operational commitments"
      className="relative border-b hairline py-[100px] md:py-[120px]"
    >
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow>Commitments</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            The operational guarantees{" "}
            <span className="text-ink-muted">behind every engagement.</span>
          </DisplayHeading>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
          {COMMITMENTS.map((c) => (
            <article
              key={c.t}
              className="card-surface p-6 md:p-8 min-h-[220px] flex flex-col gap-5"
            >
              <span
                aria-hidden
                className="inline-block size-1.5 bg-[var(--color-accent)]"
              />
              <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                {c.t}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}