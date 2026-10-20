"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Tilt } from "@/components/motion/Tilt";
import { mono, sans, bgImg } from "./styles";
import css from "./HowItWorks.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROW_BORDER = { borderBottomColor: "var(--c-line)", borderBottomStyle: "solid", borderBottomWidth: "1px" } as const;
const PANEL = { backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box" } as const;

type StepMeta = { label: string; color: string; tint: string; title: string; body: string; img: string };

const STEPS: StepMeta[] = [
  {
    label: "STEP 01 · WEEK 1",
    color: "#B8781A",
    tint: "#F5A5241A",
    title: "Discovery",
    body: "We learn the work, your systems and your governance requirements. The engineer shadows your team and writes a one-page diagnosis before any code.",
    img: "/assets/602MZBP57STBQGG7C68DYA2YGQ.svg",
  },
  {
    label: "STEP 02 · WEEK 2–3",
    color: "#7B3FE0",
    tint: "#7C3AED14",
    title: "Architect and build",
    body: "We design the agent (goal, tools, guardrails, approval mode) and build it against your systems. Nothing is built until you sign off.",
    img: "/assets/4HNBKVHFF6TD21KWJF432GXEZC.svg",
  },
  {
    label: "STEP 03 · WEEK 3–4",
    color: "#0284C7",
    tint: "#0284C714",
    title: "Review",
    body: "Your team reviews the drafts. We tune the configuration from what your team edits. Every change ships through your repos and your approval.",
    img: "/assets/2P0PT17GGH41ZHXKEW7FNDJA37.svg",
  },
  {
    label: "STEP 04 · ONGOING",
    color: "#059669",
    tint: "#05966914",
    title: "Run and improve",
    body: "We operate the agent, tune the model, and update the policy as your business changes. When it is steady, we hand it to a named owner on your team.",
    img: "/assets/3VVKESC3WGY6N17X7N1V3GHTB2.svg",
  },
];

function StepText({ s, active, i }: { s: StepMeta; active: boolean; i: number }) {
  // the borderColor of step 02 icon is #7C3AED in the design
  const border = i === 1 ? "#7C3AED" : s.color === "#B8781A" ? "#E8A23A" : s.color;
  return (
    <div
      data-step-text
      className={css.stepText}
      style={{ opacity: active ? 1 : 0.38 }}
    >
      <Tilt max={10} style={{ width: "128px", height: "128px", flexShrink: 0 }}>
        <div
          data-step-icon
          style={{ alignItems: "center", backgroundColor: s.tint, borderColor: border, borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box", display: "flex", height: "128px", justifyContent: "center", width: "128px" }}
        >
          <div className={css.float} style={bgImg(s.img, 112, 112)} />
        </div>
      </Tilt>
      <div style={mono(11, 14, s.color, { letterSpacing: "0.06em" })}>{s.label}</div>
      <div className={css.stepTitle} style={sans(36, 42, "var(--c-text)", { letterSpacing: "-0.025em" })}>{s.title}</div>
      <div style={sans(16, 25, "var(--c-muted)")}>{s.body}</div>
    </div>
  );
}

/* ---------------- Step 01 mockup: map + work queue ---------------- */
const MAP_ROWS: [string, string][] = [
  ["SYSTEMS", "ERP, CRM, warehouse, internal tools"],
  ["DATA", "Documents, tickets, logs, databases"],
  ["WORKFLOWS", "Support, operations, finance"],
  ["PEOPLE", "Who does what, where the hours go"],
  ["RULES", "Security, compliance, data residency"],
];
type QStatus = "PENDING" | "IN REVIEW" | "APPROVED";
const Q_COLOR: Record<QStatus, string> = { PENDING: "var(--c-faint)", "IN REVIEW": "#B8781A", APPROVED: "#3E8E66" };

function Mock1({ go }: { go: boolean }) {
  const [st, setSt] = useState<QStatus[]>(["PENDING", "PENDING", "PENDING"]);
  useEffect(() => {
    if (!go) return;
    const seq: [number, number, QStatus][] = [
      [350, 2, "IN REVIEW"],
      [1100, 2, "APPROVED"],
      [1600, 0, "IN REVIEW"],
    ];
    const ids = seq.map(([t, idx, v]) => window.setTimeout(() => setSt((p) => p.map((x, j) => (j === idx ? v : x))), t));
    return () => ids.forEach(clearTimeout);
  }, [go]);
  const items = ["Diagnosis one-pager", "System map", "Engagement scope"];
  return (
    <div className={`${css.mock} ${css.mock1}`}>
      <div data-m="map" style={{ ...PANEL, display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ ...ROW_BORDER, paddingBlock: "12px", paddingInline: "16px" }}>
          <div style={mono(11, 14, "var(--c-muted)")}>WHAT WE MAP</div>
        </div>
        {MAP_ROWS.map(([k, v], i) => (
          <div key={k} data-m-row className="hover-row" style={{ ...(i < MAP_ROWS.length - 1 ? ROW_BORDER : {}), display: "flex", paddingBlock: "12px", paddingInline: "16px" }}>
            <div style={mono(11, 14, "var(--c-text)", { flexShrink: 0, width: "110px" })}>{k}</div>
            <div style={sans(14, 18, "var(--c-muted)")}>{v}</div>
          </div>
        ))}
      </div>
      <div className={css.spacer} />
      <div data-m="queue" className={css.queue} style={{ ...PANEL, display: "flex", flexDirection: "column" }}>
        <div style={{ ...ROW_BORDER, display: "flex", justifyContent: "space-between", paddingBlock: "12px", paddingInline: "16px" }}>
          <div style={mono(11, 14, "var(--c-muted)")}>WORK QUEUE · 3</div>
          <div style={mono(11, 14, "var(--c-faint)")}>v0.3</div>
        </div>
        {items.map((t, i) => (
          <div key={t} style={{ ...(i < 2 ? ROW_BORDER : {}), display: "flex", justifyContent: "space-between", alignItems: "center", paddingBlock: "12px", paddingInline: "16px" }}>
            <div style={sans(14, 18, "var(--c-text)")}>{t}</div>
            <div key={st[i]} className={css.tick} style={mono(10, 12, Q_COLOR[st[i]])}>
              {st[i] === "APPROVED" ? "✓ " : ""}
              {st[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Step 02 mockup: architecture stack ---------------- */
const LAYERS = [
  { k: "APPS + AGENTS", v: "Copilots · agents · internal apps", bg: "var(--c-surface)", kc: "var(--c-accent)", vc: "var(--c-text)", border: true },
  { k: "AI SERVICES", v: "Model gateway · private models · evals", bg: "var(--c-accent)", kc: "#FFFFFF", vc: "#FFFFFF", border: false },
  { k: "DATA", v: "Connectors · vector store · pipelines", bg: "var(--c-surface)", kc: "var(--c-text)", vc: "var(--c-text)", border: true },
  { k: "PLATFORM", v: "Kubernetes · CI/CD · infra as code", bg: "var(--c-band)", kc: "var(--c-band-text)", vc: "var(--c-band-text)", border: false },
];
function Mock2() {
  return (
    <div className={css.mockCol} style={{ gap: "8px" }}>
      <div style={{ paddingBottom: "6px" }}>
        <div style={mono(11, 14, "var(--c-muted)")}>TARGET ARCHITECTURE · YOUR CLOUD OR ON-PREM</div>
      </div>
      <div className={css.archRow}>
        <div style={{ display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "8px" }}>
          {LAYERS.map((l) => (
            <div
              key={l.k}
              data-layer
              style={{
                backgroundColor: l.bg,
                ...(l.border ? { borderColor: "var(--c-border)", borderStyle: "solid", borderWidth: "1px" } : {}),
                boxSizing: "border-box",
                display: "flex",
                gap: "16px",
                paddingBlock: "18px",
                paddingInline: "16px",
              }}
            >
              <div style={mono(11, 14, l.kc, { flexShrink: 0, width: "130px" })}>{l.k}</div>
              <div style={sans(14, 18, l.vc)}>{l.v}</div>
            </div>
          ))}
        </div>
        <div
          data-m="security"
          className={css.security}
          style={{ backgroundColor: "#7C3AED0F", borderColor: "#7B3FE0", borderStyle: "dashed", borderWidth: "1px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "10px", padding: "16px" }}
        >
          <div style={bgImg("/assets/1JME28A1JQF34JMPRWFQF6ZM41.svg", 28, 28)} />
          <div style={mono(11, 14, "#7B3FE0")}>SECURITY + IDENTITY</div>
          <div style={sans(13, 20, "var(--c-text)")}>SSO from your IdP, role-based access, network policies, audit logging</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Step 03 mockup: kanban ---------------- */
const CARD = { borderColor: "var(--c-line)", borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box", display: "block", padding: "10px" } as const;
function Mock3() {
  const col = (border: string) =>
    ({ backgroundColor: "var(--c-surface)", borderColor: border, borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "8px", padding: "12px" }) as const;
  return (
    <div data-kanban className={css.kanban}>
      <div className={css.kcol} style={col("var(--c-border)")}>
        <div style={mono(11, 14, "var(--c-faint)")}>PLAN</div>
        <div style={CARD}><div style={sans(14, 18, "var(--c-text)")}>Invoice-matching agent</div></div>
        <div style={CARD}><div style={sans(14, 18, "var(--c-text)")}>Partner portal</div></div>
      </div>
      <div className={css.kcol} style={col("#0284C7")}>
        <div style={mono(11, 14, "#0284C7")}>BUILDING</div>
        <div style={CARD}><div style={sans(14, 18, "var(--c-text)")}>Support copilot v2</div></div>
        <div data-move="1" style={CARD}><div style={sans(14, 18, "var(--c-text)")}>CRM sync API</div></div>
      </div>
      <div className={css.kcol} style={{ backgroundColor: "#E8A23A", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "8px", padding: "12px" }}>
        <div style={{ alignItems: "center", display: "flex", gap: "6px" }}>
          <div style={bgImg("/assets/20TQV9QV0HWBBGHZEYMFT7JAKZ.svg", 16, 16)} />
          <div style={mono(11, 14, "#111")}>YOUR REVIEW</div>
        </div>
        <div data-move="2" style={{ backgroundColor: "var(--c-surface)", boxSizing: "border-box", display: "block", padding: "10px" }}>
          <div style={sans(14, 18, "var(--c-text)")}>Eval suite</div>
        </div>
        <div style={sans(13, 16, "#111")}>Nothing merges without your approval.</div>
      </div>
      <div className={css.kcol} style={col("#3E8E66")}>
        <div style={mono(11, 14, "#3E8E66")}>LIVE ✓</div>
        <div data-move="3" style={CARD}><div style={sans(14, 18, "var(--c-text)")}>Support copilot v1</div></div>
        <div data-move="3" style={CARD}><div style={sans(14, 18, "var(--c-text)")}>Ops dashboard</div></div>
      </div>
    </div>
  );
}

/* ---------------- Step 04 mockup: production + incident loop ---------------- */
const BASE_BARS = [60, 72, 66, 80, 70, 40, 76, 82, 78, 84, 88, 80];
const PIPE = [
  { t: "ALERT", on: { backgroundColor: "#E8A23A", color: "#111" } },
  { t: "TRIAGE", on: { borderColor: "#3E8E66", color: "#3E8E66" } },
  { t: "FIX", on: { backgroundColor: "#3E8E66", color: "#FFFFFF" } },
  { t: "POSTMORTEM", on: { borderColor: "#3E8E66", color: "#3E8E66" } },
  { t: "IMPROVE ↺", on: { backgroundColor: "var(--c-surface)", borderColor: "var(--c-text)", color: "var(--c-text)" } },
];
function Mock4({ go }: { go: boolean }) {
  const [bars, setBars] = useState(BASE_BARS);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!go) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLit(PIPE.length);
      return;
    }
    let n = 0;
    const pipe = window.setInterval(() => {
      n = n >= PIPE.length + 3 ? 0 : n + 1; // hold fully lit for a few ticks, then replay
      setLit(Math.min(n, PIPE.length));
    }, 650);
    const live = window.setInterval(() => {
      setBars((b) => b.map((v, i) => (i === 5 ? v : Math.max(48, Math.min(96, BASE_BARS[i] + Math.round((Math.random() - 0.5) * 16))))));
    }, 1400);
    return () => {
      clearInterval(pipe);
      clearInterval(live);
    };
  }, [go]);
  return (
    <div className={css.mockCol} style={{ gap: "12px" }}>
      <div style={{ backgroundColor: "var(--c-band)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "12px", padding: "16px" }}>
        <div className={css.prodHead}>
          <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
            <div className={css.pulse} style={{ backgroundColor: "#D6F25C", flexShrink: 0, height: "8px", width: "8px" }} />
            <div style={mono(11, 14, "#D6F25C")}>PRODUCTION · LIVE</div>
          </div>
          <div style={mono(11, 14, "var(--c-faint)")}>YOUR CLUSTER · YOUR DASHBOARDS</div>
        </div>
        <div style={{ alignItems: "end", display: "flex", flexShrink: 0, gap: "4px", height: "90px" }}>
          {bars.map((h, i) => (
            <div
              key={i}
              data-bar
              style={{
                backgroundColor: i === 5 ? "#E8A23A" : i === 11 ? "#D6F25C" : "#3E8E66",
                flexBasis: "0%",
                flexGrow: 1,
                height: `${h}%`,
                transformOrigin: "bottom",
                transition: "height 1.1s var(--ease-out)",
              }}
            />
          ))}
        </div>
      </div>
      <div className={css.pipe}>
        {PIPE.map((p, i) => {
          const on = i < lit;
          return (
            <div
              key={p.t}
              style={{
                alignItems: "center",
                backgroundColor: on && "backgroundColor" in p.on ? p.on.backgroundColor : "transparent",
                borderColor: on ? ("borderColor" in p.on ? p.on.borderColor : "transparent") : "var(--c-border)",
                borderStyle: "solid",
                borderWidth: "1px",
                boxSizing: "border-box",
                display: "flex",
                flexBasis: "0%",
                flexGrow: 1,
                height: "44px",
                justifyContent: "center",
                transform: on && i === lit - 1 ? "translateY(-2px)" : "none",
                transition: "background-color .35s var(--ease-out), border-color .35s var(--ease-out), transform .35s var(--ease-out)",
              }}
            >
              <div style={mono(11, 14, on ? p.on.color : "var(--c-faint)", { transition: "color .35s var(--ease-out)" })}>{p.t}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [go, setGo] = useState([false, false, false, false]);

  useGSAP(
    () => {
      const root = ref.current!;
      const rows = gsap.utils.toArray<HTMLElement>("[data-step-row]", root);
      const fire = (i: number) => setGo((g) => (g[i] ? g : g.map((v, j) => (j === i ? true : v))));

      const build = (row: HTMLElement, i: number) => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" }, onStart: () => fire(i) });
        tl.from(row.querySelector("[data-step-icon]"), { scale: 0.6, opacity: 0, duration: 0.9 }, 0);
        tl.from(row.querySelectorAll("[data-step-text] > :not(:first-child)"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.1);
        if (i === 0) {
          tl.from(row.querySelector('[data-m="map"]'), { y: 30, opacity: 0, duration: 0.9 }, 0.1);
          tl.from(row.querySelectorAll("[data-m-row]"), { x: -16, opacity: 0, stagger: 0.07, duration: 0.7 }, 0.3);
          tl.from(row.querySelector('[data-m="queue"]'), { y: 40, opacity: 0, duration: 0.9 }, 0.35);
        }
        if (i === 1) {
          // layers stack in bottom-up (platform first)
          const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", row).reverse();
          tl.from(layers, { y: -60, opacity: 0, stagger: 0.16, duration: 0.8, ease: "back.out(1.4)" }, 0.15);
          tl.from(row.querySelector('[data-m="security"]'), { x: 40, opacity: 0, duration: 0.9 }, 0.8);
        }
        if (i === 2) {
          const board = row.querySelector<HTMLElement>("[data-kanban]")!;
          tl.from(board.children, { y: 24, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.1);
          const wide = window.matchMedia("(min-width: 768px)").matches;
          // cards travel from earlier columns to where they live now
          row.querySelectorAll<HTMLElement>("[data-move]").forEach((card, k) => {
            const cols = Number(card.dataset.move);
            tl.from(
              card,
              wide
                ? { x: () => -cols * ((board.children[0] as HTMLElement).offsetWidth + 8), rotate: -3, duration: 1.1, ease: "power3.inOut", immediateRender: false }
                : { scale: 0.85, opacity: 0, duration: 0.6 },
              0.6 + k * 0.35,
            );
          });
        }
        if (i === 3) tl.from(row.querySelectorAll("[data-bar]"), { scaleY: 0, stagger: 0.05, duration: 0.8 }, 0.2);
        return tl;
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1100px) and (prefers-reduced-motion: no-preference)",
          small: "(max-width: 1099px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
          if (reduce) {
            setGo([true, true, true, true]);
            return;
          }
          rows.forEach((row, i) => {
            const tl = build(row, i);
            if (desktop) {
              // pin each step while its mockup sequence plays; the step text holds and advances
              ScrollTrigger.create({
                trigger: row,
                start: "center center",
                end: "+=60%",
                pin: true,
                onToggle: (self) => self.isActive && setActive(i),
              });
              ScrollTrigger.create({
                trigger: row,
                start: "top 60%",
                onEnter: () => {
                  setActive(i);
                  tl.play();
                },
                onLeaveBack: () => i > 0 && setActive(i - 1),
                once: false,
              });
            } else {
              ScrollTrigger.create({ trigger: row, start: "top 75%", once: true, onEnter: () => tl.play() });
            }
          });
          if (desktop) {
            gsap.fromTo(
              root.querySelector("[data-rail]"),
              { scaleY: 0 },
              { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top center", end: "bottom center", scrub: true } },
            );
          }
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={css.steps}>
      <div aria-hidden className={css.rail}>
        <div data-rail style={{ width: "1px", height: "100%", background: STEPS[active].color, transformOrigin: "top", transition: "background-color .5s var(--ease-out)" }} />
      </div>
      {STEPS.map((st, i) => (
        <div key={st.title} data-step-row className={css.row}>
          <StepText s={st} active={active === i} i={i} />
          {i === 0 && <Mock1 go={go[0]} />}
          {i === 1 && <Mock2 />}
          {i === 2 && <Mock3 />}
          {i === 3 && <Mock4 go={go[3]} />}
        </div>
      ))}
    </div>
  );
}
