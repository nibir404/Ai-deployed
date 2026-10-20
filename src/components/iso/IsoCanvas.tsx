"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";
import { IsoContext, clamp01, useIso, type IsoState } from "./core";
import { CalloutChip, CalloutProjector, Callouts, type Callout, type LineRef } from "./Callouts";

export type IsoCanvasProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** art frame the scene was drawn in; the canvas keeps this aspect and scales with width */
  artWidth?: number;
  artHeight?: number;
  /** world unit → px at artWidth */
  pxPerUnit?: number;
  /** world point at the canvas centre */
  lookAt?: [number, number, number];
  callouts?: Callout[];
  /** index of the callout active before the auto-cycle starts */
  initialActive?: number;
  /** seconds of scene time before callouts draw in */
  introDuration?: number;
  /** auto-cycle period for the active callout (ms); 0 disables */
  cycleMs?: number;
  /** static fallback (reduced motion / no WebGL). If omitted, reduced motion renders the final static frame. */
  fallback?: React.ReactNode;
  /** pointer + scroll tilt strength (radians at the edge); 0 disables */
  tilt?: number;
  /** scene clock speed multiplier once the intro has played (e.g. 0.6 for a slow idle loop); default 1 */
  timeScale?: number;
};

/** Shared scene clock. Mounted first so every other useFrame reads this frame's time. */
function TimeKeeper({ scale = 1, after = 0 }: { scale?: number; after?: number }) {
  const { time, loop } = useIso();
  useFrame((_, dt) => {
    time.current = loop ? time.current + Math.min(dt, 0.1) * (time.current < after ? 1 : scale) : 1000;
  });
  return null;
}

function IsoCamera({ artWidth, pxPerUnit, lookAt }: { artWidth: number; pxPerUnit: number; lookAt: [number, number, number] }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    // 2:1 pixel isometric (30° elevation, 45° azimuth): +x runs right-down, +z left-down
    cam.position.set(30 + lookAt[0], 30 * Math.SQRT2 * Math.tan(Math.PI / 6) + lookAt[1], 30 + lookAt[2]);
    cam.lookAt(...lookAt);
    cam.zoom = (pxPerUnit * size.width) / artWidth;
    cam.updateProjectionMatrix();
  }, [camera, size.width, artWidth, pxPerUnit, lookAt]);
  return null;
}

function Tilt({ pointer, scroll, amount }: { pointer: React.MutableRefObject<{ x: number; y: number }>; scroll: React.MutableRefObject<number>; amount: number }) {
  const cur = useRef({ ry: 0, rx: 0, y: 0 });
  useFrame((state, dt) => {
    const g = state.scene.getObjectByName("iso-root");
    if (!g) return;
    const k = Math.min(1, dt * 3);
    const s = scroll.current;
    const tr = { ry: pointer.current.x * amount + s * amount * 1.3, rx: pointer.current.y * amount * 0.4, y: -s * 0.8 * (amount > 0 ? 1 : 0) };
    cur.current.ry += (tr.ry - cur.current.ry) * k;
    cur.current.rx += (tr.rx - cur.current.rx) * k;
    cur.current.y += (tr.y - cur.current.y) * k;
    g.rotation.set(cur.current.rx, cur.current.ry, 0);
    g.position.y = cur.current.y;
  });
  return null;
}

/**
 * Isometric R3F stage: orthographic 2:1 iso camera, flat key light, pixelated low-dpr
 * render, scene clock that only runs while on screen, pointer/scroll tilt, callouts
 * (leader lines on desktop, compact legend below 768px), reduced-motion handling.
 */
