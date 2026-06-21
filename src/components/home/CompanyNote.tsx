import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";

/**
 * CompanyNote — short paragraph about where we are and how we hire.
 *
 * Single column, max-width text block. No numbers, no decorative
 * imagery. Mirrors DeployCo&apos;s &ldquo;Where we are&rdquo; note.
 */
export function CompanyNote() {
  return (
    <section
      id="company"
      aria-label="Where we are"
      className="relative border-b hairline py-[100px] md:py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Where we are</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              California.{" "}
              <span className="text-ink-muted">Building deliberately.</span>
            </DisplayHeading>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-body text-ink-muted leading-relaxed">
            <p>
              We are a small team based in California. We hire engineers
              slowly, pay well, and do not run a sales pipeline. Every
              customer engagement is delivered by named people — not a pool.
            </p>
            <p>
              If you are reading this and considering us, you will probably
              talk to one of the founders in the first call. We are not the
              right fit for every business. We will tell you when we are
              not.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}