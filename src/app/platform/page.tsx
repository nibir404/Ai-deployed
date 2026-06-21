import type { Metadata } from "next";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { ButtonLink } from "@/components/site/primitives/Button";
import { GridLines } from "@/components/site/primitives/GridLines";
import { AccentGlow } from "@/components/site/primitives/AccentGlow";
import { ArrowUpRight } from "@/components/site/icons";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Platform — AI Deployed",
  description:
    "One platform for building, running, and governing AI agents in production.",
};

/* Sticky section anchor nav — appears below the hero and sticks to
   the top of the viewport so users can jump between platform
   capabilities without scrolling back to the hero. */
const SECTION_NAV = [
  { id: "build", label: "Build" },
  { id: "approve", label: "Approve" },
  { id: "govern", label: "Govern" },
  { id: "audit", label: "Audit" },
  { id: "integrate", label: "Integrate" },
  { id: "operate", label: "Operate" },
  { id: "measure", label: "Measure" },
];

type MockCardProps = {
  url: string;
  title?: string;
  children: React.ReactNode;
};

function MockCard({ url, title, children }: MockCardProps) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="flex items-center gap-2 border-b hairline px-4 py-2.5">
        <span className="inline-block size-1.5 bg-[var(--color-accent)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted truncate">
          {url}
        </span>
        {title && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            {title}
          </span>
        )}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function MockField({
  label,
  value,
  chip,
}: {
  label: string;
  value: string;
  chip?: string;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr_auto] items-baseline gap-3 py-2 border-b hairline last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
        {label}
      </span>
      <span className="text-sm text-ink">{value}</span>
      {chip && (
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
          {chip}
        </span>
      )}
    </div>
  );
}

type SectionProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
  bullets: string[];
  mock: React.ReactNode;
  reverse?: boolean;
};

