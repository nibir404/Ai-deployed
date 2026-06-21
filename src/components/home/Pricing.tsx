"use client";

import { useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { Reveal } from "@/components/site/primitives/Reveal";
import { GridLines } from "@/components/site/primitives/GridLines";
import {
  BillingToggle,
  type BillingPeriod,
} from "@/components/site/primitives/BillingToggle";
import { Check, ArrowUpRight } from "@/components/site/icons";
import { cn } from "@/lib/cn";

type Tier = {
  label: string;
  title: string;
  body: string;
  monthly: number;
  annual: number; // monthly equivalent when billed annually
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
};

const TIERS: Tier[] = [
  {
    label: "01 · Foundation",
    title: "Foundation",
    body: "Targeted assessment plus one operational capability. Ideal for organizations starting their AI deployment journey.",
    monthly: 4_800,
    annual: 4_000,
    features: [
      "Operational assessment",
      "One capability delivered",
      "30 / 60 / 90 day milestones",
      "Defined scope and outcome",
    ],
    cta: { label: "Start with Foundation", href: "/contact" },
  },
  {
    label: "02 · Embedded",
    title: "Embedded",
    body: "Forward-deployed engineers inside your organization. Long-term ownership, knowledge transfer, and capability building.",
    monthly: 12_000,
    annual: 10_000,
    features: [
      "Embedded engineering team",
      "Knowledge transfer built in",
      "Multi-capability delivery",
      "Long-term ownership model",
    ],
    featured: true,
    cta: { label: "Discuss Embedded", href: "/contact" },
  },
  {
    label: "03 · Scaled",
    title: "Scaled",
    body: "Full managed operations for production systems. Continuous improvement, operational SLAs, and 24/7 coverage.",
    monthly: 24_000,
    annual: 20_000,
    features: [
      "24/7 managed operations",
      "Continuous improvement cycles",
      "Operational SLAs",
      "Multi-system integration",
    ],
    cta: { label: "Talk to Operations", href: "/contact" },
  },
];

function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}

export function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Section 15 · Investment Tiers</Eyebrow>
            <DisplayHeading as="h2" className="mt-6">
              Three ways to invest.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
              Outcome-defined, time-bound. Save 17% with annual billing.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </div>

        <Reveal>
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]">
            {TIERS.map((tier) => {
              const price = billing === "monthly" ? tier.monthly : tier.annual;
              return (
                <article
                  key={tier.title}
                  className={cn(
                    "card-surface p-6 md:p-8 flex flex-col",
                    tier.featured && "lg:py-10 border-t-2 border-[var(--color-ink)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {tier.label}
                    </span>
                    {tier.featured && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink font-semibold">
                        Most chosen
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 font-display text-h3 font-medium text-ink">
                    {tier.title}
                  </h3>
                  <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                    {tier.body}
                  </p>

                  <div className="mt-8 pb-8 border-b hairline">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-ink-muted">
                        $
                      </span>
                      <span className="font-display text-display font-medium text-ink tabular-nums">
                        {formatPrice(price)}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                        / mo
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                      {billing === "annual"
                        ? "Billed annually"
                        : "Billed monthly"}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-ink"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-ink"
                          aria-hidden
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href={tier.cta.href}
                      variant={tier.featured ? "primary" : "secondary"}
                      className="w-full justify-center"
                    >
                      {tier.cta.label}
                      <ArrowUpRight size={14} aria-hidden />
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim text-center">
          Custom programs above $30k / month.
        </p>
      </Container>
    </section>
  );
}