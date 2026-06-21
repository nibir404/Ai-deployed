import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import {
  Tabs,
  type Tab,
} from "@/components/site/primitives/Tabs";
import { StackReveal } from "@/components/site/primitives/StackReveal";
import { GridLines } from "@/components/site/primitives/GridLines";
import {
  Sparkles,
  Layers,
  Workflow,
  Settings,
  Server,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

type Group = {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
  items: string[];
};

const GROUPS: Group[] = [
  {
    id: "ai",
    label: "AI",
    Icon: Sparkles,
    items: [
      "AI Strategy & Advisory",
      "Generative AI Solutions",
      "AI Agents & Automation",
      "AI Systems & Platforms",
      "AI Governance & Ethics",
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    Icon: Layers,
    items: [
      "Software Engineering",
      "Platform Engineering",
      "Data Engineering",
      "Cloud & Infrastructure",
      "DevOps & SRE",
    ],
  },
  {
    id: "integration",
    label: "Integration",
    Icon: Workflow,
    items: [
      "Systems Integration",
      "Application Integration",
      "Data Integration",
      "API & Event Architecture",
      "Enterprise Architecture",
    ],
  },
  {
    id: "operations",
    label: "Operations",
    Icon: Settings,
    items: [
      "Managed Services",
      "Operational Support",
      "Change Management",
      "Process Optimization",
      "Capability Building",
    ],
  },
  {
    id: "modernization",
    label: "Modernization",
    Icon: Server,
    items: [
      "Technology Modernization",
      "Data Modernization",
      "Cloud Migration",
    ],
  },
];

function TabPanel({
  items,
  Icon,
}: {
  items: string[];
  Icon: ComponentType<IconProps>;
}) {
  return (
    <StackReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
      {items.map((item, idx) => (
        <div
          key={item}
          data-stack
          className="card-surface p-6 md:p-8 min-h-[160px] flex flex-col gap-4 group hover:bg-[var(--color-surface)] transition-colors relative overflow-hidden"
        >
          {/* Big lime number index in the corner */}
          <span
            aria-hidden
            className="absolute top-3 right-4 font-display text-3xl font-medium leading-none accent-text"
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          <Icon
            size={20}
            className="text-ink-muted group-hover:text-ink transition-colors"
            aria-hidden
          />
          <h4 className="font-display text-h3 font-medium text-ink leading-snug">
            {item}
          </h4>
        </div>
      ))}
    </StackReveal>
  );
}

/**
 * Capabilities — Dispatch-style lime-pill tabbed list.
 *
 * The tab strip becomes a segmented pill control. The active tab
 * gets a lime fill with dark text. Tab content is a 3-up grid with
 * a large lime number index in each card corner.
 */
export function Capabilities() {
  const tabs: Tab[] = GROUPS.map((g) => ({
    id: g.id,
    label: `${g.label} · ${g.items.length}`,
    content: <TabPanel items={g.items} Icon={g.Icon} />,
  }));

  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="relative border-b hairline py-[120px]"
    >
      <Container className="relative">
        <GridLines sideRules baselineGrid />
        <div className="max-w-4xl">
          <Eyebrow>Section 07 · Capabilities</Eyebrow>
          <DisplayHeading as="h2" className="mt-6">
            Twenty-three capabilities. One operating discipline.
          </DisplayHeading>
        </div>

        <div className="mt-10 md:mt-12">
          <Tabs tabs={tabs} ariaLabel="Capability categories" variant="pill" />
        </div>
      </Container>
    </section>
  );
}
