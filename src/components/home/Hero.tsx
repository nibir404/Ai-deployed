"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";
import { AccentGlow } from "@/components/site/primitives/AccentGlow";
import { CornerCrosshairs } from "@/components/site/primitives/CornerCrosshairs";
import { InteractiveDotGrid } from "@/components/site/primitives/InteractiveDotGrid";
import { ArrowUpRight } from "@/components/site/icons";

const TRUST = [
  { v: "47+", l: "deployments" },
  { v: "12", l: "industries" },
  { v: "98%", l: "client retention" },
  { v: "Embedded", l: "engineering" },
];

/**
 * Hero — Dispatch-style editorial top with radial lime glow.
 *
 * Layout:
 *   - Eyebrow → oversized display heading (huge, line-broken) → body
 *   - Two CTAs: lime accent primary, hairline secondary
 *   - 4-up trust strip with hairline borders
 *   - Full-width photo band beneath, desaturated + noise overlay
 *
 * Motion:
 *   - Pointer-driven CSS parallax on headline and trust strip
 *   - Soft lime radial glow behind the heading (CSS gradient)
 *   - Headline scaling on hover of the photo band
 */
export function Hero() {
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDListElement | null>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const tx = Math.max(-12, Math.min(12, nx * 24));
    const ty = Math.max(-8, Math.min(8, ny * 16));
    if (headlineRef.current) {
      headlineRef.current.style.setProperty("--px", `${tx}px`);
      headlineRef.current.style.setProperty("--py", `${ty}px`);
    }
    if (trustRef.current) {
      trustRef.current.style.setProperty("--px", `${tx * 1.4}px`);
      trustRef.current.style.setProperty("--py", `${ty * 1.4}px`);
    }
  };

  const onPointerLeave = () => {
    if (headlineRef.current) {
      headlineRef.current.style.setProperty("--px", "0px");
      headlineRef.current.style.setProperty("--py", "0px");
    }
    if (trustRef.current) {
      trustRef.current.style.setProperty("--px", "0px");
      trustRef.current.style.setProperty("--py", "0px");
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative pt-[120px] pb-0 overflow-hidden"
    >
      <GridLines sideRules edgeRule baselineGrid />
      {/* Dispatch-style radial lime glow behind the headline. Sits
          between the grid lines and the editorial content layer. */}
      <AccentGlow position="top" intensity={70} />

      <Container className="relative">
        <div className="max-w-4xl">
          <Eyebrow>Enterprise AI Deployment · Operationalization</Eyebrow>
          <div
            ref={headlineRef}
            className="mt-8 will-change-transform"
            style={{
              transform:
                "translate3d(var(--px, 0px), var(--py, 0px), 0)",
              transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <DisplayHeading as="h1" size="hero" className="leading-[0.95]">
              Technology is easy.
              <br />
              <span className="text-ink-muted">
                Operational adoption is{" "}
                <span className="accent-text">hard</span>.
              </span>
            </DisplayHeading>
          </div>
          <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-2xl">
            We deploy, integrate, and operate AI systems inside enterprise
            environments — through embedded engineering.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="btn-pill"
            >
              <span className="btn-pill__icon" aria-hidden>
                <ArrowUpRight size={14} />
              </span>
              Book Consultation
            </Link>
            <ButtonLink href="/capabilities" variant="secondary">
              Explore Capabilities
            </ButtonLink>
          </div>

          <dl
            ref={trustRef}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-line)] will-change-transform"
            style={{
              transform:
                "translate3d(var(--px, 0px), var(--py, 0px), 0)",
              transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {TRUST.map((t, i) => (
              <div
                key={t.l}
                className="card-surface px-4 py-5 flex flex-col gap-1 relative"
              >
                {i === 0 && (
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 w-3 h-px accent-line"
                  />
                )}
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {t.l}
                </dt>
                <dd className="font-display text-h3 font-medium text-ink tabular-nums">
                  {t.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* Layer 2 — Interactive ASCII dot field (below the editorial block).
          Replaces the prior photo band. Dots rest quietly in the page's
          hairline color; near the cursor they animate through ASCII
          glyphs (· → ● → █) and shift to ink. Theme-aware — readable
          in both dark and light modes. */}
      <div className="relative mt-16 md:mt-20">
        <div className="relative w-full aspect-[16/8] md:aspect-[16/6] overflow-hidden border-y hairline bg-[var(--color-surface)]">
          <CornerCrosshairs size={18} className="z-20" />
          <InteractiveDotGrid cellSize={14} radius={16} />

          <div className="absolute bottom-4 left-0 right-0 z-20">
            <Container className="relative">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                <span>FIG · 01 · Interactive field</span>
                <span className="accent-text">● live</span>
                <span>04:21 UTC</span>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
