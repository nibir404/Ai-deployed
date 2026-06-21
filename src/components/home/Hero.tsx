"use client";

import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";
import { AccentGlow } from "@/components/site/primitives/AccentGlow";
import { ArrowUpRight } from "@/components/site/icons";

/**
 * Hero — DeployCo-style centered headline.
 *
 * Layout:
 *   - Centered eyebrow above an extralight display headline
 *   - Single muted-tone supporting paragraph
 *   - Two CTAs side-by-side: primary "Start a conversation" and
 *     secondary "See how it works →"
 *   - Soft lime radial glow behind the heading (top-left + top-right)
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative pt-[160px] md:pt-[200px] pb-[100px] md:pb-[140px] overflow-hidden"
    >
      <GridLines sideRules edgeRule baselineGrid />
      <AccentGlow position="corner-tl" intensity={50} />
      <AccentGlow position="corner-tr" intensity={50} />

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>AI Deployed · Custom agents</Eyebrow>
          <DisplayHeading
            as="h1"
            size="hero"
            className="mt-8 font-medium leading-[0.95] tracking-[-0.035em]"
          >
            Custom AI agents.{" "}
            <span className="text-ink-muted">Built and run for you.</span>
          </DisplayHeading>
          <p className="mt-10 text-body text-ink-muted leading-relaxed max-w-2xl mx-auto">
            AI in your business, built by us, run safely for you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-pill">
              <span className="btn-pill__icon" aria-hidden>
                <ArrowUpRight size={14} />
              </span>
              Start a conversation
            </Link>
            <ButtonLink href="/how-we-work" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
