/**
 * Shared copy — "Why FDE" section on the homepage.
 *
 * Defines the Forward Deployed Engineer role and explains why the
 * role exists for AI deployment in the enterprise. Single source
 * of truth for the WhyFde section.
 */

export type FdeReason = {
  t: string;
  d: string;
};

export type FdeResponsibility = {
  n: string;
  d: string;
};

export const FDE_REASONS: readonly FdeReason[] = [
  {
    t: "The last mile",
    d: "Most AI projects stall between the model and the production system. The FDE owns that distance.",
  },
  {
    t: "Embedded, not external",
    d: "They sit inside your stack, tools, and review queues. They ship where the work is.",
  },
  {
    t: "Accountable in production",
    d: "They carry the pager, run the rollout, and own the outcome against the business — not the demo.",
  },
] as const;

export const FDE_RESPONSIBILITIES: readonly FdeResponsibility[] = [
  {
    n: "Deploy",
    d: "Stand the agent up in your environment, against your systems, behind your approval queue.",
  },
  {
    n: "Integrate",
    d: "Wire it into the tools your team already uses.",
  },
  {
    n: "Observe",
    d: "Instrument the runtime, watch the outputs, catch regressions early.",
  },
  {
    n: "Govern",
    d: "Tune the approval mode, the guardrails, the data discipline.",
  },
  {
    n: "Hand off",
    d: "When the system is steady, transfer operation to a named owner on your team.",
  },
] as const;