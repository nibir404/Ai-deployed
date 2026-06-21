"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";
import { CornerCrosshairs } from "@/components/site/primitives/CornerCrosshairs";
import { ArrowUpRight } from "@/components/site/icons";
import { ASSETS } from "@/lib/assets";

const TRUST = [
  { v: "47+", l: "deployments" },
  { v: "12", l: "industries" },
  { v: "98%", l: "client retention" },
  { v: "Embedded", l: "engineering" },
];

/**
 * Hero — editorial top (eyebrow + heading + body + CTA + trust strip)
 * with a full-width control-room photo band beneath. Pointer-driven
 * CSS parallax on the headline and trust strip (no RAF, no WebGL).
 */
export function Hero() {
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDListElement | null>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 → 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const tx = Math.max(-12, Math.min(12, nx * 24)); // ±12px clamp
    const ty = Math.max(-8, Math.min(8, ny * 16)); // ±8px clamp
    if (headlineRef.current) {
      headlineRef.current.style.setProperty("--px", `${tx}px`);
      headlineRef.current.style.setProperty("--py", `${ty}px`);
    }
    if (trustRef.current) {
      // Slightly stronger drift on the trust strip for depth.
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

      {/* Layer 1 — Editorial content (heading at top) */}
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
                Operational adoption is hard.
              </span>
            </DisplayHeading>
          </div>
          <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-2xl">
            We deploy, integrate, and operate AI systems inside enterprise
            environments — through embedded engineering.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Book Consultation <ArrowUpRight size={14} aria-hidden />
            </ButtonLink>
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
            {TRUST.map((t) => (
              <div
                key={t.l}
                className="card-surface px-4 py-5 flex flex-col gap-1"
              >
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

      {/* Layer 2 — Full-width photo band (below the editorial block) */}
      <div className="relative mt-16 md:mt-20">
        <div className="relative w-full aspect-[16/8] md:aspect-[16/6] overflow-hidden">
          <CornerCrosshairs size={18} className="z-20" />
          <Image
            src={ASSETS.hero.capabilityMap}
            alt="AI architecture diagram — central node connected to eight capability modules (compute, data, identity, security, integrations, infrastructure, governance, and operations)"
            fill
            priority
            sizes="100vw"
            className="object-contain scale-[1.02] hover:scale-100 transition-transform duration-[1200ms] ease-out"
          />
          {/* Moderate opacity overlay — keeps the illustration visible
              but subdued so the editorial content above remains the
              focal point. */}
          <div className="absolute inset-0 bg-[var(--color-bg)]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />

          {/* Film-grain noise overlay — rendered from an inline SVG
              feTurbulence filter (see `.hero-noise` in globals.css).
              pointer-events-none so it never blocks interactions. */}
          <div className="hero-noise absolute inset-0 z-10" aria-hidden />

          {/* Caption strip — FIG · 01 sits on the photo edge */}
          <div className="absolute bottom-4 left-0 right-0 z-20">
            <Container className="relative">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                <span>FIG · 01 · AI capability map</span>
                <span>04:21 UTC</span>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
