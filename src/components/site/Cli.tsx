"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";
import { findTopic, type SiteTopic } from "@/lib/site-data";

/**
 * Cli — floating AI-style terminal panel.
 *
 * Visual language:
 *   - Mono everywhere (IBM Plex Mono via font-mono token).
 *   - Fixed bottom-right launcher pill → expands into a 420×520
 *     terminal panel with a `~ai-deployed $` prompt.
 *   - 4px radius on the launcher and panel (matches the rest of the
 *     site's button/card radius convention).
 *   - Output streams character-by-character for an "AI typing" feel,
 *     driven by requestAnimationFrame so it's frame-locked.
 *
 * Knowledge:
 *   - Backed by `lib/site-data.ts`. No network calls, no LLM, no
 *     backend — the matcher returns a topic and the panel streams
 *     its structured facts back as an editorial answer.
 *   - Unknown queries produce a polite "no match" reply that points
 *     the user to /contact.
 *
 * Persistence:
 *   - The transcript is kept in component state (resets on reload).
 *   - The open/closed state is kept in localStorage so the panel
 *     stays put across navigations.
 *
 * Accessibility:
 *   - The launcher is a button with an accessible label.
 *   - The input is a real text input (not contenteditable) so screen
 *     readers work normally.
 *   - Esc closes the panel. Click on the scrim also closes.
 *   - Honors prefers-reduced-motion (streams instantly).
 */

type Message =
  | { kind: "user"; text: string }
  | {
      kind: "assistant";
      topicId: string;
      title: string;
      body: string;
      links: { label: string; href: string }[];
    };

const SUGGESTIONS = [
  "What does AI Deployed do?",
  "How much does it cost?",
  "What industries do you serve?",
  "How long does an engagement last?",
];

const PANEL_W = 420;
const PANEL_H = 520;

