import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { Reveal } from "@/components/site/primitives/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/site/primitives/Button";
import Link from "next/link";
import { ArrowUpRight } from "@/components/site/icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Governance — AI Deployed",
  description:
    "Every output is checked, every action is logged. The governance layer behind every agent we run.",
};

type SectionProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

function Section({ id, eyebrow, title, body }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={eyebrow}
      className="relative border-b hairline py-[100px] md:py-[120px] scroll-mt-24"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              {title}
            </DisplayHeading>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 text-body text-ink-muted leading-relaxed space-y-5 max-w-xl">
            {body}
          </div>
        </div>
      </Container>
    </section>
  );
}

const CHECKS = [
  {
    t: "Voice match",
    d: "Output reads as your voice — not a generic model. Tuned to your tone, register, and vocabulary.",
  },
  {
    t: "Claim verification",
    d: "Any factual claim in the draft is checked against the linked source before the draft is queued.",
  },
  {
    t: "Policy compliance",
    d: "Per-agent rules — what the agent can read, write, and trigger — are enforced before generation.",
  },
  {
    t: "Confidentiality",
    d: "Sensitive fields are stripped or redacted before the model sees them. PII is never sent to the model.",
  },
  {
    t: "Brand consistency",
    d: "Approved terminology, product names, and prohibited language are enforced across every output.",
  },
];

export default function GovernancePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Governance"
        title="Every output is checked, every action is logged."
        description="The governance layer behind every agent we run — what gets checked, how it fails closed, and where the audit trail lives."
      />

      <Section
        id="checked"
        eyebrow="What gets checked"
        title={
          <>
            Checks run before the draft is queued.
          </>
        }
        body={
          <>
            <p>
              The policy stack runs at generation time, not after. Five
              categories of check, configurable per agent — so the governance
              is fit to the job, not a generic filter.
            </p>
          </>
        }
      />
      {/* Check list — visually distinct list laid out below the intro section. */}
      <section
        aria-label="Checks"
        className="relative border-b hairline pb-[100px] md:pb-[120px]"
      >
        <Container>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
            {CHECKS.map((c, i) => (
              <li
                key={c.t}
                className="card-surface p-6 md:p-7 min-h-[200px] flex flex-col gap-4 group hover:bg-[var(--color-surface)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="inline-block size-1 bg-[var(--color-accent)]"
                  />
                </div>
                <h3 className="font-display text-h3 font-medium text-ink leading-snug">
                  {c.t}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {c.d}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section
        id="on-each-check"
        eyebrow="On each check"
        title={
          <>
            Pass, warn, or block — configurable per agent.
          </>
        }
        body={
          <>
            <p>
              Every check returns one of three outcomes. Pass lets the draft
              move on. Warn surfaces a note in the queue — the draft still
              goes out. Block stops the draft entirely; nothing leaves the
              queue.
            </p>
            <p>
              The severity is configurable per agent and per policy. A voice
              mismatch might <span className="text-ink">warn</span> on one
              agent and <span className="text-ink">block</span> on another.
              You decide what is a hard rule and what is a soft one.
            </p>
          </>
        }
      />

      <Section
        id="fails-closed"
        eyebrow="Fails closed"
        title={
          <>
            If the policy layer is unavailable, the agent does not run.
          </>
        }
        body={
          <>
            <p>
              The policy layer is not optional. If it cannot be reached —
              network failure, service outage, schema error — every agent
              fails closed. Drafts are not produced. Actions are not taken.
              Your team is notified.
            </p>
            <p>
              We chose fail-closed over fail-open deliberately. A missed draft
              is recoverable. A draft that bypassed policy is not.
            </p>
          </>
        }
      />

      <Section
        id="policies-live"
        eyebrow="Where policies live"
        title={
          <>
            Policies are data, not code.{" "}
            <span className="text-ink-muted">Versioned and reversible.</span>
          </>
        }
        body={
          <>
            <p>
              Every rule lives in the policy store — versioned, scoped, and
              auditable. Organizational policies apply to every agent.
              Agent-specific policies override at the agent level. Changes
              are admin-managed and recorded in the audit log.
            </p>
            <p>
              Roll back a policy change in one click. Diff any version
              against its predecessor. Export the full set for compliance
              review.
            </p>
          </>
        }
      />

      <Section
        id="audit-trail"
        eyebrow="The audit trail"
        title={
          <>
            Two synced logs.{" "}
            <span className="text-ink-muted">
              Reconstructable months later.
            </span>
          </>
        }
        body={
          <>
            <p>
              We keep two synced audit logs — one internal, one exportable.
              Every input, output, and decision is recorded with timestamp,
              actor, and context. The logs are append-only.
            </p>
            <p>
              When you need to answer a compliance question — <em>what did
              this agent do, when, and why?</em> — the answer is in the
              trail. Filterable by agent, actor, action, and time.
            </p>
          </>
        }
      />

      <Section
        id="what-this-is-not"
        eyebrow="What this is not"
        title={
          <>
            Not a substitute for human approval.
          </>
        }
        body={
          <>
            <p>
              The governance layer is not consumer content moderation. It is
              not a marketing safety net. It does not promise to catch every
              edge case, and it does not replace the judgment of your team.
            </p>
            <p>
              The agents operate under an approval gate. Every output is a
              draft until a human approves it. That is the contract.
            </p>
          </>
        }
      />

      {/* Security / closing CTA */}
      <section className="relative border-b hairline py-[100px] md:py-[120px] overflow-hidden">
        <Container>
          <Reveal>
            <div className="card-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow>Security review</Eyebrow>
                <p className="mt-4 text-body text-ink leading-relaxed">
                  We share our policy schema, audit-log export format, and
                  fail-closed behavior on request. If your security team
                  needs to review the platform before an engagement, we will
                  walk through it with them.
                </p>
              </div>
              <Link href="/contact" className="btn-pill shrink-0">
                <span className="btn-pill__icon" aria-hidden>
                  <ArrowUpRight size={14} />
                </span>
                <span className="btn-pill__label">Start a conversation</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}