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
    d: "Every agent has an approval queue. Nothing leaves without your team.",
  },
  {
    t: "Full audit",
    d: "Two synced logs. Every input, output, and decision — append-only, queryable.",
  },
  {
    t: "Data discipline",
    d: "Sensitive fields stripped before the model. PII never reaches the model.",
  },
] as const;