import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { PageHero } from "@/components/site/PageHero";
import { Tabs, type Tab } from "@/components/site/primitives/Tabs";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import {
  Sparkles,
  Layers,
  Workflow,
  Settings,
  Server,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Capabilities — AI Deployed",
  description:
    "Twenty-three capabilities across AI, engineering, integration, operations, and modernization — one operating discipline.",
};

type Cap = {
  title: string;
  body: string;
};

type Group = {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
  items: Cap[];
  intro: string;
};

const GROUPS: Group[] = [
  {
    id: "ai",
    label: "AI",
    Icon: Sparkles,
    intro:
      "From strategy to production AI systems — embedded with your teams, governed end-to-end.",
    items: [
      {
        title: "AI Strategy & Advisory",
        body: "Identify, prioritize, and sequence AI initiatives tied to operational outcome.",
      },
      {
        title: "Generative AI Solutions",
        body: "Production-grade LLM and generative systems with retrieval, evaluation, and governance.",
      },
      {
        title: "AI Agents & Automation",
        body: "Intelligent agents that automate workflows across the enterprise.",
      },
      {
        title: "AI Systems & Platforms",
        body: "AI platforms, model serving, observability, and lifecycle tooling.",
      },
      {
        title: "AI Governance & Ethics",
        body: "Risk, compliance, observability, and accountability for AI in production.",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    Icon: Layers,
    intro: "Software, platform, data, and cloud engineering — production-grade by default.",
    items: [
      {
        title: "Software Engineering",
        body: "Application design and build across the modern stack.",
      },
      {
        title: "Platform Engineering",
        body: "Internal platforms that accelerate delivery.",
      },
      {
        title: "Data Engineering",
        body: "Pipelines, data products, and the systems that feed AI.",
      },
      {
        title: "Cloud & Infrastructure",
        body: "Hyperscaler and hybrid infrastructure, designed for scale.",
      },
      {
        title: "DevOps & SRE",
        body: "CI/CD, observability, on-call, and reliability practices.",
      },
    ],
  },
  {
    id: "integration",
    label: "Integration",
    Icon: Workflow,
    intro: "Connect the systems that already run the business.",
    items: [
      {
        title: "Systems Integration",
        body: "Enterprise-scale integration architecture.",
      },
      {
        title: "Application Integration",
        body: "Service-to-service patterns, queues, and orchestration.",
      },
      {
        title: "Data Integration",
        body: "Replicate, transform, and synchronize data at scale.",
      },
      {
        title: "API & Event Architecture",
        body: "API design, event streams, and contract governance.",
      },
      {
        title: "Enterprise Architecture",
        body: "Modern patterns for legacy environments.",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    Icon: Settings,
    intro: "Run what you build. Operate, optimize, transfer knowledge.",
    items: [
      {
        title: "Managed Services",
        body: "Operate and support deployed systems.",
      },
      {
        title: "Operational Support",
        body: "Embedded teams, runbooks, and incident response.",
      },
      {
        title: "Change Management",
        body: "Programs and operating models that move adoption.",
      },
      {
        title: "Process Optimization",
        body: "Diagnose, redesign, and measure process change.",
      },
      {
        title: "Capability Building",
        body: "Knowledge transfer — clients own what we build.",
      },
    ],
  },
  {
    id: "modernization",
    label: "Modernization",
    Icon: Server,
    intro: "Modernize legacy environments without disrupting the business.",
    items: [
      {
        title: "Technology Modernization",
        body: "Legacy environments, modernized progressively.",
      },
      {
        title: "Data Modernization",
        body: "Warehouses, lakes, and the platforms between.",
      },
      {
        title: "Cloud Migration",
        body: "Hyperscaler migration, lift-and-shift through re-platform.",
      },
    ],
  },
];

function CapPanel({ group }: { group: Group }) {
  return (
    <div>
      <p className="text-body text-ink-muted leading-relaxed max-w-2xl mb-10">
        {group.intro}
      </p>
      <StackReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
        {group.items.map((item, idx) => (
          <article
            key={item.title}
            data-stack
            className="card-surface p-6 md:p-8 min-h-[180px] flex flex-col gap-4 group hover:bg-[var(--color-surface)] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <group.Icon
                size={18}
                className="text-ink-muted group-hover:text-ink transition-colors"
                aria-hidden
              />
            </div>
            <h3 className="font-display text-h3 font-medium text-ink leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              {item.body}
            </p>
          </article>
        ))}
      </StackReveal>
    </div>
  );
}

export default function CapabilitiesPage() {
  const tabs: Tab[] = GROUPS.map((g) => ({
    id: g.id,
    label: `${g.label} · ${g.items.length}`,
    content: <CapPanel group={g} />,
  }));

  return (
    <main id="main">
      <PageHero
        eyebrow="Capabilities · Section 03"
        title="Twenty-three capabilities. One operating discipline."
        description="Five disciplines. Embedded end-to-end. Outcome-defined, time-bound, and engineered for measurable operational impact."
        image={{
          src: ASSETS.hero.architectural.lg,
          alt: "Architectural facade",
        }}
      />

      <section className="py-[120px] border-b hairline">
        <Container>
          <Tabs tabs={tabs} ariaLabel="Capability categories" />
        </Container>
      </section>

      <section className="py-[120px] border-b hairline">
        <Container>
          <div className="max-w-4xl">
            <Eyebrow>How we deliver</Eyebrow>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-2xl">
              Capabilities are delivered by embedded engineers, not slide decks.
              Every engagement transfers knowledge — clients own what we build.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}