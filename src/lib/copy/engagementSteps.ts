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
    t: "Discovery",
    d: "We learn the work, your systems, and your governance requirements.",
  },
  {
    t: "Architect and build",
    d: "We design the agent — goal, tools, guardrails, approval mode — and build it against your systems.",
  },
  {
    t: "Review",
    d: "Your team reviews the drafts. We tune the configuration from what your team edits.",
  },
  {
    t: "Run and improve",
    d: "We operate the agent, tune the model, and update the policy as your business changes.",
  },
] as const;