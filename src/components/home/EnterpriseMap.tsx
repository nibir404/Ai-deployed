"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * EnterpriseMap — interactive deployment capability map.
 *
 * Concept:
 *   The firm deploys AI across eight interlocking disciplines. We
 *   show them as a 4×2 grid of rounded-square "modules" connected
 *   by hairline edges to a central rounded-square "ENGINE" hub.
 *   This replaces the older radial-circle diagram with a tighter,
 *   semirounded, more context-relevant map that actually matches
 *   the rest of the site (rounded-4px cards, hairline rules,
 *   tabular mono labels).
 *
 * Interactivity:
 *   - Hover a module: it brightens (ink stroke), its two edges
 *     light up, the other modules dim, and the central ENGINE
 *     tile swaps its readout to the hovered module's description
 *     + metric.
 *   - Click a module: it becomes "active" and locks the readout
 *     in place. Click again, or click empty space, to release.
 *   - The "data flow" pulse animates continuously along every
 *     edge, with a stronger pulse along the edges of the
 *     currently hovered/active module.
 *   - Full keyboard support: each module is a real <button>,
 *     focusable, activatable with Enter/Space. Focus uses the
 *     same hover styling.
 *   - Honors `prefers-reduced-motion`: skips the pulse and the
 *     entry timeline, keeps hover/click state.
 */

type Mod = {
  id: string;
  code: string;
  label: string;
  desc: string;
  metric: string;
  metricLabel: string;
  /** x, y in 0..1000 viewBox space */
  x: number;
  y: number;
  /** Index into EDGES for the two edges that connect this module
   *  to the central engine — one for "in", one for "out". */
  edgeIn: number;
  edgeOut: number;
};

const VIEW_W = 1000;
const VIEW_H = 600;

/* 4 cols × 2 rows of modules around a centered engine tile.
   Coordinates are tuned so each module is ~140px square and the
   engine tile is 220px square. The grid is symmetric, so on any
   aspect ratio the modules sit cleanly within the viewBox. */
const COLS = 4;
const ROWS = 2;
const COL_GAP = 200;
const ROW_GAP = 200;
const MOD_W = 160;
const MOD_H = 100;
const GRID_W = (COLS - 1) * COL_GAP + MOD_W;
const GRID_H = (ROWS - 1) * ROW_GAP + MOD_H;
const ORIGIN_X = (VIEW_W - GRID_W) / 2;
const ORIGIN_Y = (VIEW_H - GRID_H) / 2;
const ENGINE_W = 240;
const ENGINE_H = 240;
const ENGINE_X = (VIEW_W - ENGINE_W) / 2;
const ENGINE_Y = (VIEW_H - ENGINE_H) / 2;

const MODULES: Mod[] = [
  {
    id: "strategy",
    code: "M01",
    label: "Strategy",
    desc: "Frameworks for sequencing AI initiatives. Outcome-defined, time-bound, tied to operational reality.",
    metric: "30 / 60 / 90",
    metricLabel: "day milestones",
    x: 0, y: 0, edgeIn: 0, edgeOut: 8,
  },
  {
    id: "architecture",
    code: "M02",
    label: "Architecture",
    desc: "Translates strategy into an executable plan: AI systems, integration, governance, rollout.",
    metric: "1 → N",
    metricLabel: "target state",
    x: 1, y: 0, edgeIn: 1, edgeOut: 9,
  },
  {
    id: "deployment",
    code: "M03",
    label: "Deployment",
    desc: "Engineers deploy and integrate solutions in production — applications, data, operations.",
    metric: "6–18 mo",
    metricLabel: "avg. engagement",
    x: 2, y: 0, edgeIn: 2, edgeOut: 10,
  },
  {
    id: "integration",
    code: "M04",
    label: "Integration",
    desc: "Connects existing systems — applications, data, processes — into one operational fabric.",
    metric: "API · event",
    metricLabel: "contract patterns",
    x: 3, y: 0, edgeIn: 3, edgeOut: 11,
  },
  {
    id: "data",
    code: "M05",
    label: "Data",
    desc: "Pipelines, products, and the systems that feed AI. Warehouses, lakes, and the layers between.",
    metric: "T+0",
    metricLabel: "decision latency",
    x: 0, y: 1, edgeIn: 4, edgeOut: 12,
  },
  {
    id: "governance",
    code: "M06",
    label: "Governance",
    desc: "Risk, compliance, observability, and accountability for AI in production environments.",
    metric: "100%",
    metricLabel: "audit coverage",
    x: 1, y: 1, edgeIn: 5, edgeOut: 13,
  },
  {
    id: "operations",
    code: "M07",
    label: "Operations",
    desc: "Operate, monitor, and continuously improve deployed systems with structured service delivery.",
    metric: "24 / 7",
    metricLabel: "operational SLA",
    x: 2, y: 1, edgeIn: 6, edgeOut: 14,
  },
  {
    id: "optimization",
    code: "M08",
    label: "Optimization",
    desc: "Iterate based on feedback, expand adoption, optimize performance as needs grow.",
    metric: "47+",
    metricLabel: "deployments benchmarked",
    x: 3, y: 1, edgeIn: 7, edgeOut: 15,
  },
];

