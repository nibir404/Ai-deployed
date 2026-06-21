import { Container } from "@/components/site/primitives/Container";
import { GridLines } from "@/components/site/primitives/GridLines";

const SECTORS = [
  "Banking",
  "Telecommunications",
  "Government",
  "Healthcare",
  "Education",
  "Manufacturing",
];

export function TrustBar() {
  return (
    <section
      id="trust"
      aria-label="Sectors served"
      className="relative border-y hairline py-12 md:py-14"
    >
      <GridLines sideRules />
      <Container className="relative">
        <div className="flex items-center gap-6 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
            FIG · 02
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Sectors served
          </span>
          <span
            aria-hidden
            className="flex-1 h-px bg-[var(--color-line)]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim shrink-0">
            {SECTORS.length} verticals
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--color-line)]">
          {SECTORS.map((s, i) => (
            <div
              key={s}
              className="card-surface px-3 py-5 md:px-4 md:py-6 flex items-center justify-center text-center group"
            >
              <span className="font-mono text-[11px] md:text-[11px] uppercase tracking-[0.14em] text-ink-muted group-hover:text-ink transition-colors">
                <span className="text-ink-dim mr-2 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
