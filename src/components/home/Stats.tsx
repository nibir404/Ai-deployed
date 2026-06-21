import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { EditorialRule } from "@/components/site/primitives/EditorialRule";
import { StatBlock } from "@/components/site/primitives/StatBlock";
import { GridLines } from "@/components/site/primitives/GridLines";

const STATS = [
  { value: 47, suffix: "+", label: "Enterprise deployments", caption: "Across banking, telecom, government, healthcare, and manufacturing." },
  { value: 12, label: "Industries served", caption: "Highly regulated, operationally complex, organization-wide programs." },
  { value: 98, suffix: "%", label: "Client retention", caption: "Long-term engagement with measurable operational outcomes." },
  { value: 6, suffix: "–18 mo", label: "Average engagement", caption: "Time from assessment through operationalization to scale." },
];

export function Stats() {
  return (
    <section id="stats" aria-label="Operating metrics" className="relative border-b hairline py-[120px]">
      <Container className="relative">
        <GridLines sideRules baselineGrid />
        <Eyebrow>Section 05 · Operating Metrics</Eyebrow>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                i < STATS.length - 1 ? "lg:border-r hairline" : ""
              }
            >
              <StatBlock
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                caption={s.caption}
                className="lg:px-10"
              />
            </div>
          ))}
        </div>
        <EditorialRule className="mt-2" />
      </Container>
    </section>
  );
}
