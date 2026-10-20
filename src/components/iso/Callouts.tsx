"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export type CalloutIcon = "sandbox" | "runtime" | "shield" | "server" | "gateway" | "infra" | "data" | "block" | "boundary";

/**
 * variant: "default" (surface chip), or a filled chip that matches the art:
 * "blue" (e.g. YOUR DATA), "red" (EGRESS BLOCKED), "black" (YOUR BOUNDARY).
 * The active callout is always drawn blue.
 */
export type Callout = {
  /** links the label to an <IsoModule id> */
  id: string;
  label: string;
  side: "l" | "r";
  /** label top in art px (in the artWidth × artHeight frame) */
  top: number;
  /** label inset from its side in art px (default 48 left / 30 right) */
  inset?: number;
  /** world-space point the leader line points at (before the scene tilt) */
  anchor: [number, number, number];
  /** optional name of a scene object: the anchor is then in that object's local space, so the line follows it */
  follow?: string;
  tip?: string;
  icon?: CalloutIcon | React.ReactNode;
  variant?: "default" | "blue" | "red" | "black";
};

export type LineRef = { path: SVGPathElement | null; dot: SVGRectElement | null; label: HTMLDivElement | null };

const VARIANT: Record<NonNullable<Callout["variant"]>, { bg: string; border: string; fg: string }> = {
  default: { bg: "var(--c-surface)", border: "var(--c-border)", fg: "var(--c-text)" },
  blue: { bg: "#3B43D6", border: "#3B43D6", fg: "#FFFFFF" },
  red: { bg: "#D9534F", border: "#D9534F", fg: "#FFFFFF" },
  // Ink chip: near-black in light mode, flips to light ink in dark mode so it stays readable.
  black: { bg: "var(--c-text)", border: "var(--c-text)", fg: "var(--c-bg)" },
};
const ACTIVE = VARIANT.blue;

