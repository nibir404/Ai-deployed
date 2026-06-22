import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { COMPANY_NOTE_SHORT } from "@/lib/copy/companyNote";

/**
 * CompanyNote — short paragraph about where we are and how we hire.
 *
 * Single column, max-width text block. No numbers, no decorative
 * imagery. The /about page renders the long variant of the same
 * note via the shared copy module.
 */
export function CompanyNote() {
  return (
    <section
      id="company"
      aria-label="Where we are"
      className="relative border-b hairline py-[100px] md:py-[120px]"
    >
      <Container className="relative">
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
            {COMPANY_NOTE_SHORT.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}