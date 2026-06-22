import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { AccentGlow } from "@/components/site/primitives/AccentGlow";
import { InteractiveDotGrid } from "@/components/site/primitives/InteractiveDotGrid";
import { ArrowUpRight } from "@/components/site/icons";

/**
 * Hero — centered headline, fixed 850-900px tall section.
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
      className="relative min-h-[850px] md:min-h-[900px] flex flex-col overflow-hidden"
    >
      <AccentGlow position="corner-tl" intensity={50} />
      <AccentGlow position="corner-tr" intensity={50} />
      <InteractiveDotGrid
        cellSize={14}
        radius={14}
        showLogo
        restAlpha={0.85}
        logoScale={1}
        logoStroke={1.25}
        trackGlobally
      />

      <Container className="relative z-10 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-[120px] md:py-[140px]">
          <Eyebrow>AI Deployed · Custom agents</Eyebrow>
          <DisplayHeading
            as="h1"
            size="hero"
            className="mt-8 font-medium leading-[0.95] tracking-[-0.035em]"
          >
            Custom AI agents.{" "}
            <span className="text-ink-muted">Built and run for you.</span>
          </DisplayHeading>
          <p className="mt-10 text-body text-ink-muted leading-relaxed max-w-2xl">
            AI in your business, built by us, run safely for you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-pill">
              <span className="btn-pill__icon" aria-hidden>
                <ArrowUpRight size={14} />
              </span>
              <span className="btn-pill__label">Start a conversation</span>
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