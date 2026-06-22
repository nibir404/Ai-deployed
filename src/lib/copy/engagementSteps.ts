/**
 * Shared copy — the four-phase engagement model. Used on the
 * homepage (EngagementSteps section) and on /how-we-work
 * (Phases timeline). Single source of truth.
 */

export type EngagementPhase = {
  t: string;
  d: string;
};

export const ENGAGEMENT_PHASES: readonly EngagementPhase[] = [
  {
    t: "Discovery call",
    d: "We learn about the work you want an agent to do, your existing systems, and your governance requirements.",
  },
  {
    t: "Design and build",
    d: "We design the agent — goal, tools, guardrails, approval mode — and build it against your systems.",
  },
  {
    t: "Review outputs",
    d: "Your team reviews the agent's drafts. We tune the configuration based on what your team edits.",
  },
  {
    t: "Monitor and improve",
    d: "We operate the agent on your behalf — monitoring the queue, tuning the model, and updating the policy as your business changes.",
  },
] as const;