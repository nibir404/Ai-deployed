"use client";

import { useState } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { GridLines } from "@/components/site/primitives/GridLines";
import { Tabs, type Tab } from "@/components/site/primitives/Tabs";
import { cn } from "@/lib/cn";
import { Check, ArrowUpRight } from "@/components/site/icons";

/**
 * LiveDemo — interactive campaign dashboard mock.
 *
 * A single campaign runs across six functions (Marketing, Sales,
 * Support, Operations, Analysis, Finance). Each function shows the
 * same campaign card, but with role-specific drafts, approvals, and
 * metrics swapped in. A real "agent working" feel: status pill,
 * live metric, approval queue with a small pending list, and two
 * primary actions (Approve, Review).
 *
 * Tab interactions are keyboard accessible via the underlying Tabs
 * primitive.
 */

type DemoVariant = {
  id: string;
  label: string;
  campaign: {
    goal: string;
    agent: string;
    status: "Running" | "Drafting" | "Awaiting approval";
    live: { label: string; value: string }[];
  };
  queue: {
    title: string;
    sub: string;
    state: "Pending review" | "Approved" | "Sent";
  }[];
};

const VARIANTS: DemoVariant[] = [
  {
    id: "marketing",
    label: "Marketing",
    campaign: {
      goal: "Launch the spring newsletter to the engaged segment.",
      agent: "Newsletter agent",
      status: "Running",
      live: [
        { label: "Drafts queued", value: "live" },
        { label: "Approval rate", value: "live" },
        { label: "Send window", value: "open" },
      ],
    },
    queue: [
      { title: "Newsletter · engaged segment", sub: "agent drafted", state: "Pending review" },
      { title: "Subject-line A/B", sub: "agent drafted", state: "Pending review" },
      { title: "Newsletter · last cycle", sub: "approved 4m ago", state: "Sent" },
    ],
  },
  {
    id: "analysis",
    label: "Analysis",
    campaign: {
      goal: "Summarize the weekly sales pipeline into a board-ready note.",
      agent: "Pipeline summary agent",
      status: "Drafting",
      live: [
        { label: "Sources read", value: "live" },
        { label: "Draft length", value: "live" },
        { label: "Last sync", value: "live" },
      ],
    },
    queue: [
      { title: "Weekly pipeline summary", sub: "agent drafting", state: "Pending review" },
      { title: "Risk callouts", sub: "agent drafting", state: "Pending review" },
      { title: "Q1 board note", sub: "approved 1h ago", state: "Approved" },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    campaign: {
      goal: "Draft personalized follow-ups to yesterday’s demo calls.",
      agent: "Follow-up agent",
      status: "Awaiting approval",
      live: [
        { label: "Drafts ready", value: "live" },
        { label: "Pending review", value: "live" },
        { label: "Send window", value: "closed" },
      ],
    },
    queue: [
      { title: "Acme Co. · follow-up", sub: "agent drafted", state: "Pending review" },
      { title: "Beacon Inc. · follow-up", sub: "agent drafted", state: "Pending review" },
      { title: "Northstar · demo recap", sub: "approved 22m ago", state: "Sent" },
    ],
  },
  {
    id: "support",
    label: "Support",
    campaign: {
      goal: "Triage and respond to overnight support inbox.",
      agent: "Support reply agent",
      status: "Running",
      live: [
        { label: "Inbox scanned", value: "live" },
        { label: "Drafts queued", value: "live" },
        { label: "Voice match", value: "on" },
      ],
    },
    queue: [
      { title: "Order #8841 · refund query", sub: "agent drafted", state: "Pending review" },
      { title: "Order #8840 · shipping", sub: "agent drafted", state: "Pending review" },
      { title: "Order #8839 · resolved", sub: "approved 4m ago", state: "Sent" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    campaign: {
      goal: "Reorder low-stock SKUs and route approvals to the operations lead.",
      agent: "Reorder agent",
      status: "Awaiting approval",
      live: [
        { label: "SKUs scanned", value: "live" },
        { label: "Reorders drafted", value: "live" },
        { label: "Pending review", value: "live" },
      ],
    },
    queue: [
      { title: "SKU-4129 · reorder", sub: "agent drafted", state: "Pending review" },
      { title: "SKU-4011 · reorder", sub: "agent drafted", state: "Pending review" },
      { title: "SKU-3980 · reorder", sub: "approved 1h ago", state: "Sent" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    campaign: {
      goal: "Reconcile the week’s invoices and flag anomalies.",
      agent: "Reconciliation agent",
      status: "Running",
      live: [
        { label: "Invoices read", value: "live" },
        { label: "Anomalies", value: "live" },
        { label: "Last sync", value: "live" },
      ],
    },
    queue: [
      { title: "Anomaly · INV-4491", sub: "agent flagged", state: "Pending review" },
      { title: "Reconciliation · week 17", sub: "agent drafted", state: "Pending review" },
      { title: "Reconciliation · week 16", sub: "approved 2d ago", state: "Approved" },
    ],
  },
];

function CampaignCard({ v }: { v: DemoVariant }) {
  return (
    <div className="card-surface overflow-hidden">
      {/* URL bar */}
      <div className="flex items-center gap-2 border-b hairline px-4 py-2.5">
        <span className="inline-block size-1.5 bg-[var(--color-accent)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted truncate">
          deployco.co / {v.id} / campaigns / active
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          ● live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[var(--color-line)]">
        {/* Campaign goal */}
        <div className="md:col-span-3 bg-[var(--color-card)] p-5 md:p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Campaign
            </span>
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1",
                v.campaign.status === "Running" && "text-[var(--color-accent)]",
                v.campaign.status === "Awaiting approval" && "text-ink",
                v.campaign.status === "Drafting" && "text-ink-muted",
              )}
            >
              {v.campaign.status}
            </span>
          </div>
          <p className="mt-3 text-base md:text-lg text-ink leading-snug max-w-md">
            {v.campaign.goal}
          </p>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {v.campaign.agent}
          </div>
        </div>

        {/* Live metrics */}
        <div className="md:col-span-2 bg-[var(--color-card)] p-5 md:p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Live
          </div>
          <ul className="mt-3 space-y-2">
            {v.campaign.live.map((m) => (
              <li
                key={m.label}
                className="flex items-center justify-between gap-3 py-1.5 border-b hairline last:border-b-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {m.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block size-1 bg-[var(--color-accent)]"
                  />
                  {m.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Approval queue */}
      <div className="p-5 md:p-6 border-t hairline">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Approval queue · 3 items
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:text-[var(--color-accent)] transition-colors"
            >
              <Check size={12} aria-hidden />
              Approve all
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors"
            >
              Review
              <ArrowUpRight size={12} aria-hidden />
            </button>
          </div>
        </div>
        <ul className="mt-4 divide-y divide-[var(--color-line)]">
          {v.queue.map((q) => (
            <li
              key={q.title}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm text-ink">{q.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{q.sub}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1",
                  q.state === "Approved" && "text-[var(--color-accent)]",
                  q.state === "Sent" && "text-ink",
                  q.state === "Pending review" && "text-ink-muted",
                )}
              >
                {q.state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LiveDemo() {
  const tabs: Tab[] = VARIANTS.map((v) => ({
    id: v.id,
    label: v.label,
    content: <CampaignCard v={v} />,
  }));

  return (
    <section
      id="demo"
      aria-label="What it looks like in practice"
      className="relative border-b hairline py-[100px] md:py-[140px] overflow-hidden"
    >
      <Container className="relative">
        <GridLines sideRules edgeRule />
        <div className="max-w-3xl">
          <Eyebrow>Live demo</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            Agents that do the work,{" "}
            <span className="text-ink-muted">not just describe it.</span>
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            The same campaign, run by a different agent depending on the job.
            Every output lands in your approval queue. You review, edit if
            needed, and approve.
          </p>
        </div>

        <div className="mt-10">
          <Tabs tabs={tabs} ariaLabel="Demo function" variant="pill" />
        </div>
      </Container>
    </section>
  );
}
