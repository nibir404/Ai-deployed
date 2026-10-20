"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

/* ------------------------------------------------------------------ */
/* palette + layout                                                     */
/* ------------------------------------------------------------------ */

const C = {
  violet: "#8B6CF0",
  architect: "#7B3FE0",
  cobalt: "#3B43D6",
  teal: "#3FA9A0",
  tealDark: "#1F5F5A",
  chart: "#D6F25C",
  amber: "#E8A23A",
  red: "#D9534F",
  graphite: "#1B1B1B",
  graphiteSide: "#2A2A28",
  white: "#F2F2EE",
  orange: "#E8913A",
  olive: "#5E6B22",
  ink: "#111111",
};

const ART_W = 1278;
const ART_H = 700;
const PX_PER_UNIT = 49; // world unit → px at 1278 wide
const INTRO = 3.4; // seconds until callouts appear

type ModuleId = "sandbox" | "runtime" | "network" | "inference" | "gateway" | "infra";

type Callout = {
  id: ModuleId;
  label: string;
  side: "l" | "r";
  top: number; // px in the 1278×700 art
  anchor: [number, number, number];
  tip: string;
};

const CALLOUTS: Callout[] = [
  { id: "sandbox", label: "MICROVM SANDBOX", side: "l", top: 163, anchor: [-2.95, 2.1, -1.9], tip: "Each agent runs in an isolated microVM." },
  { id: "runtime", label: "SOVEREIGN AGENT RUNTIME", side: "l", top: 419, anchor: [-1.1, 1.0, 1.6], tip: "Our runtime, deployed inside your perimeter." },
  { id: "network", label: "ZERO-TRUST NETWORK", side: "l", top: 511, anchor: [-1.2, 0.5, 3.4], tip: "Every call authenticated, every egress checked." },
  { id: "inference", label: "PRIVATE INFERENCE", side: "r", top: 129, anchor: [0.4, 1.55, -4.6], tip: "Models served on your hardware or VPC." },
  { id: "gateway", label: "TOOL GATEWAY · MCP", side: "r", top: 302, anchor: [4.7, 1.55, -3.6], tip: "Scoped tool access, logged per call." },
  { id: "infra", label: "YOUR INFRASTRUCTURE", side: "r", top: 523, anchor: [6, -0.5, 1.5], tip: "Cloud, on-prem or air-gapped." },
];
const IDS = CALLOUTS.map((c) => c.id);

/* ------------------------------------------------------------------ */
/* helpers                                                              */
/* ------------------------------------------------------------------ */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** springy 0→1 with overshoot */
function pop(t: number, start: number, dur = 0.55) {
  const x = clamp01((t - start) / dur);
  const c1 = 2.2;
  const c3 = c1 + 1;
  return x === 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
const smooth = (x: number) => x * x * (3 - 2 * x);

type SceneCtx = {
  time: React.MutableRefObject<number>;
  loop: number; // 1 = loops on, 0 = static final state
  mobile: boolean;
  active: ModuleId | null;
  setHover: (id: ModuleId | null) => void;
};
const Ctx = createContext<SceneCtx | null>(null);
const useScene = () => useContext(Ctx)!;

const box = new THREE.BoxGeometry(1, 1, 1);

function useLambert(color: string, extra?: THREE.MeshLambertMaterialParameters) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => new THREE.MeshLambertMaterial({ color, ...extra }), [color]);
}

/* ------------------------------------------------------------------ */
/* time keeper — owns the scene clock (pauses while offscreen)          */
/* ------------------------------------------------------------------ */