export function IsoCanvas({
  children,
  className,
  style,
  artWidth = 1278,
  artHeight = 700,
  pxPerUnit = 49,
  lookAt = [0, -0.35, 0],
  callouts = [],
  initialActive = 0,
  introDuration = 3.4,
  cycleMs = 3600,
  fallback,
  tilt = 0.06,
  timeScale = 1,
}: IsoCanvasProps) {
  const { theme } = useTheme();
  const stage = useRef<HTMLDivElement>(null);
  const [env, setEnv] = useState<{ reduced: boolean; mobile: boolean; gl: boolean } | null>(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [labelHover, setLabelHover] = useState<string | null>(null);
  const [auto, setAuto] = useState(initialActive);
  const [shown, setShown] = useState(false);
  const time = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const lines = useRef<LineRef[]>([]);
  if (lines.current.length !== callouts.length) lines.current = callouts.map(() => ({ path: null, dot: null, label: null }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mm = window.matchMedia("(max-width: 767px)");
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    const up = () => setEnv({ reduced: mq.matches, mobile: mm.matches, gl });
    up();
    mq.addEventListener("change", up);
    mm.addEventListener("change", up);
    return () => {
      mq.removeEventListener("change", up);
      mm.removeEventListener("change", up);
    };
  }, []);
  const reduced = !!env?.reduced;
  const mobile = !!env?.mobile;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [env]);

  useEffect(() => {
    if (reduced) return setShown(true);
    if (!inView || shown) return;
    const id = window.setInterval(() => time.current >= introDuration && setShown(true), 100);
    return () => window.clearInterval(id);
  }, [inView, shown, reduced, introDuration]);

  const hovering = hover ?? labelHover;
  useEffect(() => {
    if (reduced || hovering || !shown || !inView || !cycleMs || !callouts.length) return;
    const id = window.setInterval(() => setAuto((a) => (a + 1) % callouts.length), cycleMs);
    return () => window.clearInterval(id);
  }, [reduced, hovering, shown, inView, cycleMs, callouts.length]);

  useEffect(() => {
    if (reduced || mobile || !tilt) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const r = stage.current?.getBoundingClientRect();
      if (!r) return;
      pointer.current.x = clamp01((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = clamp01((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onScroll = () => {
      const r = stage.current?.getBoundingClientRect();
      if (!r) return;
      scroll.current = Math.max(-1, Math.min(1, 0.5 - (r.top + r.height / 2) / window.innerHeight)) * 1.2;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      pointer.current = { x: 0, y: 0 };
      scroll.current = 0;
    };
  }, [reduced, mobile, tilt]);

  const active = shown && callouts.length ? hovering ?? callouts[auto % callouts.length]?.id ?? null : hovering;
  const ctx: IsoState = useMemo(() => ({ time, loop: reduced ? 0 : 1, mobile, active, setHover }), [reduced, mobile, active]);

  const useFallback = env && fallback && (env.reduced || !env.gl);
  if (!env || useFallback) return <div className={className} style={{ position: "relative", width: "100%", ...style }}>{fallback ?? <div style={{ aspectRatio: `${artWidth} / ${artHeight}` }} />}</div>;

  const dpr = mobile ? 0.75 : 0.5 * Math.min(2, window.devicePixelRatio || 1);

  return (
    <div className={className} style={{ position: "relative", width: "100%", ...style }}>
      <div ref={stage} style={{ position: "relative", width: "100%", aspectRatio: `${artWidth} / ${artHeight}` }}>
        <Canvas
          orthographic
          frameloop={reduced ? "demand" : inView ? "always" : "never"}
          dpr={dpr}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ near: 0.1, far: 200 }}
          style={{ position: "absolute", inset: 0, imageRendering: "pixelated" }}
          onPointerMissed={() => setHover(null)}
        >
          <IsoContext.Provider value={ctx}>
            <TimeKeeper scale={timeScale} after={introDuration} />
            <IsoCamera artWidth={artWidth} pxPerUnit={pxPerUnit} lookAt={lookAt} />
            <ambientLight intensity={theme === "dark" ? 1.25 : 1.35} />
            {/* key light: top = light, left (+z) face = mid, right (+x) face = dark */}
            <directionalLight position={[-2, 10, 5]} intensity={2.1} />
            {!reduced && !mobile && tilt > 0 && <Tilt pointer={pointer} scroll={scroll} amount={tilt} />}
            <group name="iso-root">{children}</group>
            {!mobile && callouts.length > 0 && <CalloutProjector callouts={callouts} lines={lines} />}
          </IsoContext.Provider>
        </Canvas>
        {!mobile && callouts.length > 0 && (
          <Callouts callouts={callouts} active={active} shown={shown} onHover={setLabelHover} lines={lines} artWidth={artWidth} artHeight={artHeight} />
        )}
      </div>
      {mobile && callouts.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "12px 16px 16px" }}>
          {callouts.map((c) => (
            <CalloutChip key={c.id} c={c} active={active === c.id} onHover={setLabelHover} compact />
          ))}
        </div>
      )}
    </div>
  );
}