/* Edges. Each module has two: one "in" (drawn from the module to
   the engine) and one "out" (drawn from the engine back to the
   module). The animation can independently draw the dash for
   each. */
type Edge = { from: [number, number]; to: [number, number] };

const ENGINE_CX = ENGINE_X + ENGINE_W / 2;
const ENGINE_CY = ENGINE_Y + ENGINE_H / 2;

function moduleCenter(m: Mod): [number, number] {
  return [
    ORIGIN_X + m.x * COL_GAP + MOD_W / 2,
    ORIGIN_Y + m.y * ROW_GAP + MOD_H / 2,
  ];
}

const EDGES: Edge[] = MODULES.flatMap((m) => {
  const [mx, my] = moduleCenter(m);
  // "in" edge: module → engine (drawn from module toward engine)
  // "out" edge: engine → module (drawn from engine back to module)
  return [
    { from: [mx, my], to: [ENGINE_CX, ENGINE_CY] },
    { from: [ENGINE_CX, ENGINE_CY], to: [mx, my] },
  ];
});

export function EnterpriseMap() {
  const { ref, ready } = useGsapContext((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    /* Mount-time entry: stroke-dash reveal on the rounded module
       outlines, then a quick opacity reveal on labels and the
       engine ring. */
    tl.from(".em-module", {
      opacity: 0,
      y: 8,
      duration: 0.7,
      stagger: 0.05,
    })
      .from(
        ".em-engine",
        { opacity: 0, scale: 0.96, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      )
      .from(
        ".em-label",
        { opacity: 0, duration: 0.5, stagger: 0.02 },
        "-=0.7",
      );
  });

  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const focusId = active ?? hovered;
  const focusModule = useMemo(
    () => MODULES.find((m) => m.id === focusId) ?? null,
    [focusId],
  );

  // Stable IDs for accessibility (so each module's <text> can be
  // described by its button via aria-describedby).
  const titleId = useId();
  const descId = useId();

  // Continuous "data flow" pulse along the edges. We use a
  // single GSAP tween that animates `stroke-dashoffset` from
  // 0 to -DASH_PERIOD on every edge. The edges that belong to
  // the currently-focused module get a faster tween applied
  // independently. Reduced-motion skips the tween entirely.
  useEffect(() => {
    if (!ready || !svgRef.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const all = svgRef.current?.querySelectorAll(".em-edge");
      if (!all) return;
      const focused = svgRef.current?.querySelectorAll(".em-edge-focus");
      // Ambient: 8s per cycle, linear.
      const ambient = gsap.to(all, {
        strokeDashoffset: "-=24",
        duration: 1.2,
        ease: "none",
        repeat: -1,
      });
      // Focused: 0.6s per cycle, linear, faster visual cue.
      const focusedTween = focused
        ? gsap.to(focused, {
            strokeDashoffset: "-=24",
            duration: 0.5,
            ease: "none",
            repeat: -1,
          })
        : null;
      cleanup = () => {
        ambient.kill();
        focusedTween?.kill();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [ready, focusId]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] md:aspect-[16/9]"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full text-ink"
        role="img"
        aria-label="Deployment capability map: eight interlocking disciplines — strategy, architecture, deployment, integration, data, governance, operations, optimization — coordinated through a central deployment engine."
      >
        <defs>
          {/* Editorial grid pattern in the background. */}
          <pattern
            id="em-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.06"
            />
          </pattern>
          {/* Edge stroke-dash pattern: long-dash / gap, used as
             the per-edge dasharray. The pulse is driven by
             animating stroke-dashoffset on the .em-edge paths. */}
        </defs>

        <rect width={VIEW_W} height={VIEW_H} fill="url(#em-grid)" />

        {/* Edges — drawn before modules so the modules sit on top. */}
        <g aria-hidden>
          {EDGES.map((e, i) => {
            const isFocused =
              focusModule != null &&
              (focusModule.edgeIn === i || focusModule.edgeOut === i);
            return (
              <line
                key={i}
                x1={e.from[0]}
                y1={e.from[1]}
                x2={e.to[0]}
                y2={e.to[1]}
                stroke="currentColor"
                strokeWidth={isFocused ? 1.2 : 0.6}
                strokeOpacity={focusModule
                  ? isFocused
                    ? 0.9
                    : 0.18
                  : 0.5}
                strokeDasharray="4 6"
                className={cn(
                  "em-edge",
                  isFocused && "em-edge-focus",
                )}
                style={{
                  transition:
                    "stroke-opacity 220ms ease, stroke-width 220ms ease",
                }}
              />
            );
          })}
        </g>

        {/* Central engine tile. Sits behind the modules in DOM
             order so the modules' outlines overlap it cleanly. */}
        <g
          className="em-engine"
          transform={`translate(${ENGINE_X} ${ENGINE_Y})`}
        >
          <rect
            width={ENGINE_W}
            height={ENGINE_H}
            rx={6}
            fill="var(--color-card)"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth={1}
          />
          {/* Inner hairline frame — a thin "screen" of the same
              engine, like a viewfinder. */}
          <rect
            x={6}
            y={6}
            width={ENGINE_W - 12}
            height={ENGINE_H - 12}
            rx={3}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth={0.6}
          />
          {/* Top label — the tile's role. */}
          <text
            x={ENGINE_W / 2}
            y={28}
            textAnchor="middle"
            className="em-label font-mono"
            fontSize="9"
            letterSpacing="2"
            fill="currentColor"
            opacity={0.55}
          >
            ENGINE
          </text>
          <text
            x={ENGINE_W / 2}
            y={44}
            textAnchor="middle"
            className="em-label font-mono"
            fontSize="9"
            letterSpacing="2"
            fill="currentColor"
            opacity={0.55}
          >
            · live ·
          </text>

          {/* Centre readout — swaps between the default engine
              summary and the focused module's description. The
              "focused" state animates in via opacity. */}
          {focusModule ? (
            <g>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 - 38}
                textAnchor="middle"
                className="em-label font-mono"
                fontSize="8"
                letterSpacing="2"
                fill="currentColor"
                opacity={0.55}
              >
                {focusModule.code} · {focusModule.label.toUpperCase()}
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 - 12}
                textAnchor="middle"
                className="em-label font-display"
                fontSize="22"
                letterSpacing="0"
                fill="currentColor"
              >
                {focusModule.metric}
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 + 6}
                textAnchor="middle"
                className="em-label font-mono"
                fontSize="8"
                letterSpacing="2"
                fill="currentColor"
                opacity={0.55}
              >
                {focusModule.metricLabel}
              </text>
              {/* Description, wrapped manually into 3 lines. */}
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 + 36}
                textAnchor="middle"
                className="em-label font-body"
                fontSize="9"
                fill="currentColor"
                opacity={0.7}
              >
                {wrapText(focusModule.desc, 36).map((line, idx) => (
                  <tspan
                    key={idx}
                    x={ENGINE_W / 2}
                    dy={idx === 0 ? 0 : 12}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ) : (
            <g>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 - 28}
                textAnchor="middle"
                className="em-label font-display"
                fontSize="14"
                letterSpacing="2"
                fill="currentColor"
              >
                DEPLOYMENT
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 - 8}
                textAnchor="middle"
                className="em-label font-display"
                fontSize="14"
                letterSpacing="2"
                fill="currentColor"
              >
                ENGINE
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 + 18}
                textAnchor="middle"
                className="em-label font-mono"
                fontSize="8"
                letterSpacing="2"
                fill="currentColor"
                opacity={0.55}
              >
                8 NODES · LIVE
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 + 48}
                textAnchor="middle"
                className="em-label font-mono"
                fontSize="8"
                letterSpacing="1.6"
                fill="currentColor"
                opacity={0.4}
              >
                HOVER OR CLICK A MODULE
              </text>
              <text
                x={ENGINE_W / 2}
                y={ENGINE_H / 2 + 62}
                textAnchor="middle"
                className="em-label font-mono"
                fontSize="8"
                letterSpacing="1.6"
                fill="currentColor"
                opacity={0.4}
              >
                TO INSPECT
              </text>
            </g>
          )}
        </g>

        {/* Modules — 8 rounded-square tiles in a 4×2 grid. */}
        <g>
          {MODULES.map((m) => {
            const [cx, cy] = moduleCenter(m);
            const isFocus = focusModule?.id === m.id;
            const isDim = focusModule != null && !isFocus;
            return (
              <g
                key={m.id}
                className="em-module"
                transform={`translate(${cx - MOD_W / 2} ${cy - MOD_H / 2})`}
                style={{
                  opacity: isDim ? 0.45 : 1,
                  transition: "opacity 220ms ease",
                }}
              >
                {/* The actual interactive surface. A real <button>
                    via <foreignObject> would be ideal but the
                    foreign-object can clash with the SVG's text
                    engine. We use a transparent <rect> with
                    role="button" + keyboard handlers for an
                    accessible interactive surface. */}
                <rect
                  width={MOD_W}
                  height={MOD_H}
                  rx={6}
                  fill="var(--color-card)"
                  stroke="currentColor"
                  strokeOpacity={isFocus ? 0.9 : 0.35}
                  strokeWidth={isFocus ? 1.4 : 0.8}
                  style={{
                    transition:
                      "stroke-opacity 220ms ease, stroke-width 220ms ease",
                  }}
                />
                {/* Inner hairline. */}
                <rect
                  x={4}
                  y={4}
                  width={MOD_W - 8}
                  height={MOD_H - 8}
                  rx={3}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={isFocus ? 0.4 : 0.15}
                  strokeWidth={0.6}
                />
                {/* Module code (top-left). */}
                <text
                  x={14}
                  y={22}
                  className="em-label font-mono"
                  fontSize="8"
                  letterSpacing="1.6"
                  fill="currentColor"
                  opacity={isFocus ? 0.9 : 0.55}
                >
                  {m.code}
                </text>
                {/* Module label (centered). */}
                <text
                  x={MOD_W / 2}
                  y={MOD_H / 2 + 12}
                  textAnchor="middle"
                  className="em-label font-display"
                  fontSize="15"
                  letterSpacing="0.04"
                  fill="currentColor"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </text>
                {/* Module metric (bottom). */}
                <text
                  x={MOD_W / 2}
                  y={MOD_H - 14}
                  textAnchor="middle"
                  className="em-label font-mono"
                  fontSize="8"
                  letterSpacing="1.4"
                  fill="currentColor"
                  opacity={isFocus ? 0.9 : 0.4}
                >
                  {m.metric}
                </text>
                {/* Interactive hit area — sits on top of the visual
                    elements so it captures pointer events. We use a
                    plain <rect> with role="button" so screen readers
                    can announce the module, and the visual elements
                    below remain pure SVG. */}
                <rect
                  width={MOD_W}
                  height={MOD_H}
                  rx={6}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === m.id}
                  aria-label={`${m.label} — ${m.desc}`}
                  onMouseEnter={() => setHovered(m.id)}
                  onMouseLeave={() =>
                    setHovered((prev) => (prev === m.id ? null : prev))
                  }
                  onFocus={() => setHovered(m.id)}
                  onBlur={() =>
                    setHovered((prev) => (prev === m.id ? null : prev))
                  }
                  onClick={() =>
                    setActive((prev) => (prev === m.id ? null : m.id))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive((prev) =>
                        prev === m.id ? null : m.id,
                      );
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
                {/* Focus ring — drawn on top of the hit area. */}
                {(hovered === m.id || active === m.id) && (
                  <rect
                    width={MOD_W}
                    height={MOD_H}
                    rx={6}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={1.4}
                    style={{ pointerEvents: "none" }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Hidden description nodes for screen readers. Each module's
           hit area references its label, but we also expose the
           full prose description so AT users get the same content
           as the centre readout. */}
      <div hidden>
        {MODULES.map((m) => (
          <div key={m.id} id={`${descId}-${m.id}`}>
            {m.desc} — {m.metric} {m.metricLabel}
          </div>
        ))}
        <div id={titleId}>Deployment capability map</div>
      </div>
    </div>
  );
}

/**
 * Word-wrap a short string into lines of `maxChars` characters
 * (with whitespace preference). Used by the engine tile to break
 * descriptions into a tidy 3-line block.
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (!current) {
      current = w;
      continue;
    }
    if ((current + " " + w).length <= maxChars) {
      current = current + " " + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}