function TimeKeeper() {
  const { time, loop } = useScene();
  useFrame((_, dt) => {
    if (!loop) {
      time.current = 1000;
      return;
    }
    time.current += Math.min(dt, 0.1);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* module wrapper: intro pop, hover lift + emissive highlight           */
/* ------------------------------------------------------------------ */

function Module({ id, start, children, position = [0, 0, 0] }: { id?: ModuleId; start: number; children: React.ReactNode; position?: [number, number, number] }) {
  const { time, active, setHover, mobile } = useScene();
  const g = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshLambertMaterial[]>([]);
  const hl = useRef(0);

  useLayoutEffect(() => {
    const list: THREE.MeshLambertMaterial[] = [];
    g.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material;
      if (m && m instanceof THREE.MeshLambertMaterial && !list.includes(m)) list.push(m);
    });
    mats.current = list;
  }, []);

  useFrame((_, dt) => {
    if (!g.current) return;
    const t = time.current;
    const p = pop(t, start);
    const target = id && active === id ? 1 : 0;
    hl.current += (target - hl.current) * Math.min(1, dt * 8);
    const s = Math.max(0.0001, p) * (1 + hl.current * 0.04);
    g.current.scale.setScalar(s);
    g.current.position.set(position[0], position[1] + (1 - clamp01((t - start) / 0.45)) * 3 + hl.current * 0.18, position[2]);
    g.current.visible = t > start;
    for (const m of mats.current) {
      m.emissive.copy(m.color);
      m.emissiveIntensity = hl.current * 0.28;
    }
  });

  const handlers = id && !mobile
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHover(id);
          document.body.style.cursor = "pointer";
        },
        onPointerOut: () => {
          setHover(null);
          document.body.style.cursor = "";
        },
      }
    : {};

  return (
    <group ref={g} {...handlers}>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* base platform + chasing border lights                                */
/* ------------------------------------------------------------------ */

function useGridTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const x = c.getContext("2d")!;
    x.fillStyle = "#2b2b29";
    x.fillRect(0, 0, 8, 8);
    x.fillStyle = "#222220";
    x.fillRect(0, 0, 8, 1);
    x.fillRect(0, 0, 1, 8);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 24);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Base() {
  const grid = useGridTexture();
  const top = useMemo(() => new THREE.MeshLambertMaterial({ color: "#ffffff", map: grid }), [grid]);
  const side = useLambert(C.graphite);
  return (
    <Module id="infra" start={0}>
      <mesh geometry={box} material={side} scale={[12, 1, 12]} position={[0, -0.5, 0]} />
      <mesh material={top} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[12, 12]} />
      </mesh>
      <BorderLights />
    </Module>
  );
}