export function CalloutGlyph({ icon, color }: { icon?: Callout["icon"]; color: string }) {
  if (icon && typeof icon !== "string") return <>{icon}</>;
  const p = { fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "square" as const };
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden>
      {icon === "sandbox" && (<><rect x="3" y="3" width="18" height="18" {...p} /><path d="M3 9h18M9 21V9" {...p} /></>)}
      {icon === "runtime" && (<><rect x="5" y="5" width="14" height="14" {...p} /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" {...p} /></>)}
      {icon === "shield" && <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" {...p} />}
      {icon === "server" && (<><rect x="3" y="4" width="18" height="6" {...p} /><rect x="3" y="14" width="18" height="6" {...p} /><path d="M7 7h1M7 17h1" {...p} /></>)}
      {icon === "gateway" && <path d="M4 12h6M14 12h6M10 8v8M14 8v8" {...p} />}
      {icon === "infra" && <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" {...p} />}
      {icon === "data" && (<><ellipse cx="12" cy="5" rx="8" ry="3" {...p} /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" {...p} /></>)}
      {icon === "block" && (<><circle cx="12" cy="12" r="9" {...p} /><path d="M6 6l12 12" {...p} /></>)}
      {icon === "boundary" && <path d="M3 3h18v18H3zM3 9h4M17 9h4M3 15h4M17 15h4" {...p} />}
    </svg>
  );
}

export function CalloutChip({ c, active, onHover, compact, showTip }: { c: Callout; active: boolean; onHover: (id: string | null) => void; compact?: boolean; showTip?: boolean }) {
  const v = active ? ACTIVE : VARIANT[c.variant ?? "default"];
  return (
    <div
      onMouseEnter={() => onHover(c.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(c.id)}
      style={{
        alignItems: "center",
        backgroundColor: v.bg,
        border: `1px solid ${v.border}`,
        boxSizing: "border-box",
        color: v.fg,
        cursor: "default",
        display: "flex",
        gap: 8,
        minHeight: compact ? 44 : undefined,
        paddingBlock: 7,
        paddingInline: 10,
        position: "relative",
        transition: "background-color .3s, border-color .3s, color .3s",
      }}
    >
      <CalloutGlyph icon={c.icon} color={v.fg} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", lineHeight: "14px", whiteSpace: compact ? "normal" : "nowrap" }}>{c.label}</span>
      {showTip && c.tip && (
        <div
          style={{
            background: "var(--c-band)",
            color: "var(--c-band-text)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            lineHeight: "15px",
            opacity: active ? 1 : 0,
            padding: "8px 10px",
            pointerEvents: "none",
            position: "absolute",
            top: "calc(100% + 6px)",
            [c.side === "l" ? "left" : "right"]: 0,
            transform: active ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity .25s, transform .25s",
            width: 220,
            zIndex: 3,
          }}
        >
          {c.tip}
        </div>
      )}
    </div>
  );
}

/** DOM overlay: labels + leader lines. Line geometry is written each frame by <CalloutProjector>. */
export function Callouts({ callouts, active, shown, onHover, lines, artWidth, artHeight }: { callouts: Callout[]; active: string | null; shown: boolean; onHover: (id: string | null) => void; lines: React.MutableRefObject<LineRef[]>; artWidth: number; artHeight: number }) {
  return (
    <>
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
        {callouts.map((c, i) => {
          const on = active === c.id;
          const col = on ? "#3B43D6" : "var(--c-text)";
          return (
            <g key={c.id}>
              <path
                ref={(el) => {
                  if (lines.current[i]) lines.current[i].path = el;
                }}
                pathLength={1}
                fill="none"
                stroke={col}
                strokeWidth={on ? 2 : 1.5}
                strokeDasharray="1 1"
                strokeDashoffset={shown ? 0 : 1}
                style={{ transition: `stroke-dashoffset .8s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.08}s, stroke .3s` }}
              />
              <rect
                ref={(el) => {
                  if (lines.current[i]) lines.current[i].dot = el;
                }}
                width={8}
                height={8}
                fill={col}
                style={{ opacity: shown ? 1 : 0, transition: `opacity .3s ${0.6 + i * 0.08}s` }}
              />
            </g>
          );
        })}
      </svg>
      {callouts.map((c, i) => (
        <div
          key={c.id}
          ref={(el) => {
            if (lines.current[i]) lines.current[i].label = el;
          }}
          style={{
            position: "absolute",
            top: `${(c.top / artHeight) * 100}%`,
            ...(c.side === "l" ? { left: `${((c.inset ?? 48) / artWidth) * 100}%` } : { right: `${((c.inset ?? 30) / artWidth) * 100}%` }),
            opacity: shown ? 1 : 0,
            transform: shown ? "translateX(0)" : `translateX(${c.side === "l" ? -16 : 16}px)`,
            transition: `opacity .5s ${i * 0.08}s, transform .6s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s`,
            zIndex: active === c.id ? 3 : 2,
          }}
        >
          <CalloutChip c={c} active={active === c.id} onHover={onHover} showTip />
        </div>
      ))}
    </>
  );
}

/** In-canvas: projects each callout anchor through the (tilting) scene and redraws its leader line. */
export function CalloutProjector({ callouts, lines, rootName = "iso-root" }: { callouts: Callout[]; lines: React.MutableRefObject<LineRef[]>; rootName?: string }) {
  const { camera, size, scene } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const root = scene.getObjectByName(rootName);
    if (!root) return;
    root.updateMatrixWorld();
    callouts.forEach((c, i) => {
      const l = lines.current[i];
      if (!l?.path || !l.label) return;
      const obj = c.follow ? root.getObjectByName(c.follow) : undefined;
      if (obj) obj.updateWorldMatrix(true, false);
      v.set(...c.anchor).applyMatrix4((obj ?? root).matrixWorld).project(camera);
      const ax = ((v.x + 1) / 2) * size.width;
      const ay = ((1 - v.y) / 2) * size.height;
      const lb = l.label;
      const ly = lb.offsetTop + lb.offsetHeight / 2;
      const lx = c.side === "l" ? lb.offsetLeft + lb.offsetWidth : lb.offsetLeft;
      const dir = c.side === "l" ? 1 : -1;
      const ex = ax - dir * Math.min(Math.abs(ay - ly) * 0.6, 60);
      const elbow = dir * (ex - lx) > 10 ? ex : lx + dir * 10;
      l.path.setAttribute("d", `M${lx.toFixed(1)} ${ly.toFixed(1)} H${elbow.toFixed(1)} L${ax.toFixed(1)} ${ay.toFixed(1)}`);
      l.dot?.setAttribute("x", (ax - 4).toFixed(1));
      l.dot?.setAttribute("y", (ay - 4).toFixed(1));
    });
  });
  return null;
}
