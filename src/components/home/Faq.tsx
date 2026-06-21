import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { Accordion } from "@/components/site/primitives/Accordion";

const QUESTIONS = [
  {
    q: "What does AI Deployed actually do?",
    a: "We help organizations successfully deploy, integrate, operationalize, manage, and scale artificial intelligence, enterprise systems, cloud infrastructure, and modern technology platforms. Our work spans strategy through long-term managed services — delivered by embedded engineers.",
  },
  {
    q: "How is AI Deployed different from a consulting firm?",
    a: "We don't just advise — we engineer. Our Forward-Deployed Engineers, AI Engineers, and Solution Architects work directly inside client organizations to build, integrate, and operate the systems we design. Outcomes are owned, not recommended.",
  },
  {
    q: "What kinds of organizations do you work with?",
    a: "We work with highly regulated, operationally complex organizations: banks, telecoms, governments, healthcare systems, universities, manufacturers, and large enterprises. Our teams are built to operate in environments where failure is not an option.",
  },
  {
    q: "What is a Forward-Deployed Engineer?",
    a: "A Forward-Deployed Engineer is a senior engineer embedded directly with a client organization. They understand both technology and operations, and they translate between the two — designing, deploying, and operating systems in the real environment.",
  },
  {
    q: "Do you only work on AI?",
    a: "No. AI is one of many capabilities. We work across AI, engineering, integration, operations, and modernization — wherever technology meets business reality. AI is most often a layer on top of well-operating systems.",
  },
  {
    q: "How long does a typical engagement last?",
    a: "Engagements range from 3-month targeted projects to multi-year embedded and managed relationships. The average engagement runs 6–18 months from assessment through operationalization to scale.",
  },
  {
    q: "Do you work with our existing vendors?",
    a: "Yes. We are vendor-neutral and routinely integrate with hyperscalers, SaaS platforms, and existing technology investments. Our role is to make the existing stack work — not to replace it.",
  },
  {
    q: "How do we start?",
    a: "Begin with a discovery conversation. We'll assess your context, identify the highest-value opportunities, and recommend the right engagement model — project, embedded, or managed.",
  },
];

/**
 * Faq — Dispatch-style 4/8 split with a lime-bordered accordion.
 *
 * Left column (4/12): heading + body. Right column (8/12): the
 * Accordion primitive, whose open rows now carry a 4px lime left
 * border and lime `+` chevron.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="border-b hairline py-[120px]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>Section 14 · FAQ</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Questions We Hear Most.
            </DisplayHeading>
            <p className="mt-8 text-ink-muted text-base leading-relaxed max-w-md">
              If your question is not here, reach out — we are happy to
              discuss your specific context.
            </p>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              {QUESTIONS.length} questions · 0:00 read
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={QUESTIONS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
