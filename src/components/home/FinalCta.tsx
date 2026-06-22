import Link from "next/link";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { ArrowUpRight } from "@/components/site/icons";

/**
 * FinalCta — closing CTA, minimal editorial.
 *
 * Clean, asset-free layout: eyebrow → oversized heading → body →
 * two CTAs (glossy black primary, hairline secondary). Grid rules
 * keep it visually anchored to the rest of the page.
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-label="Closing call to action"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">

        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Start the conversation</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6"
          >
            Let&apos;s <span className="text-ink">talk</span>.
          </DisplayHeading>
          <p className="mt-8 text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            A short conversation. We will tell you when we are not the
            right fit.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn-pill">
            <span className="btn-pill__icon" aria-hidden>
              <ArrowUpRight size={14} />
            </span>
            <span className="btn-pill__label">Talk to us</span>
          </Link>
          <ButtonLink href="/platform" variant="secondary">
            See the platform
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}