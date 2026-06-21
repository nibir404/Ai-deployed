"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { RangeSlider } from "@/components/site/primitives/RangeSlider";
import { Reveal } from "@/components/site/primitives/Reveal";
import { AccentGlow } from "@/components/site/primitives/AccentGlow";
import { GridLines } from "@/components/site/primitives/GridLines";

/**
 * RoiCalculator — Dispatch-style interactive ROI.
 *
 * 4/12 split. The right card is a tall panel with a soft lime radial
 * glow behind the slider area, and four output tiles in a 2×2 grid
 * with oversized accent-tinted numbers. Sliders use lime fill via
 * the updated RangeSlider primitive.
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

          <div className="lg:col-span-8 card-surface p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
            {/* Soft lime radial glow behind the slider area. */}
            <AccentGlow position="center" intensity={45} />

            <Reveal>
              <div
                aria-live="polite"
                aria-atomic="false"
                className="relative space-y-8 md:space-y-10"
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

                <div className="pt-8 border-t hairline grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                  <OutputTile
                    value={results.cycleReductionDays}
                    suffix=" days"
                    label="Faster to production"
                    caption="Average cycle reduction across new AI / systems work"
                  />
                  <OutputTile
                    value={results.annualHours}
                    suffix=" hrs / yr"
                    label="Engineering capacity reclaimed"
                    caption="From embedded enablement and operational tooling"
                  />
                  <OutputTile
                    value={results.capabilityMonths}
                    suffix=" mo"
                    label="Capabilities accelerated"
                    caption="Months of progress moved into the next two quarters"
                  />
                  <OutputTile
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

function OutputTile({
  value,
  suffix,
  label,
  caption,
}: {
  value: number;
  suffix: string;
  label: string;
  caption: string;
}) {
  return (
    <div className="py-6 px-1 lg:px-4">
      <div className="flex items-baseline gap-2 leading-none">
        <span className="font-display text-[clamp(2.5rem,1.5rem+3vw,3.75rem)] font-medium tracking-[-0.04em] text-ink tabular-nums">
          {value.toLocaleString("en-US")}
        </span>
        <span className="font-display text-lg md:text-xl font-medium text-ink-muted leading-none">
          {suffix}
        </span>
      </div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
        {label}
      </div>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">{caption}</p>
    </div>
  );
}
