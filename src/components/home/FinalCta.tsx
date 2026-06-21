import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";

export function FinalCta() {
  return (
    <section id="final-cta" aria-label="Closing call to action" className="relative border-b hairline py-[120px]">
      <Container className="relative">
        <GridLines sideRules edgeRule baselineGrid />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Start the conversation</Eyebrow>
            <DisplayHeading as="h2" size="section" className="mt-6">
              Let&apos;s operationalize.
            </DisplayHeading>
            <p className="mt-8 text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
              A 30-minute conversation. We help you assess context and define
              the path forward.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/contact" variant="primary">
              Book Consultation <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="ghost">
              See selected work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
