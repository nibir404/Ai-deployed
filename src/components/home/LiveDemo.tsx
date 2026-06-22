"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { DisplayHeading } from "@/components/site/primitives/DisplayHeading";
import { cn } from "@/lib/cn";
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Target,
  Workflow,
  Settings,
  Briefcase,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Shield,
  Sparkles,
  type IconProps,
} from "@/components/site/icons";
import type { ComponentType } from "react";

/**
 * LiveDemo — an interactive, auto-running FDE engagement walkthrough.
 *
 * Two visual layers:
 *
 *   1. The engagement card. A single card with the active phase, a
 *      circular progress ring, the phase stepper (6 dots), and a
 *      "Run the engagement" button. Hit play and the card advances
 *      through all 6 phases on a 3.5s timer, animating the progress
 *      bar, the active phase, the live metric, and the deliverable
 *      queue. Pause and reset are exposed. No grid lines, no URL
 *      bar, no extra columns — the card is the whole story.
 *
 *   2. The capability grid (below the card). A 2 × 4 icon-card grid
 *      in the editorial style — "OUR PEOPLE" on the left, "OUR
 *      STACK" on the right, each with 4 capability cards.
 *
 * Interactivity:
 *   - Play / Pause / Reset controls
 *   - Auto-advance every 3.5s
 *   - Manual click on any stepper dot jumps to that phase
 *   - Hovering a deliverable row highlights it
 *   - When the engagement finishes, a "Run again" affordance appears
 */

type Deliverable = {
  id: string;
  title: string;
  state: "Pending review" | "Approved" | "Shipped" | "In review";
};

type Phase = {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
  oneLine: string;
  detail: string;
  metric: { label: string; value: string };
  progress: number;
  deliverables: Deliverable[];
};

const PHASES: Phase[] = [
  {
    id: "diagnose",
    label: "Diagnose",
    Icon: Target,
    oneLine: "Shadow the team. Map the work. Write the diagnosis.",
    detail:
      "The FDE joins your standup, shadows the team for one sprint, and writes a one-page diagnosis of the actual bottleneck — not the one that was on the slide deck.",
    metric: { label: "Diagnosis", value: "v0.3" },
    progress: 25,
    deliverables: [
      { id: "d1", title: "Diagnosis one-pager", state: "In review" },
      { id: "d2", title: "System map", state: "Pending review" },
      { id: "d3", title: "Engagement scope", state: "Approved" },
    ],
  },
  {
    id: "embed",
    label: "Embed",
    Icon: Workflow,
    oneLine: "Sit in your tools. Pair with the team that owns the work.",
    detail:
      "Three days a week on-site, in your repos, in your chat. Repo access, CI green, a draft PR template. The team owns the FDE's first review.",
    metric: { label: "Days on-site", value: "Tue · Wed · Thu" },
    progress: 50,
    deliverables: [
      { id: "e1", title: "Repo + CI", state: "Shipped" },
      { id: "e2", title: "Channel norms", state: "Pending review" },
      { id: "e3", title: "First pair session", state: "Pending review" },
    ],
  },
  {
    id: "ship",
    label: "Ship",
    Icon: GitBranch,
    oneLine: "Small PRs against the systems you already use.",
    detail:
      "Every change is a PR, every PR is reviewed by your team. No parallel side-project. The fix lives in your repo from day one and your team can ship it without the FDE.",
    metric: { label: "PRs merged", value: "11" },
    progress: 70,
    deliverables: [
      { id: "s1", title: "PR #214 · core sync", state: "Shipped" },
      { id: "s2", title: "PR #217 · retries", state: "In review" },
      { id: "s3", title: "PR #221 · observability", state: "Pending review" },
    ],
  },
  {
    id: "handoff",
    label: "Hand off",
    Icon: Settings,
    oneLine: "Runbook, training, named owner. Then the FDE steps back.",
    detail:
      "A 12-page runbook in your wiki. Two 45-minute training sessions, recorded. The named owner signs off — your team runs the work end-to-end.",
    metric: { label: "Owner signoff", value: "1" },
    progress: 95,
    deliverables: [
      { id: "h1", title: "Runbook · 12 pages", state: "Approved" },
      { id: "h2", title: "Training · 2 sessions", state: "Approved" },
      { id: "h3", title: "Owner signoff", state: "Approved" },
    ],
  },
  {
    id: "followup",
    label: "Follow up",
    Icon: Shield,
    oneLine: "A two-week support window. Reachable, not on retainer.",
    detail:
      "The FDE is reachable for two weeks after handoff. One regression in the first week — a timezone edge case — patched in 90 minutes, reviewed by your team.",
    metric: { label: "Regressions fixed", value: "1 / 1" },
    progress: 100,
    deliverables: [
      { id: "f1", title: "Patch · timezone edge", state: "Shipped" },
      { id: "f2", title: "Retro writeup", state: "Approved" },
      { id: "f3", title: "Final status note", state: "Pending review" },
    ],
  },
  {
    id: "continuous",
    label: "Continuous",
    Icon: Sparkles,
    oneLine: "The next bottleneck is on the wall. The team is sharper for it.",
    detail:
      "When you call us back, the FDE diagnoses the next bottleneck the same way — and your team writes the one-pager this time. The muscle is already there.",
    metric: { label: "Engagements / yr", value: "3" },
    progress: 0,
    deliverables: [
      { id: "c1", title: "Next bottleneck · draft", state: "Pending review" },
      { id: "c2", title: "Annual retrospective", state: "Pending review" },
      { id: "c3", title: "Quarterly office hours", state: "Approved" },
    ],
  },
];