export function Cli() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Restore open state from localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("cli:open");
      if (stored === "1") setOpen(true);
    } catch {}
  }, []);

  // Persist open state
  useEffect(() => {
    try {
      window.localStorage.setItem("cli:open", open ? "1" : "0");
    } catch {}
  }, [open]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      // Slight delay so the panel mount is finished.
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streamingId]);

  const streamAssistant = useCallback((topic: SiteTopic | null, userText: string) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const body = topic ? composeAnswer(topic) : composeFallback(userText);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    if (reduceMotion) {
      setMessages((prev) => [
        ...prev,
        {
          kind: "assistant",
          topicId: topic?.id ?? "fallback",
          title: topic ? topic.title : "No match",
          body,
          links: topic?.links ?? [],
        },
      ]);
      return;
    }

    // Push an empty assistant message, then stream characters in.
    setMessages((prev) => [
      ...prev,
      {
        kind: "assistant",
        topicId: topic?.id ?? "fallback",
        title: topic ? topic.title : "No match",
        body: "",
        links: topic?.links ?? [],
      },
    ]);
    setStreamingId(id);

    let i = 0;
    let raf = 0;
    const tick = () => {
      // Chunk size grows with index so the start feels deliberate
      // and the end doesn't drag — typical AI typing cadence.
      const chunkSize = i < 30 ? 2 : i < 120 ? 4 : 6;
      i = Math.min(body.length, i + chunkSize);
      const slice = body.slice(0, i);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.kind === "assistant" && last.topicId === (topic?.id ?? "fallback") && (last.body === "" || last.body.length <= i)) {
          next[next.length - 1] = { ...last, body: slice };
        }
        return next;
      });
      if (i < body.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setStreamingId(null);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const submit = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [...prev, { kind: "user", text: trimmed }]);
      setDraft("");
      const topic = findTopic(trimmed);
      streamAssistant(topic, trimmed);
    },
    [streamAssistant],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(draft);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className={cn(
          "fixed z-40 bottom-5 right-5 inline-flex items-center gap-2 px-4 py-3",
          "rounded-[4px] font-mono text-[11px] uppercase tracking-[0.16em]",
          "border hairline transition-all duration-200",
          "bg-[var(--color-card)] text-ink",
          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
          open && "opacity-0 pointer-events-none",
        )}
        style={{
          boxShadow:
            "0 8px 24px -8px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <PromptGlyph size={12} />
        <span>Ask the CLI</span>
        <span aria-hidden className="text-ink-dim">·</span>
        <span className="text-ink-muted normal-case tracking-normal">~ai-deployed</span>
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label="AI CLI assistant"
        aria-modal="false"
        className={cn(
          "fixed z-50 bottom-5 right-5",
          "rounded-[4px] overflow-hidden border hairline",
          "bg-[var(--color-card)] text-ink",
          "transition-all duration-200 origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
        style={{
          width: `min(${PANEL_W}px, calc(100vw - 2.5rem))`,
          height: `min(${PANEL_H}px, calc(100dvh - 6rem))`,
          boxShadow:
            "0 24px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b hairline">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            <span className="inline-block size-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>AI Deployed · CLI</span>
            <span className="text-ink-dim">·</span>
            <span className="text-ink-dim normal-case tracking-normal">v0.1 · offline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMessages([])}
              aria-label="Clear transcript"
              className="px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim hover:text-ink transition-colors"
            >
              clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim hover:text-ink transition-colors"
            >
              esc
            </button>
          </div>
        </div>

        {/* Scroll area */}
        <div
          ref={scrollRef}
          className="px-4 py-4 overflow-y-auto"
          style={{ height: "calc(100% - 56px - 64px)" }}
        >
          {messages.length === 0 && (
            <EmptyState
              onPick={(s) => {
                setDraft(s);
                submit(s);
              }}
            />
          )}
          {messages.map((m, i) => (
            <Bubble key={i} m={m} isStreaming={streamingId !== null && i === messages.length - 1 && m.kind === "assistant"} />
          ))}
        </div>

        {/* Input row */}
        <div className="border-t hairline px-3 py-3 flex items-center gap-2 bg-[var(--color-surface)]">
          <span aria-hidden className="font-mono text-[12px] text-[var(--color-accent)] pl-1 select-none">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="ask about services, pricing, industries…"
            aria-label="Ask the AI CLI"
            className={cn(
              "flex-1 bg-transparent outline-none border-0",
              "font-mono text-[12px] text-ink placeholder:text-ink-dim",
              "tracking-[-0.005em]",
            )}
          />
          <button
            type="button"
            onClick={() => submit(draft)}
            disabled={!draft.trim()}
            className={cn(
              "px-2.5 py-1.5 rounded-[4px] font-mono text-[10px] uppercase tracking-[0.16em]",
              "border hairline transition-colors",
              draft.trim()
                ? "text-ink border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)]"
                : "text-ink-dim cursor-not-allowed",
            )}
          >
            send
          </button>
        </div>
      </div>
    </>
  );
}

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
          session · welcome
        </p>
        <p className="mt-2 font-mono text-[12px] text-ink leading-relaxed">
          Hi — I&apos;m the AI Deployed CLI. Ask me anything about our services,
          pricing, industries, or how we work. I pull from the same content
          as the site, so my answers stay accurate.
        </p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mb-2">
          try
        </p>
        <div className="grid gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className={cn(
                "text-left px-3 py-2 rounded-[4px] border hairline",
                "font-mono text-[11px] text-ink-muted",
                "hover:text-ink hover:border-[var(--color-accent)] transition-colors",
              )}
            >
              <span className="text-[var(--color-accent)] mr-2">$</span>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({ m, isStreaming }: { m: Message; isStreaming: boolean }) {
  if (m.kind === "user") {
    return (
      <div className="mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mb-1">
          you
        </div>
        <div className="font-mono text-[12px] text-ink leading-relaxed">
          <span className="text-[var(--color-accent)] mr-2">$</span>
          {m.text}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] mb-1">
        ai · {m.title}
        {isStreaming && <BlinkingCursor />}
      </div>
      <div className="font-mono text-[12px] text-ink-muted leading-relaxed whitespace-pre-wrap">
        {m.body}
        {isStreaming && m.body.length === 0 && <BlinkingCursor />}
      </div>
      {"links" in m && m.links && m.links.length > 0 && !isStreaming && (
        <div className="mt-3 flex flex-wrap gap-2">
          {m.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[4px]",
                "font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted",
                "border hairline hover:text-ink hover:border-[var(--color-accent)]",
                "transition-colors",
              )}
            >
              <span aria-hidden>→</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function BlinkingCursor() {
  return (
    <span
      aria-hidden
      className="inline-block w-1.5 h-3 ml-1 align-middle bg-[var(--color-accent)] animate-pulse"
    />
  );
}

function PromptGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Composer — turns a matched topic into a streaming-ready answer.
// -----------------------------------------------------------------------------

function composeAnswer(topic: SiteTopic): string {
  const lines: string[] = [];
  lines.push(`> ${topic.title}`);
  lines.push("");
  lines.push(topic.summary);
  lines.push("");
  lines.push("—");
  for (const f of topic.facts) {
    lines.push(`· ${f}`);
  }
  if (topic.links && topic.links.length > 0) {
    lines.push("");
    lines.push("—");
    for (const l of topic.links) {
      lines.push(`↳ ${l.label}  ${l.href}`);
    }
  }
  lines.push("");
  lines.push("Anything else? Try: services, pricing, industries, engagement.");
  return lines.join("\n");
}

function composeFallback(query: string): string {
  return [
    `> no match`,
    ``,
    `I couldn't find a topic matching "${query}".`,
    ``,
    `Try one of these:`,
    `· "what does AI Deployed do"`,
    `· "pricing" / "how much does it cost"`,
    `· "industries" / "engagement"`,
    `· "how long does an engagement last"`,
    ``,
    `Or reach out directly:`,
    `↳ Book consultation  /contact`,
    ``,
    `Tip: keywords like "services", "pricing", "industries", "engagement", "case", "stats", "research", and "FAQ" all map to specific topics.`,
  ].join("\n");
}
