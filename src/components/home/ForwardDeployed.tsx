import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { ASSETS } from "@/lib/assets";

const ROLES = [
  "Forward-Deployed Engineers",
  "AI Engineers",
  "Platform Engineers",
  "Solution Architects",
  "Systems Engineers",
  "Data Engineers",
  "Cloud Engineers",
  "DevOps Engineers",
  "AI Specialists",
  "Transformation Consultants",
];

const DO = [
  "Understand workflows",
  "Assess existing systems",
  "Identify opportunities",
  "Deploy solutions",
  "Train teams",
  "Transfer knowledge",
  "Measure outcomes",
  "Continuously optimize",
];

export function ForwardDeployed() {
  return (
    <section
      id="forward-deployed"
      aria-label="Forward deployed engineers"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Section 04 · Forward Deployed</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Engineers, embedded.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
              Forward-Deployed Engineers sit with your teams — translating
              ambition into outcomes that last.
            </p>
            <div className="mt-8 relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[var(--color-surface)]">
              <Image
                src={ASSETS.hero.controlRoom.md}
                alt="Engineers in an operations control room"
                width={1024}
                height={1365}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-20">
            <div className="card-surface border hairline p-6 md:p-8">
              <Eyebrow>Embedded Roles</Eyebrow>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                {ROLES.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-ink"
                  >
                    <span
                      aria-hidden
                      className="inline-block size-1 bg-current opacity-60"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Eyebrow>What They Do On Site</Eyebrow>
              <ol className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-line)]">
                {DO.map((d, i) => (
                  <li
                    key={d}
                    className="card-surface p-5 md:p-6 min-h-[140px] flex flex-col"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-auto pt-6 font-display text-base md:text-lg text-ink leading-snug">
                      {d}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}