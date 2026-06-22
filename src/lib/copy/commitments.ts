/**
 * Shared copy — three operational guarantees that appear on the
 * homepage (Commitments section) and on the /about page
 * ("What we commit to"). Single source of truth.
 */

export type Commitment = {
  t: string;
  d: string;
};

export const COMMITMENTS: readonly Commitment[] = [
  {
    t: "Approval gate",
    d: "Every agent has an approval queue. Drafts land there first. Nothing leaves without you.",
  },
  {
    t: "Full audit",
    d: "Two synced audit logs. Every input, output, and decision — append-only, reconstructable.",
  },
  {
    t: "Data discipline",
    d: "Sensitive fields are stripped before the model sees them. PII never reaches the model.",
  },
] as const;