function BorderLights() {
  const { time, loop, mobile } = useScene();
  const ref = useRef<THREE.InstancedMesh>(null);
  const pts = useMemo(() => {
    const out: { p: [number, number, number]; s: [number, number, number]; k: number }[] = [];
    const n = 22;
    // top ring: perimeter inset 0.35, run clockwise
    const corners: [number, number][] = [[-5.65, -5.65], [5.65, -5.65], [5.65, 5.65], [-5.65, 5.65]];
    for (let e = 0; e < 4; e++) {
      const [ax, az] = corners[e];
      const [bx, bz] = corners[(e + 1) % 4];
      for (let i = 0; i < n; i++) {
        const f = (i + 0.5) / n;
        const horiz = Math.abs(bx - ax) > 0;
        out.push({ p: [ax + (bx - ax) * f, 0.02, az + (bz - az) * f], s: horiz ? [0.22, 0.04, 0.08] : [0.08, 0.04, 0.22], k: (e * n + i) / (4 * n) });
      }
    }
    // dashes on the two visible side faces
    for (let i = 0; i < n; i++) {
      const f = (i + 0.5) / n;
      out.push({ p: [6.01, -0.5, -6 + 12 * f], s: [0.02, 0.06, 0.22], k: 0.25 + f * 0.25 });
      out.push({ p: [6 - 12 * f, -0.5, 6.01], s: [0.22, 0.06, 0.02], k: 0.5 + f * 0.25 });
    }
    return out;
  }, []);
  const col = useMemo(() => new THREE.Color(), []);
  const dim = useMemo(() => new THREE.Color("#6f7d2c"), []);
  const hot = useMemo(() => new THREE.Color(C.chart), []);

  useLayoutEffect(() => {
    const m = ref.current!;
    const o = new THREE.Object3D();
    pts.forEach((d, i) => {
      o.position.set(...d.p);
      o.scale.set(...d.s);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      m.setColorAt(i, hot);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [pts, hot]);

  useFrame(() => {
    const m = ref.current;
    if (!m || (mobile && Math.round(time.current * 30) % 2)) return;
    const head = (time.current * 0.22) % 1;
    pts.forEach((d, i) => {
      let dist = head - d.k;
      if (dist < 0) dist += 1;
      const glow = loop ? Math.max(0, 1 - dist * 6) : 0;
      col.copy(dim).lerp(hot, loop ? 0.45 + glow * 0.55 : 1);
      m.setColorAt(i, col);
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[box, undefined, pts.length]}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* pixel robot                                                          */
/* ------------------------------------------------------------------ */

type RobotMode = "idle" | "hop";

function Robot({ color, position, mode, phase = 0, scale = 1 }: { color: string; position: [number, number, number]; mode: RobotMode; phase?: number; scale?: number }) {
  const { time, loop } = useScene();
  const g = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const body = useLambert(color);
  const dark = useLambert(C.ink);

  useFrame(() => {
    if (!g.current || !eyes.current) return;
    const t = time.current;
    let y = 0;
    let rot = 0;
    if (loop) {
      if (mode === "idle") {
        y = Math.sin(t * 2.2 + phase * 2) * 0.05;
        // occasional turn: every ~7s, swivel and back
        const c = (t + phase * 3.1) % 7;
        rot = c < 1.4 ? Math.sin((c / 1.4) * Math.PI) * 0.9 : 0;
      } else {
        // hop in sequence: 3 robots, 0.5s offset, 3s cycle
        const c = (t - INTRO + 3 - phase * 0.45) % 3;
        if (c > 0 && c < 0.55) y = Math.sin((c / 0.55) * Math.PI) * 0.45;
      }
    }
    g.current.position.set(position[0], position[1] + y, position[2]);
    g.current.rotation.y = rot;
    const b = loop ? (t * 1.0 + phase * 0.37) % 3.2 : 1;
    eyes.current.scale.y = b < 0.12 ? 0.15 : 1;
  });

  return (
    <group ref={g} scale={scale}>
      {/* legs */}
      <mesh geometry={box} material={dark} position={[0, 0.06, 0.08]} scale={[0.1, 0.12, 0.1]} />
      <mesh geometry={box} material={dark} position={[0, 0.06, -0.08]} scale={[0.1, 0.12, 0.1]} />
      {/* body */}
      <mesh geometry={box} material={body} position={[0, 0.25, 0]} scale={[0.3, 0.26, 0.36]} />
      <mesh geometry={box} material={dark} position={[0.151, 0.24, 0]} scale={[0.01, 0.12, 0.16]} />
      {/* arms */}
      <mesh geometry={box} material={body} position={[0, 0.27, 0.24]} scale={[0.1, 0.1, 0.1]} />
      <mesh geometry={box} material={body} position={[0, 0.27, -0.24]} scale={[0.1, 0.1, 0.1]} />
      {/* head */}
      <mesh geometry={box} material={body} position={[0, 0.52, 0]} scale={[0.34, 0.26, 0.42]} />
      <mesh geometry={box} material={dark} position={[0, 0.7, 0]} scale={[0.08, 0.1, 0.08]} />
      <group ref={eyes} position={[0.171, 0.53, 0]}>
        <mesh geometry={box} material={dark} position={[0, 0, 0.1]} scale={[0.01, 0.09, 0.07]} />
        <mesh geometry={box} material={dark} position={[0, 0, -0.1]} scale={[0.01, 0.09, 0.07]} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* sandboxes: purple slab + 6 breathing glass cubes                     */
/* ------------------------------------------------------------------ */

const GLASS = [-4.75, -2.95].flatMap((x, ci) => [-1.9, -0.2, 1.5].map((z, ri) => ({ x, z, i: ci * 3 + ri })));
const GLASS_BOTS = [C.chart, C.white, C.white, C.white, C.orange, C.chart];

function GlassCube({ x, z, i, start }: { x: number; z: number; i: number; start: number }) {
  const { time, loop } = useScene();
  const mat = useMemo(() => new THREE.MeshLambertMaterial({ color: C.violet, transparent: true, opacity: 0.42, depthWrite: false }), []);
  useFrame(() => {
    mat.opacity = 0.36 + (loop ? Math.sin(time.current * 1.4 + i * 0.9) * 0.1 : 0.04);
  });
  return (
    <Module start={start} position={[x, 0.35, z]}>
      <mesh geometry={box} material={mat} position={[0, 0.78, 0]} scale={[1.5, 1.55, 1.5]} renderOrder={2}>
        <Edges color={C.architect} />
      </mesh>
      <Robot color={GLASS_BOTS[i]} position={[0.05, 0, 0]} mode="idle" phase={i} scale={1.1} />
    </Module>
  );
}

function Sandboxes() {
  const slab = useLambert(C.architect);
  const top = useLambert(C.violet);
  return (
    <>
      <Module id="sandbox" start={0.45} position={[-3.85, 0, -0.2]}>
        <mesh geometry={box} material={slab} scale={[3.8, 0.35, 5.3]} position={[0, 0.175, 0]} />
        <mesh geometry={box} material={top} scale={[3.7, 0.01, 5.2]} position={[0, 0.355, 0]} />
        <group position={[3.85, 0, 0.2]}>
          {GLASS.map((c) => (
            <GlassCube key={c.i} {...c} start={0.75 + c.i * 0.09} />
          ))}
        </group>
      </Module>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* runtime: raised cobalt platform, hopping robots, pulsing pads        */
/* ------------------------------------------------------------------ */

function Pad({ position }: { position: [number, number, number] }) {
  const { time, loop } = useScene();
  const m = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: C.chart, toneMapped: false }), []);
  const lo = useMemo(() => new THREE.Color("#8fa03a"), []);
  const hi = useMemo(() => new THREE.Color(C.chart), []);
  useFrame(() => {
    const k = loop ? 0.5 + 0.5 * Math.sin(time.current * 3 + position[0] * 2) : 1;
    mat.color.copy(lo).lerp(hi, k);
    m.current?.scale.set(0.7 + k * 0.08, 0.04, 0.7 + k * 0.08);
  });
  return <mesh ref={m} geometry={box} material={mat} position={position} />;
}

function Runtime() {
  const blue = useLambert(C.cobalt);
  const top = useLambert("#5058E6");
  return (
    <Module id="runtime" start={1.1} position={[0.6, 0, 0.6]}>
      <mesh geometry={box} material={blue} scale={[3.4, 1.2, 3.4]} position={[0, 0.6, 0]} />
      <mesh geometry={box} material={top} scale={[3.3, 0.01, 3.3]} position={[0, 1.205, 0]} />
      <Pad position={[-1.2, 1.22, -1.2]} />
      <Pad position={[1.2, 1.22, 1.2]} />
      <Pad position={[1.2, 1.22, -1.2]} />
      <Robot color={C.chart} position={[-0.5, 1.2, -0.3]} mode="hop" phase={0} scale={1.25} />
      <Robot color={C.orange} position={[0.2, 1.2, 0.5]} mode="hop" phase={1} scale={1.25} />
      <Robot color={C.white} position={[0.4, 1.2, -0.75]} mode="hop" phase={2} scale={1.25} />
    </Module>
  );
}

/* ------------------------------------------------------------------ */
/* inference: teal block + scanning racks                               */
/* ------------------------------------------------------------------ */

function Rack({ x, i, start }: { x: number; i: number; start: number }) {
  const { time, loop } = useScene();
  const rack = useLambert(C.tealDark);
  const led = useMemo(() => new THREE.MeshBasicMaterial({ color: C.chart, toneMapped: false }), []);
  const dim = useMemo(() => new THREE.Color("#7f9233"), []);
  const hi = useMemo(() => new THREE.Color(C.chart), []);
  useFrame(() => {
    const t = time.current;
    if (!loop) {
      led.color.copy(hi);
      return;
    }
    const scan = (t * 1.6) % 6; // sweep across 4 racks then rest
    const d = Math.abs(scan - i);
    const flick = Math.sin(t * 37 + i * 11) > 0.6 ? 0.25 : 0;
    led.color.copy(dim).lerp(hi, clamp01(1 - d) * 0.7 + 0.3 - flick + flick * clamp01(1 - d));
  });
  return (
    <Module start={start} position={[x, 1, -4]}>
      <mesh geometry={box} material={rack} scale={[0.8, 0.5, 2.4]} position={[0, 0.25, 0]} />
      <mesh geometry={box} material={led} scale={[0.66, 0.02, 2.2]} position={[0, 0.51, 0]} />
    </Module>
  );
}

function Inference() {
  const teal = useLambert(C.teal);
  return (
    <>
      <Module id="inference" start={1.5} position={[0.4, 0, -4]}>
        <mesh geometry={box} material={teal} scale={[4, 1, 3.2]} position={[0, 0.5, 0]} />
        <group position={[-0.4, 0, 4]}>
          {[-1.1, -0.1, 0.9, 1.9].map((x, i) => (
            <Rack key={i} x={x} i={i} start={1.7 + i * 0.1} />
          ))}
        </group>
      </Module>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* amber wall (zero-trust): instanced pillars + blinking red X          */
/* ------------------------------------------------------------------ */

const PILLARS: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let z = -4.6; z <= 4.25; z += 0.7) if (z < 0.3 || z > 1.7) out.push([3, z]);
  out.push([2.3, 4.2], [1.6, 4.2]);
  return out;
})();
const X_PILLAR = PILLARS.findIndex(([, z]) => Math.abs(z - 3.8) < 0.36);

function Wall() {
  const { time, loop } = useScene();
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useLambert(C.amber);
  const xMat = useMemo(() => new THREE.MeshBasicMaterial({ color: C.red, toneMapped: false, transparent: true }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current;
    PILLARS.forEach(([x, z], i) => {
      const p = pop(t, 1.9 + i * 0.04, 0.45);
      o.position.set(x, 0.7 * p, z);
      o.scale.set(0.6, 1.4 * Math.max(0.001, p), 0.6);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    const blink = loop ? (Math.floor(t * 2.5) % 2 === 0 ? 1 : 0.25) : 1;
    xMat.opacity = t > 2.4 ? blink : 0;
  });
  const [xx, xz] = PILLARS[X_PILLAR];
  return (
    <Module id="network" start={1.85}>
      <instancedMesh ref={ref} args={[box, mat, PILLARS.length]} />
      <group position={[xx + 0.305, 0.75, xz]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={xMat} rotation={[0, 0, Math.PI / 4]} scale={[0.5, 0.07, 1]}>
          <planeGeometry />
        </mesh>
        <mesh material={xMat} rotation={[0, 0, -Math.PI / 4]} scale={[0.5, 0.07, 1]}>
          <planeGeometry />
        </mesh>
      </group>
    </Module>
  );
}

/* ------------------------------------------------------------------ */
/* free cubes                                                           */
/* ------------------------------------------------------------------ */

function FloatCube({ color, pos, size, start, phase, id, float = true }: { color: string; pos: [number, number, number]; size: number; start: number; phase: number; id?: ModuleId; float?: boolean }) {
  const { time, loop } = useScene();
  const mat = useLambert(color);
  const m = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!m.current) return;
    const y = float && loop ? (Math.sin(time.current * 0.9 + phase) * 0.5 + 0.5) * 0.35 : 0;
    m.current.position.y = size / 2 + y;
  });
  return (
    <Module id={id} start={start} position={pos}>
      <mesh ref={m} geometry={box} material={mat} scale={size} />
    </Module>
  );
}

/* ------------------------------------------------------------------ */
/* path tiles + data packets                                            */
/* ------------------------------------------------------------------ */

type V2 = [number, number];
const ROUTES: V2[][] = [
  [[-1.8, 3.0], [2.5, 3.0], [2.5, 1.0], [3.8, 1.0], [3.8, -2.3]], // sandbox → runtime front → gateway → infra
  [[-1.8, -1.75], [2.2, -1.75], [2.2, -2.3]], // sandbox → inference
];
const RED_ROUTE: V2[] = [[5.9, 3.75], [3.32, 3.75]];

function routeLen(r: V2[]) {
  let l = 0;
  for (let i = 1; i < r.length; i++) l += Math.hypot(r[i][0] - r[i - 1][0], r[i][1] - r[i - 1][1]);
  return l;
}
function along(r: V2[], f: number): V2 {
  let d = f * routeLen(r);
  for (let i = 1; i < r.length; i++) {
    const s = Math.hypot(r[i][0] - r[i - 1][0], r[i][1] - r[i - 1][1]);
    if (d <= s) {
      const k = d / s;
      return [r[i - 1][0] + (r[i][0] - r[i - 1][0]) * k, r[i - 1][1] + (r[i][1] - r[i - 1][1]) * k];
    }
    d -= s;
  }
  return r[r.length - 1];
}

function Paths() {
  const { time } = useScene();
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useLambert(C.olive);
  const tiles = useMemo(() => {
    const out: V2[] = [];
    for (const r of ROUTES) {
      const n = Math.round(routeLen(r) / 0.8);
      for (let i = 0; i <= n; i++) out.push(along(r, i / n));
    }
    return out;
  }, []);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current;
    tiles.forEach(([x, z], i) => {
      const p = clamp01((t - 2.5 - i * 0.025) / 0.25);
      o.position.set(x, 0.015, z);
      o.scale.set(0.82 * Math.max(0.001, p), 0.03, 0.82 * Math.max(0.001, p));
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[box, mat, tiles.length]} />;
}

function Packets() {
  const { time, loop, mobile } = useScene();
  const ref = useRef<THREE.InstancedMesh>(null);
  const per = mobile ? 2 : 4;
  const count = ROUTES.length * per;
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: C.chart, toneMapped: false }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current - INTRO + 0.4;
    let k = 0;
    ROUTES.forEach((r, ri) => {
      const speed = 1.4 / routeLen(r);
      for (let i = 0; i < per; i++) {
        const f = (((t * speed + i / per + ri * 0.13) % 1) + 1) % 1;
        const [x, z] = along(r, f);
        const fade = Math.min(f / 0.06, (1 - f) / 0.06, 1);
        const s = loop && t > 0 ? 0.24 * clamp01(fade) : 0.0001;
        o.position.set(x, 0.2 + Math.abs(Math.sin(f * 40)) * 0.06, z);
        o.scale.setScalar(Math.max(0.0001, s));
        o.updateMatrix();
        m.setMatrixAt(k++, o.matrix);
      }
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[box, mat, count]} />;
}

/** red packet runs into the wall and bursts */
function RedPacket() {
  const { time, loop } = useScene();
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 9; // 1 packet + 8 shards
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: C.red, toneMapped: false }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const dirs = useMemo(() => Array.from({ length: N - 1 }, (_, i) => {
    const a = (i / (N - 1)) * Math.PI * 2;
    return [0.6 + Math.random() * 0.6, Math.cos(a) * 1.4, Math.sin(a) * 1.4] as [number, number, number];
  }), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current - INTRO - 0.8;
    const cyc = 4.2;
    const c = ((t % cyc) + cyc) % cyc;
    const travel = 1.6;
    const on = loop && t > 0;
    // packet
    if (on && c < travel) {
      const [x, z] = along(RED_ROUTE, smooth(c / travel) * 0.6 + (c / travel) * 0.4);
      o.position.set(x, 0.2, z);
      o.scale.setScalar(0.24);
    } else o.scale.setScalar(0.0001);
    o.updateMatrix();
    m.setMatrixAt(0, o.matrix);
    // shards
    const b = (c - travel) / 0.7;
    dirs.forEach((d, i) => {
      if (on && b > 0 && b < 1) {
        o.position.set(3.32 + d[0] * b * 0.6, 0.2 + d[1] * b * 0.35 + 0.3 * b - 0.5 * b * b, 3.75 + d[2] * b * 0.5);
        o.scale.setScalar(0.1 * (1 - b));
      } else o.scale.setScalar(0.0001);
      o.updateMatrix();
      m.setMatrixAt(i + 1, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[box, mat, N]} />;
}

/* ------------------------------------------------------------------ */
/* camera, rig (pointer + scroll), anchor projection                    */
/* ------------------------------------------------------------------ */

function CameraRig({ pointer, scroll }: { pointer: React.MutableRefObject<{ x: number; y: number }>; scroll: React.MutableRefObject<number> }) {
  const { camera, size } = useThree();
  const { loop, mobile } = useScene();
  useLayoutEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    // 2:1 pixel isometric: elevation 30°
    cam.position.set(30, 30 * Math.SQRT2 * Math.tan(Math.PI / 6), 30);
    cam.lookAt(0, -0.35, 0);
    cam.zoom = (PX_PER_UNIT * size.width) / ART_W;
    cam.updateProjectionMatrix();
  }, [camera, size.width]);
  return <SceneRotator pointer={pointer} scroll={scroll} enabled={!!loop && !mobile} />;
}

function SceneRotator({ pointer, scroll, enabled }: { pointer: React.MutableRefObject<{ x: number; y: number }>; scroll: React.MutableRefObject<number>; enabled: boolean }) {
  const root = useThree((s) => s.scene).getObjectByName("iso-root") as THREE.Group | undefined;
  const cur = useRef({ ry: 0, rx: 0, y: 0 });
  useFrame((state, dt) => {
    const g = root ?? (state.scene.getObjectByName("iso-root") as THREE.Group | undefined);
    if (!g) return;
    const k = Math.min(1, dt * 3);
    const s = enabled ? scroll.current : 0;
    const tr = enabled ? { ry: pointer.current.x * 0.06 + s * 0.08, rx: pointer.current.y * 0.025, y: -s * 0.8 } : { ry: 0, rx: 0, y: 0 };
    cur.current.ry += (tr.ry - cur.current.ry) * k;
    cur.current.rx += (tr.rx - cur.current.rx) * k;
    cur.current.y += (tr.y - cur.current.y) * k;
    g.rotation.set(cur.current.rx, cur.current.ry, 0);
    g.position.y = cur.current.y;
  });
  return null;
}

type LineRefs = React.MutableRefObject<{ path: SVGPathElement | null; dot: SVGRectElement | null; label: HTMLDivElement | null }[]>;

function AnchorProjector({ lines, stage }: { lines: LineRefs; stage: React.RefObject<HTMLDivElement | null> }) {
  const { camera, size, scene } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const root = scene.getObjectByName("iso-root");
    const st = stage.current;
    if (!root || !st) return;
    root.updateMatrixWorld();
    CALLOUTS.forEach((c, i) => {
      const l = lines.current[i];
      if (!l?.path || !l.label) return;
      v.set(...c.anchor).applyMatrix4(root.matrixWorld).project(camera);
      const ax = ((v.x + 1) / 2) * size.width;
      const ay = ((1 - v.y) / 2) * size.height;
      const lb = l.label;
      const ly = lb.offsetTop + lb.offsetHeight / 2;
      const lx = c.side === "l" ? lb.offsetLeft + lb.offsetWidth : lb.offsetLeft;
      const dir = c.side === "l" ? 1 : -1;
      const dy = ay - ly;
      const ex = ax - dir * Math.min(Math.abs(dy) * 0.6, 60);
      const elbow = dir * (ex - lx) > 10 ? ex : lx + dir * 10;
      l.path.setAttribute("d", `M${lx.toFixed(1)} ${ly.toFixed(1)} H${elbow.toFixed(1)} L${ax.toFixed(1)} ${ay.toFixed(1)}`);
      l.dot?.setAttribute("x", (ax - 4).toFixed(1));
      l.dot?.setAttribute("y", (ay - 4).toFixed(1));
    });
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* icons + callouts                                                     */
/* ------------------------------------------------------------------ */

function Icon({ id, color }: { id: ModuleId; color: string }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "square" as const };
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden>
      {id === "sandbox" && (<><rect x="3" y="3" width="18" height="18" {...p} /><path d="M3 9h18M9 21V9" {...p} /></>)}
      {id === "runtime" && (<><rect x="5" y="5" width="14" height="14" {...p} /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" {...p} /></>)}
      {id === "network" && <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" {...p} />}
      {id === "inference" && (<><rect x="3" y="4" width="18" height="6" {...p} /><rect x="3" y="14" width="18" height="6" {...p} /><path d="M7 7h1M7 17h1" {...p} /></>)}
      {id === "gateway" && <path d="M4 12h6M14 12h6M10 8v8M14 8v8" {...p} />}
      {id === "infra" && <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" {...p} />}
    </svg>
  );
}

function Label({ c, active, onHover, compact, showTip }: { c: Callout; active: boolean; onHover: (id: ModuleId | null) => void; compact?: boolean; showTip?: boolean }) {
  return (
    <div
      onMouseEnter={() => onHover(c.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(c.id)}
      style={{
        alignItems: "center",
        backgroundColor: active ? "#3B43D6" : "var(--c-surface)",
        border: `1px solid ${active ? "#3B43D6" : "var(--c-border)"}`,
        boxSizing: "border-box",
        color: active ? "#FFFFFF" : "var(--c-text)",
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
      <Icon id={c.id} color={active ? "#FFFFFF" : "var(--c-text)"} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", lineHeight: "14px", whiteSpace: compact ? "normal" : "nowrap" }}>{c.label}</span>
      {showTip && (
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

/* ------------------------------------------------------------------ */
/* main component                                                       */
/* ------------------------------------------------------------------ */

export default function IsoScene({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const { theme } = useTheme();
  const stage = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hover, setHover] = useState<ModuleId | null>(null);
  const [labelHover, setLabelHover] = useState<ModuleId | null>(null);
  const [auto, setAuto] = useState(1); // start on SOVEREIGN AGENT RUNTIME, as in the art
  const [introDone, setIntroDone] = useState(false);
  const time = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const lines: LineRefs = useRef(CALLOUTS.map(() => ({ path: null, dot: null, label: null })));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mm = window.matchMedia("(max-width: 767px)");
    const up = () => {
      setReduced(mq.matches);
      setMobile(mm.matches);
    };
    up();
    mq.addEventListener("change", up);
    mm.addEventListener("change", up);
    return () => {
      mq.removeEventListener("change", up);
      mm.removeEventListener("change", up);
    };
  }, []);

  // run the render loop only while on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // callouts appear once the intro has played
  useEffect(() => {
    if (reduced) {
      setIntroDone(true);
      return;
    }
    if (!inView || introDone) return;
    const id = window.setInterval(() => {
      if (time.current >= INTRO) setIntroDone(true);
    }, 100);
    return () => window.clearInterval(id);
  }, [inView, introDone, reduced]);

  // auto-cycle the active callout while idle
  const hovering = hover ?? labelHover;
  useEffect(() => {
    if (reduced || hovering || !introDone || !inView) return;
    const id = window.setInterval(() => setAuto((a) => (a + 1) % IDS.length), 3600);
    return () => window.clearInterval(id);
  }, [reduced, hovering, introDone, inView]);

  // pointer + scroll inputs (desktop, fine pointers only)
  useEffect(() => {
    if (reduced || mobile) return;
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
      // -1 (below fold) → 0 (centred) → 1 (scrolled past)
      const c = (r.top + r.height / 2) / window.innerHeight;
      scroll.current = Math.max(-1, Math.min(1, 0.5 - c)) * 1.2;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, mobile]);

  const active: ModuleId | null = introDone ? hovering ?? IDS[auto] : null;
  const ctx: SceneCtx = useMemo(() => ({ time, loop: reduced ? 0 : 1, mobile, active, setHover }), [reduced, mobile, active]);
  const frameloop = reduced ? "demand" : inView ? "always" : "never";
  // render low-res and upscale with nearest-neighbour for the pixel-art look
  const dpr = mobile ? 0.75 : 0.5 * Math.min(2, typeof window === "undefined" ? 1 : window.devicePixelRatio);
  const showLines = !mobile;

  return (
    <div className={className} style={{ position: "relative", width: "100%", ...style }} data-theme-scene={theme}>
      <div ref={stage} style={{ position: "relative", width: "100%", aspectRatio: `${ART_W} / ${ART_H}` }}>
        <Canvas
          orthographic
          frameloop={frameloop}
          dpr={dpr}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ near: 0.1, far: 200 }}
          style={{ position: "absolute", inset: 0, imageRendering: "pixelated" }}
          onPointerMissed={() => setHover(null)}
        >
          <Ctx.Provider value={ctx}>
            <TimeKeeper />
            <ambientLight intensity={theme === "dark" ? 1.25 : 1.35} />
            {/* key light from upper left so top = light, left face = mid, right face = dark */}
            <directionalLight position={[-2, 10, 5]} intensity={2.1} />
            <CameraRig pointer={pointer} scroll={scroll} />
            <group name="iso-root">
              <Base />
              <Paths />
              <Sandboxes />
              <Runtime />
              <Inference />
              <Wall />
              <FloatCube id="gateway" color={C.graphite} pos={[4.7, 0, -3.6]} size={1.5} start={2.3} phase={0} float={false} />
              <FloatCube color={C.white} pos={[5.0, 0, -0.6]} size={1.15} start={2.4} phase={1.2} />
              <FloatCube color={C.cobalt} pos={[4.6, 0, 2.3]} size={1.25} start={2.5} phase={2.4} />
              <FloatCube color={C.red} pos={[4.2, 0, 4.95]} size={1.15} start={2.6} phase={3.6} />
              <FloatCube id="network" color={C.white} pos={[-1.2, 0, 3.4]} size={0.5} start={2.7} phase={0.6} />
              <Packets />
              <RedPacket />
            </group>
            {showLines && <AnchorProjector lines={lines} stage={stage} />}
          </Ctx.Provider>
        </Canvas>

        {showLines && (
          <>
            <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
              {CALLOUTS.map((c, i) => (
                <g key={c.id}>
                  <path
                    ref={(el) => {
                      lines.current[i].path = el;
                    }}
                    pathLength={1}
                    fill="none"
                    stroke={active === c.id ? "#3B43D6" : "var(--c-text)"}
                    strokeWidth={active === c.id ? 2 : 1.5}
                    strokeDasharray="1 1"
                    strokeDashoffset={introDone ? 0 : 1}
                    style={{ transition: `stroke-dashoffset .8s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.08}s, stroke .3s` }}
                  />
                  <rect
                    ref={(el) => {
                      lines.current[i].dot = el;
                    }}
                    width={8}
                    height={8}
                    fill={active === c.id ? "#3B43D6" : "var(--c-text)"}
                    style={{ opacity: introDone ? 1 : 0, transition: `opacity .3s ${0.6 + i * 0.08}s` }}
                  />
                </g>
              ))}
            </svg>
            {CALLOUTS.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  lines.current[i].label = el;
                }}
                style={{
                  position: "absolute",
                  top: `${(c.top / ART_H) * 100}%`,
                  ...(c.side === "l" ? { left: `${(48 / ART_W) * 100}%` } : { right: `${(30 / ART_W) * 100}%` }),
                  opacity: introDone ? 1 : 0,
                  transform: introDone ? "translateX(0)" : `translateX(${c.side === "l" ? -16 : 16}px)`,
                  transition: `opacity .5s ${i * 0.08}s, transform .6s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s`,
                  zIndex: active === c.id ? 3 : 2,
                }}
              >
                <Label c={c} active={active === c.id} onHover={setLabelHover} showTip />
              </div>
            ))}
          </>
        )}
      </div>

      {mobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "12px 16px 16px" }}>
          {CALLOUTS.map((c) => (
            <Label key={c.id} c={c} active={active === c.id} onHover={setLabelHover} compact />
          ))}
        </div>
      )}
    </div>
  );
}
