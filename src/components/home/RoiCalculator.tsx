"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { RangeSlider } from "@/components/site/primitives/RangeSlider";
import { StatBlock } from "@/components/site/primitives/StatBlock";
import { Reveal } from "@/components/site/primitives/Reveal";
import { GridLines } from "@/components/site/primitives/GridLines";

/**
 * RoiCalculator — Forward Deployed Engineering ROI model.
 *
 * Inputs (editable sliders):
 *   - teamSize        — internal engineering team size, 5–200
 *   - deploymentCycle — current average days from kickoff to production, 30–365
 *   - adoptionRate    — current % of organization actively using deployed systems, 10–80
 *
 * Formula (transparent, displayed as hints):
 *   accelerationFactor = 0.62                  — Forward Deployed accelerates delivery by ~62%
 *   newCycle           = deploymentCycle * (1 - accelerationFactor)
 *   daysSavedPerYear   = (deploymentCycle - newCycle) * 12 / newCycle
 *
 *   buildRate          = adoptionRate / 100    — current share of team using systems
 *   targetAdoption     = 0.85                  — Forward Deployed target
 *   additionalBuilders = (targetAdoption - buildRate) * teamSize
 *
 *   annualHours        = additionalBuilders * 1760 * 0.25
 *   capabilityMonths   = Math.round((deploymentCycle - newCycle) / 30)
 *   paybackMonths      = Math.max(2, Math.round(12 / (annualHours / 1000)))
 */
export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(40);
  const [deploymentCycle, setDeploymentCycle] = useState(180);
  const [adoptionRate, setAdoptionRate] = useState(35);

  const results = useMemo(() => {
    const accelerationFactor = 0.62;
    const newCycle = deploymentCycle * (1 - accelerationFactor);
    const cycleReduction = deploymentCycle - newCycle;

    const buildRate = adoptionRate / 100;
    const targetAdoption = 0.85;
    const additionalBuilders = Math.max(
      0,
      (targetAdoption - buildRate) * teamSize,
    );

    const annualHours = Math.round(additionalBuilders * 1760 * 0.25);
    const capabilityMonths = Math.max(1, Math.round(cycleReduction / 30));
    const paybackMonths = Math.max(
      2,
      Math.round(12 / Math.max(annualHours / 1000, 0.5)),
    );

    return {
      cycleReductionDays: Math.round(cycleReduction),
      annualHours,
      capabilityMonths,
      paybackMonths,
    };
  }, [teamSize, deploymentCycle, adoptionRate]);

  return (
    <section
      id="roi"
      aria-label="Forward deployed ROI calculator"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>Section 14 · Forward Deployed ROI</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Engineer Capacity, Reclaimed.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-md">
              Model the operational impact of embedding Forward Deployed
              Engineers inside your organization. Drag the sliders — the
              projections update in real time.
            </p>
            <ul className="mt-8 space-y-2 text-sm text-ink-muted">
              <li className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim shrink-0">
                  Model
                </span>
                <span>
                  Capacity unlocked via embedded engineering + accelerated
                  adoption curve
                </span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim shrink-0">
                  Source
                </span>
                <span>
                  Benchmarks from 47+ multi-year enterprise deployments
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-8 card-surface p-6 sm:p-8 md:p-10 lg:p-12">
            <Reveal>
              <div
                aria-live="polite"
                aria-atomic="false"
                className="space-y-8 md:space-y-10"
              >
                <RangeSlider
                  label="Internal engineering team"
                  value={teamSize}
                  min={5}
                  max={200}
                  step={5}
                  format={(v) => `${v} engineers`}
                  onChange={setTeamSize}
                  hint="Total engineers in scope for operationalization"
                />
                <RangeSlider
                  label="Current deployment cycle"
                  value={deploymentCycle}
                  min={30}
                  max={365}
                  step={5}
                  format={(v) => `${v} days`}
                  onChange={setDeploymentCycle}
                  hint="Average kickoff → production for new AI / systems work"
                />
                <RangeSlider
                  label="Current adoption rate"
                  value={adoptionRate}
                  min={10}
                  max={80}
                  step={5}
                  format={(v) => `${v}%`}
                  onChange={setAdoptionRate}
                  hint="% of organization actively using deployed systems"
                />

                <div className="pt-6 border-t hairline grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                  <StatBlock
                    value={results.cycleReductionDays}
                    suffix=" days"
                    label="Faster to production"
                    caption="Average cycle reduction across new AI / systems work"
                  />
                  <StatBlock
                    value={results.annualHours}
                    suffix=" hrs / yr"
                    label="Engineering capacity reclaimed"
                    caption="From embedded enablement and operational tooling"
                  />
                  <StatBlock
                    value={results.capabilityMonths}
                    suffix=" mo"
                    label="Capabilities accelerated"
                    caption="Months of progress moved into the next two quarters"
                  />
                  <StatBlock
                    value={results.paybackMonths}
                    suffix=" mo"
                    label="Time to measurable outcome"
                    caption="Until operational impact is observed across the org"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}