function TwoColSection({
  id,
  eyebrow,
  title,
  body,
  bullets,
  mock,
  reverse,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={typeof eyebrow === "string" ? eyebrow : id}
      className="relative border-b hairline py-[100px] md:py-[120px] scroll-mt-24"
    >
      <Container className="relative">
        <GridLines sideRules />
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start",
          )}
        >
          <div
            className={cn(
              "lg:col-span-5",
              reverse && "lg:order-2",
            )}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayHeading
              as="h2"
              size="section"
              className="mt-6 leading-[0.96] tracking-[-0.035em]"
            >
              {title}
            </DisplayHeading>
            <div className="mt-8 text-body text-ink-muted leading-relaxed max-w-md space-y-4">
              {body}
            </div>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-ink leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-1 bg-[var(--color-accent)] shrink-0"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className={cn("lg:col-span-7", reverse && "lg:order-1")}>
            {mock}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function PlatformPage() {
  return (
    <main id="main">
      {/* Hero */}
      <section
        aria-label="Platform"
        className="relative pt-[140px] pb-[100px] md:pb-[120px] border-b hairline overflow-hidden"
      >
        <AccentGlow position="corner-tr" intensity={70} />
        <GridLines sideRules edgeRule baselineGrid />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow>Platform</Eyebrow>
            <DisplayHeading
              as="h1"
              size="hero"
              className="mt-8 leading-[0.95] tracking-[-0.035em] font-medium"
            >
              One platform for building, running,{" "}
              <span className="text-ink-muted">
                and governing AI agents in production
              </span>
              .
            </DisplayHeading>
            <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-2xl">
              Each agent is designed for one specific job, runs against your
              data, and operates under an approval gate you control. The
              platform handles the runtime, the policy stack, and the audit
              trail — so your team only reviews the work that matters.
            </p>
          </div>
        </Container>
      </section>

      {/* Sticky section nav */}
      <div className="sticky top-16 md:top-20 z-40 border-b hairline bg-[var(--color-bg)]/85 backdrop-blur-xl">
        <Container>
          <nav
            aria-label="Platform sections"
            className="flex items-center gap-1 md:gap-2 overflow-x-auto py-3 -mx-2 px-2"
          >
            {SECTION_NAV.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <TwoColSection
        id="build"
        eyebrow="Build"
        title={
          <>
            Each agent designed for one specific job.{" "}
            <span className="text-ink-muted">In your business, against your rules.</span>
          </>
        }
        body={
          <p>
            Agents are not generic assistants. Each one is configured around a
            single goal — a job you need done — with the tools, data, and
            guardrails scoped to that job. We build the agent with you, against
            your existing systems, until the configuration is right.
          </p>
        }
        bullets={[
          "Goal-scoped — one agent per job, not a multi-purpose assistant.",
          "Tool allowlist — only the systems and APIs the agent needs.",
          "Guardrails per agent — what it can read, write, and trigger.",
          "Configurable approval mode — auto, review, or strict.",
        ]}
        mock={
          <MockCard url="deployco.co / agents / configure" title="Customer reply">
            <div className="space-y-0">
              <MockField label="Agent name" value="Customer reply" />
              <MockField
                label="Goal"
                value="Respond to inbound support emails using approved knowledge."
              />
              <MockField
                label="Tools allowed"
                value="kb.search · gmail.send · tickets.update"
                chip="3"
              />
              <MockField
                label="Guardrails"
                value="No outbound to non-customer domains. No commit to billing."
              />
              <MockField
                label="Data source"
                value="Internal knowledge base · versioned daily"
              />
              <MockField label="Approval mode" value="Review before send" chip="default" />
            </div>
          </MockCard>
        }
      />

      <TwoColSection
        id="approve"
        eyebrow="Approve"
        title={
          <>
            Nothing leaves the queue without you.{" "}
            <span className="text-ink-muted">
              Every output reviewed before any action is taken.
            </span>
          </>
        }
        body={
          <p>
            Every agent has an approval queue. Drafts land there first — the
            agent never sends, writes, or triggers directly. Your team reviews
            the queue, makes edits if needed, and approves.
          </p>
        }
        bullets={[
          "Per-agent approval mode — auto, review, or strict.",
          "Editable drafts — your team can change anything before it goes out.",
          "Bulk actions — approve similar items together.",
          "Slack and email notifications on every pending item.",
        ]}
        reverse
        mock={
          <MockCard url="deployco.co / queue" title="3 pending">
            <ul className="space-y-3">
              {[
                {
                  t: "Lead reply · Acme Co.",
                  sub: "agent drafted · awaiting your review",
                  tag: "Pending review",
                },
                {
                  t: "Reorder · SKU-4129",
                  sub: "agent drafted · awaiting your review",
                  tag: "Pending review",
                },
                {
                  t: "Support reply · order #8841",
                  sub: "you approved 2m ago",
                  tag: "Approved",
                },
              ].map((q) => (
                <li
                  key={q.t}
                  className="flex items-start justify-between gap-4 py-2 border-b hairline last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-ink">{q.t}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{q.sub}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1",
                      q.tag === "Approved"
                        ? "text-[var(--color-accent)]"
                        : "text-ink-muted",
                    )}
                  >
                    {q.tag}
                  </span>
                </li>
              ))}
            </ul>
          </MockCard>
        }
      />

      <TwoColSection
        id="govern"
        eyebrow="Govern"
        title={
          <>
            Rules enforced before generation.{" "}
            <span className="text-ink-muted">
              Not a filter at the end. A gate at the start.
            </span>
          </>
        }
        body={
          <p>
            The policy stack runs before the agent produces a draft. Voice
            match, claim verification, policy compliance, confidentiality, and
            brand consistency are checked at the policy layer — not after the
            fact.
          </p>
        }
        bullets={[
          "Three policy scopes — organizational, agent-specific, execution-time.",
          "Per-agent severity — pass, warn, block configurable per policy.",
          "Fails closed — if the policy layer is unavailable, the agent does not run.",
          "Versioned policies — every change is logged and reversible.",
        ]}
        mock={
          <MockCard url="deployco.co / policies" title="Customer reply">
            <div className="space-y-3">
              {[
                {
                  l: "Organizational",
                  t: "Voice · claim · brand · confidentiality",
                  sub: "Org-wide defaults",
                },
                {
                  l: "Agent-specific",
                  t: "No outbound to non-customer domains",
                  sub: "Customer reply · override",
                },
                {
                  l: "Execution-time",
                  t: "Output must reference current order status",
                  sub: "Context-gated rule",
                },
              ].map((p, idx) => (
                <div
                  key={p.l}
                  className="relative pl-4 border-l-2 border-[var(--color-line)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                      {p.l}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      {p.sub}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink">{p.t}</p>
                </div>
              ))}
              <div className="mt-4 flex items-center gap-3 pt-4 border-t hairline">
                <span
                  aria-hidden
                  className="inline-block size-1.5 bg-[var(--color-accent)]"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                  Result
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Allowed
                </span>
              </div>
            </div>
          </MockCard>
        }
      />

      <TwoColSection
        id="audit"
        eyebrow="Audit"
        title={
          <>
            Every action logged.{" "}
            <span className="text-ink-muted">
              Append-only. Reconstructable months later.
            </span>
          </>
        }
        body={
          <p>
            Two synced audit logs capture every input, output, and decision.
            The logs are append-only and queryable — when you need to know what
            the agent did, and why, the answer is in the trail.
          </p>
        }
        bullets={[
          "Append-only logs — nothing is rewritten, nothing is deleted.",
          "Two syncs — internal log and an exportable audit record.",
          "Filterable by agent, actor, action type, and time.",
          "Reconstructable — rebuild any agent run from inputs and outputs.",
        ]}
        reverse
        mock={
          <MockCard url="deployco.co / audit" title="last 24h">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Showing 7 of 1,284 events
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Live
              </span>
            </div>
            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="text-ink-dim">
                  <th className="py-1.5 font-normal uppercase tracking-[0.16em] text-[9px]">Time</th>
                  <th className="py-1.5 font-normal uppercase tracking-[0.16em] text-[9px]">Actor</th>
                  <th className="py-1.5 font-normal uppercase tracking-[0.16em] text-[9px]">Action</th>
                  <th className="py-1.5 font-normal uppercase tracking-[0.16em] text-[9px]">Context</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                {[
                  ["04:21:08", "agent", "draft.created", "Customer reply · #8841"],
                  ["04:21:09", "policy", "voice.check.pass", "—"],
                  ["04:21:09", "policy", "claim.check.pass", "—"],
                  ["04:21:11", "user", "draft.approved", "sara@"],
                  ["04:18:42", "agent", "draft.created", "Customer reply · #8839"],
                  ["04:18:43", "system", "send.completed", "via gmail.send"],
                  ["04:16:09", "agent", "kb.search", "‘refund policy’"],
                ].map((row, i) => (
                  <tr key={i} className="border-t hairline">
                    {row.map((c, j) => (
                      <td key={j} className="py-1.5 pr-3 align-top">
                        <span className={j === 1 ? "text-[var(--color-accent)]" : ""}>
                          {c}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </MockCard>
        }
      />

      <TwoColSection
        id="integrate"
        eyebrow="Integrate"
        title={
          <>
            Connected to where the work already happens.{" "}
            <span className="text-ink-muted">
              Email, CRM, support, internal APIs.
            </span>
          </>
        }
        body={
          <p>
            Agents plug into the systems your team already uses. We do the
            wiring — OAuth, scopes, rate limits, retries — and the audit log
            captures every call.
          </p>
        }
        bullets={[
          "Email — Gmail, Outlook, SES, Postmark.",
          "CRM — Salesforce, HubSpot, Pipedrive.",
          "Support — Zendesk, Intercom, Front, Help Scout.",
          "Internal — REST and GraphQL APIs, with auth handled by the platform.",
        ]}
        mock={
          <MockCard url="deployco.co / integrations" title="Customer reply">
            <div className="space-y-4">
              {[
                {
                  g: "Email",
                  items: ["Gmail", "Outlook", "SES", "Postmark"],
                },
                {
                  g: "CRM",
                  items: ["Salesforce", "HubSpot", "Pipedrive"],
                },
                {
                  g: "Support",
                  items: ["Zendesk", "Intercom", "Front", "Help Scout"],
                },
                {
                  g: "Internal",
                  items: ["REST · GraphQL · custom"],
                },
              ].map((cat) => (
                <div key={cat.g}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                    {cat.g}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cat.items.map((i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted border hairline px-2 py-1"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MockCard>
        }
      />

      <TwoColSection
        id="operate"
        eyebrow="Operate"
        title={
          <>
            We run it. You review it.{" "}
            <span className="text-ink-muted">
              The runtime, monitoring, and ongoing improvement are ours.
            </span>
          </>
        }
        body={
          <p>
            You do not need a platform team to operate this. We run the
            runtime, monitor the agents, and improve the configurations as
            your business changes. You get a regular report and a queue to
            review.
          </p>
        }
        bullets={[
          "Runtime — model selection, retries, timeouts, fallbacks.",
          "Monitoring — health, latency, cost, error rate per agent.",
          "Weekly reports — what the agents did, where they needed you.",
          "Configuration updates — policies, tools, and prompts tuned monthly.",
        ]}
        reverse
        mock={
          <MockCard url="deployco.co / operations" title="Live">
            <div className="grid grid-cols-3 gap-px bg-[var(--color-line)] border hairline">
              {[
                { l: "Agents running", v: "live" },
                { l: "Runs today", v: "live" },
                { l: "Health", v: "OK" },
              ].map((s) => (
                <div key={s.l} className="bg-[var(--color-card)] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {s.l}
                  </div>
                  <div className="mt-2 font-display text-2xl text-ink flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block size-1.5 bg-[var(--color-accent)]"
                    />
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Recent activity
              </div>
              <ul className="mt-2 space-y-1.5 text-sm">
                {[
                  "Customer reply · draft created",
                  "Lead routing · draft approved",
                  "Customer reply · draft created",
                  "Lead routing · draft approved",
                  "Customer reply · send completed",
                ].map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-1.5 border-b hairline last:border-b-0 text-ink-muted"
                  >
                    <span
                      aria-hidden
                      className="inline-block size-1 bg-[var(--color-line)]"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </MockCard>
        }
      />

      <TwoColSection
        id="measure"
        eyebrow="Measure"
        title={
          <>
            See what the agent did, and where it needed you most.{" "}
            <span className="text-ink-muted">
              Regular reporting on outputs, approvals, and where judgment was applied.
            </span>
          </>
        }
        body={
          <p>
            The report tells you what the agent ran, how often your team
            approved without changes, and where the work needed human judgment.
            You see the trend, not just the count.
          </p>
        }
        bullets={[
          "Outputs over time — volume, mix, change rate.",
          "Approval rate — what your team approves as-is vs. edits.",
          "Where judgment was applied — which drafts needed edits and why.",
          "Trend — week over week, month over month.",
        ]}
        mock={
          <MockCard url="deployco.co / reports" title="Customer reply">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Customer reply agent · last 7 weeks
                </div>
                <div className="mt-1 font-display text-3xl text-ink">
                  Outputs
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  Edit rate
                </div>
                <div className="mt-1 font-mono text-sm text-[var(--color-accent)]">
                  Improving
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-2 items-end h-32">
              {[40, 55, 48, 62, 70, 80, 92].map((h, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-accent)]"
                  style={{
                    height: `${h}%`,
                    opacity: 0.4 + (i / 6) * 0.6,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-dim">
              {["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((w) => (
                <div key={w} className="text-center">{w}</div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Edit rate trending down · fewer edits as the model improves
            </p>
          </MockCard>
        }
      />

      {/* Closing CTA */}
      <section className="relative border-b hairline py-[100px] md:py-[140px] overflow-hidden">
        <AccentGlow position="center" intensity={45} />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <DisplayHeading
              as="h2"
              size="section"
              className="leading-[0.96] tracking-[-0.035em]"
            >
              See how the platform fits your business.
            </DisplayHeading>
            <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl mx-auto">
              We&apos;ll walk through the platform with your context, your
              tools, and your data. No demo data, no generic walkthrough.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn-pill">
                <span className="btn-pill__icon" aria-hidden>
                  <ArrowUpRight size={14} />
                </span>
                Start a conversation
              </Link>
              <ButtonLink href="/how-we-work" variant="secondary">
                How an engagement works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
