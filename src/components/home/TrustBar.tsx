import { Container } from "@/components/site/primitives/Container";
import { Marquee } from "@/components/site/primitives/Marquee";

const SECTORS = [
  "Banking",
  "Telecommunications",
  "Government",
  "Healthcare",
  "Education",
  "Manufacturing",
];

/**
 * TrustBar — Dispatch-style horizontal marquee of served sectors.
 *
 * Layout: a single full-width row of sector names that scroll
 * slowly left-to-right. The marquee is duplicated internally so the
 * loop is seamless. The FIG caption sits above as a small editorial
 * anchor. The number of verticals is printed at the right edge.
 */
export function TrustBar() {
  return (
    <section
      id="trust"
      aria-label="Sectors served"
      className="relative border-y hairline py-10 md:py-12"
    >
      <Container>
        <div className="flex items-center gap-6 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
            FIG · 02
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Sectors served
          </span>
          <span aria-hidden className="flex-1 h-px bg-[var(--color-line)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
            {SECTORS.length} verticals
          </span>
        </div>
      </Container>

      {/* Marquee runs full-bleed, outside the container gutters. */}
      <Marquee
        items={SECTORS}
        speed={50}
        ariaLabel="Industries served"
        className="py-2"
        itemClassName="text-ink-muted hover:text-[var(--color-accent)]"
      />
    </section>
  );
}