// How long each phase is shown during the auto-run (ms).
const PHASE_DURATION_MS = 3500;

function ProgressRing({
  value,
  size = 88,
  stroke = 4,
  active,
}: {
  value: number;
  size?: number;
  stroke?: number;
  active: boolean;
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={active ? "var(--color-ink)" : "var(--color-ink-dim)"}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 700ms ease-out" }}
        />
      </svg>
      <span
        className={cn(
          "absolute font-mono text-[11px] tabular-nums",
          active ? "text-ink" : "text-ink-muted",
        )}
      >
        {v}%
      </span>
    </div>
  );
}

function Stepper({
  current,
  onJump,
  playing,
}: {
  current: number;
  onJump: (i: number) => void;
  playing: boolean;
}) {
  return (
    <ol
      aria-label="Engagement phases"
      className="flex flex-wrap items-center gap-3 sm:gap-4"
    >
      {PHASES.map((p, idx) => {
        const isCurrent = idx === current;
        const isDone = idx < current;
        return (
          <li key={p.id} className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onJump(idx)}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Phase ${idx + 1}: ${p.label}`}
              className={cn(
                "group flex items-center gap-2 sm:gap-3 rounded-sm transition-colors px-1 py-1",
                isCurrent ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "relative inline-flex size-2.5 items-center justify-center rounded-full transition-colors",
                  isCurrent && "bg-[var(--color-accent)]",
                  isDone && "bg-[var(--color-ink)]",
                  !isCurrent && !isDone && "bg-[var(--color-line-strong)]",
                  playing &&
                    isCurrent &&
                    "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-card)]",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.18em]",
                  isCurrent
                    ? "text-ink"
                    : "text-ink-muted group-hover:text-ink",
                )}
              >
                <span className="hidden sm:inline">
                  {String(idx + 1).padStart(2, "0")} ·{" "}
                </span>
                {p.label}
              </span>
            </button>
            {idx < PHASES.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "hidden sm:inline-block h-px w-6 sm:w-10 transition-colors",
                  idx < current
                    ? "bg-[var(--color-ink)]"
                    : "bg-[var(--color-line-strong)]",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StatePill({ state }: { state: Deliverable["state"] }) {
  const cls =
    state === "Approved" || state === "Shipped"
      ? "text-[var(--color-accent)]"
      : state === "In review"
        ? "text-ink"
        : "text-ink-muted";
  return (
    <span
      className={cn(
        "shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 border border-[var(--color-line)] rounded-sm",
        cls,
      )}
    >
      {state}
    </span>
  );
}

function EngagementWalkthrough() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const phase = PHASES[active];
  const PhaseIcon = phase.Icon;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setActive((cur) => {
        if (cur >= PHASES.length - 1) {
          setPlaying(false);
          setDone(true);
          return cur;
        }
        return cur + 1;
      });
    }, PHASE_DURATION_MS);
  }, [clearTimer]);

  useEffect(() => {
    if (playing) {
      scheduleNext();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [playing, active, scheduleNext, clearTimer]);

  const handlePlayPause = () => {
    if (done) {
      setActive(0);
      setDone(false);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const handleReset = () => {
    setActive(0);
    setDone(false);
    setPlaying(false);
  };

  const handleJump = (i: number) => {
    setActive(i);
    setDone(false);
  };

  return (
    <div className="card-surface overflow-hidden border border-[var(--color-line)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left — phase identity + controls */}
        <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[var(--color-line)]">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "size-12 flex items-center justify-center rounded-sm border border-[var(--color-line)] transition-colors",
                  playing ? "text-ink" : "text-ink-muted",
                )}
              >
                <PhaseIcon size={22} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  Phase {String(active + 1).padStart(2, "0")} of{" "}
                  {String(PHASES.length).padStart(2, "0")}
                </div>
                <div className="mt-1 font-display text-h2 font-medium text-ink leading-tight">
                  {phase.label}
                </div>
              </div>
            </div>
            <ProgressRing
              value={phase.progress}
              size={72}
              stroke={3}
              active={playing}
            />
          </div>

          <p className="mt-5 text-body text-ink leading-snug max-w-sm">
            {phase.oneLine}
          </p>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-md">
            {phase.detail}
          </p>

          {/* Live metric */}
          <div className="mt-6 inline-flex items-center gap-3 border border-[var(--color-line)] rounded-sm px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-dim">
              {phase.metric.label}
            </span>
            <span
              className={cn(
                "font-mono text-[11px] tabular-nums flex items-center gap-1.5",
                playing ? "text-ink" : "text-ink-muted",
              )}
            >
              {playing && (
                <span
                  aria-hidden
                  className="inline-block size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"
                />
              )}
              {phase.metric.value}
            </span>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayPause}
              className="btn-pill"
              aria-label={
                done
                  ? "Run the engagement again"
                  : playing
                    ? "Pause"
                    : "Run the engagement"
              }
            >
              <span className="btn-pill__icon" aria-hidden>
                {done ? (
                  <RotateCcw size={14} />
                ) : playing ? (
                  <Pause size={14} />
                ) : (
                  <Play size={14} />
                )}
              </span>
              <span className="btn-pill__label">
                {done
                  ? "Run again"
                  : playing
                    ? "Pause"
                    : "Run the engagement"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 h-12 px-4 rounded-[4px] font-mono text-[11px] uppercase tracking-[0.16em] border hairline text-ink-muted hover-accent-invert"
              aria-label="Reset to first phase"
            >
              <RotateCcw size={12} aria-hidden />
              Reset
            </button>
          </div>
        </div>

        {/* Right — stepper + deliverables */}
        <div className="lg:col-span-7 p-6 md:p-8">
          <Stepper current={active} onJump={handleJump} playing={playing} />

          <div className="mt-8 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              Work queue · {phase.deliverables.length} items
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hidden sm:block">
              {done
                ? "Engagement complete"
                : playing
                  ? "running"
                  : "ready"}
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {phase.deliverables.map((d) => (
              <li
                key={d.id}
                onMouseEnter={() => setHoveredId(d.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-sm border border-[var(--color-line)] px-3 py-2.5 transition-colors",
                  hoveredId === d.id &&
                    "bg-[var(--color-surface)] border-[var(--color-ink-muted)]",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Check
                    size={14}
                    aria-hidden
                    className={cn(
                      "shrink-0",
                      d.state === "Approved" || d.state === "Shipped"
                        ? "text-[var(--color-accent)]"
                        : "text-ink-dim",
                    )}
                  />
                  <span className="text-sm text-ink truncate">
                    {d.title}
                  </span>
                </div>
                <StatePill state={d.state} />
              </li>
            ))}
          </ul>

          {done && (
            <div className="mt-6 rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-surface)] p-4 flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 inline-block size-2 rounded-full bg-[var(--color-accent)]"
              />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Engagement closed
                </div>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                  The four-week engagement is complete. The team owns the
                  work, the runbook is in the wiki, and the FDE is reachable
                  for the two-week follow-up window. Hit{" "}
                  <span className="text-ink">Run again</span> to walk through
                  it from the top.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- Capability grid -----

type CapCard = {
  Icon: ComponentType<IconProps>;
  title: string;
  body: string;
};

const PEOPLE_CAPS: CapCard[] = [
  {
    Icon: Briefcase,
    title: "Senior engineers, on-site",
    body: "Every engagement is staffed with named senior engineers — the same people on the call are the people doing the work. No pyramid, no subcontractors.",
  },
  {
    Icon: Target,
    title: "Diagnosis before code",
    body: "The FDE shadows the team for a sprint, writes a one-page diagnosis, and only then opens a PR. The bottleneck is the unit of work — not the feature.",
  },
  {
    Icon: Shield,
    title: "Code review & handoff",
    body: "Every PR is reviewed by your team. The engagement ends when your team can run the work end-to-end without the FDE. Runbook, training, signoff.",
  },
  {
    Icon: Sparkles,
    title: "Quietly opinionated",
    body: "We have strong views on the modern stack, the right amount of AI, and the right amount of process. We bring them — and we change them when your team pushes back.",
  },
];

const STACK_CAPS: CapCard[] = [
  {
    Icon: Layers,
    title: "Modern web & APIs",
    body: "TypeScript end-to-end, Next.js, Go, Python. Postgres, Redis, queues, search. The boring stack that ships, on the platforms your team already uses.",
  },
  {
    Icon: Database,
    title: "Data plumbing",
    body: "Merge three legacy sources into one queryable warehouse. Fix the schema. Ship the migration. Hand off the runbook so the next schema change is yours.",
  },
  {
    Icon: Cpu,
    title: "AI where it actually helps",
    body: "Embeddings for search, LLMs for triage, agents for the queue. We bring the configuration, the guardrails, the audit log — and we hand them off.",
  },
  {
    Icon: Network,
    title: "Internal tools that ship",
    body: "The lightweight admin tool the team actually needs but never had time to build. Live in two weeks, in your repo, behind your auth, with a maintainable shape.",
  },
];

function CapabilityCard({ c }: { c: CapCard }) {
  return (
    <div className="group flex flex-col items-start text-left h-full min-h-[260px] p-6 md:p-7 transition-colors hover:bg-[var(--color-surface)]">
      <div
        className="mb-5 text-ink-muted group-hover:text-ink transition-colors"
        aria-hidden
      >
        <c.Icon size={40} />
      </div>
      <h3 className="font-display text-h3 font-medium text-ink leading-snug">
        {c.title}
      </h3>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">
        {c.body}
      </p>
    </div>
  );
}

function CapabilityGrid() {
  return (
    <div className="mt-20 md:mt-28">
      <div className="max-w-3xl">
        <Eyebrow>What we bring</Eyebrow>
        <DisplayHeading
          as="h2"
          size="section"
          className="mt-6 leading-[0.96] tracking-[-0.035em]"
        >
          How a forward-deployed engagement{" "}
          <span className="text-ink-muted">actually delivers.</span>
        </DisplayHeading>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12">
        {/* People column */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Our people
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {PEOPLE_CAPS.map((c) => (
              <CapabilityCard key={c.title} c={c} />
            ))}
          </div>
        </div>

        {/* Stack column */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Our stack
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {STACK_CAPS.map((c) => (
              <CapabilityCard key={c.title} c={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveDemo() {
  return (
    <section
      id="demo"
      aria-label="What an FDE engagement looks like"
      className="relative py-[100px] md:py-[140px]"
    >
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow>Engagement walkthrough</Eyebrow>
          <DisplayHeading
            as="h2"
            size="section"
            className="mt-6 leading-[0.96] tracking-[-0.035em]"
          >
            How a forward-deployed engagement{" "}
            <span className="text-ink-muted">actually runs.</span>
          </DisplayHeading>
          <p className="mt-6 text-body text-ink-muted leading-relaxed max-w-xl">
            Six phases, one card. Hit play and walk through the engagement as
            it would actually run — diagnose, embed, ship, hand off, follow up,
            and re-engage on the next bottleneck.
          </p>
        </div>

        <div className="mt-10">
          <EngagementWalkthrough />
        </div>

        <CapabilityGrid />
      </Container>
    </section>
  );
}
