"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { BurstPacket, ISO, IsoCanvas, IsoModule, PathTiles, Packets, Voxel, clamp01, pop, smooth, unitBox, along, useIso, useLambert, type Callout, type V2 } from "@/components/iso";

/* Home "data boundary" diagram. World: 8×8 platform centred on the origin, wall ring on its rim. */

const INTRO = 3;
const H = 4; // platform half size
const RING = H - 0.25; // pillar centre line

const CALLOUTS: Callout[] = [
  { id: "data", label: "YOUR DATA", side: "l", top: 0, inset: 32, icon: "data", variant: "blue", anchor: [-1.2, 2.05, -1.2], tip: "Stays inside your perimeter, end to end." },
  { id: "boundary", label: "YOUR BOUNDARY", side: "l", top: 159, inset: 32, icon: "boundary", variant: "black", anchor: [-RING, 0.6, 2.6], tip: "Your VPC, data centre or air-gapped site." },
  { id: "egress", label: "EGRESS BLOCKED", side: "r", top: 106, inset: 8, icon: "block", variant: "red", anchor: [RING + 0.3, 0.9, 0.75], tip: "Outbound internet traffic is denied by default." },
  { id: "apis", label: "NO THIRD-PARTY APIS", side: "r", top: 275, inset: 8, icon: "gateway", variant: "black", anchor: [6.4, 1.6, -0.5], tip: "No prompts or data sent to outside model APIs." },
];

/* cubes */
const COBALT: V2 = [-1.2, -1.2];
const TEAL: V2 = [-1.6, 1.6];
const GREEN: V2 = [1.6, -1.6];

/* paths (x/z polylines) */
const TILES: V2[][] = [
  [[-0.6, 1.6], [1.6, 1.6], [1.6, -0.8]], // teal → green
  [[-0.2, -1.6], [0.8, -1.6]], // cobalt → green
  [[-1.6, -0.2], [-1.6, 0.7]], // cobalt → teal
  [[1.6, 0.75], [3.2, 0.75]], // spur toward the gate
];
const SHUTTLE: V2[][] = [
  [[-0.6, 1.6], [1.6, 1.6], [1.6, -0.8]],
  [[1.6, -0.8], [1.6, 1.6], [-0.6, 1.6]],
  [[-0.2, -1.6], [0.8, -1.6]],
  [[0.8, -1.6], [-0.2, -1.6]],
  [[-1.6, -0.2], [-1.6, 0.7]],
  [[-1.6, 0.7], [-1.6, -0.2]],
];
const GATE_Z = 0.75;
const GATE_ROUTE: V2[] = [[1.6, -0.6], [1.6, GATE_Z], [RING - 0.35, GATE_Z]];
const PROBE_ROUTE: V2[] = [[5.8, -0.5], [RING + 0.3, -0.5]];

/* gate bounce timing (shared by packet, gate flash and X) */
const G_START = INTRO + 0.4;
const G_CYCLE = 3.8;
const G_IN = 1.3;
const G_OUT = 0.9;
function gatePhase(t: number) {
  const c = t - G_START;
  return c < 0 ? -1 : c % G_CYCLE;
}

/* ---------------- platform ---------------- */

function Platform() {
  const grid = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const x = c.getContext("2d")!;
    x.fillStyle = "#333331";
    x.fillRect(0, 0, 8, 8);
    x.fillStyle = "#2a2a28";
    x.fillRect(0, 0, 8, 1);
    x.fillRect(0, 0, 1, 8);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(16, 16);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  const top = useMemo(() => new THREE.MeshLambertMaterial({ color: "#ffffff", map: grid }), [grid]);
  return (
    <IsoModule start={0}>
      <Voxel color={ISO.graphite} position={[0, -0.8, 0]} size={[2 * H, 0.8, 2 * H]} />
      <mesh material={top} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[2 * H, 2 * H]} />
      </mesh>
    </IsoModule>
  );
}

/* ---------------- crenellated wall ---------------- */

const PILLARS: V2[] = (() => {
  const out: V2[] = [];
  const n = 15;
  const at = (i: number) => -RING + (2 * RING * i) / n;
  for (let i = 0; i < n; i++) out.push([at(i), -RING]); // back-right edge
  for (let i = 0; i < n; i++) {
    const z = at(i);
    if (Math.abs(z - GATE_Z) > 0.55) out.push([RING, z]); // front-right edge, gap for the gate
  }
  for (let i = 0; i < n; i++) out.push([-at(i), RING]); // front-left edge
  for (let i = 0; i < n; i++) out.push([-RING, -at(i)]); // back-left edge
  return out;
})();
const PIL_H = 0.75;

function Wall() {
  const { time, loop, mobile } = useIso();
  const body = useRef<THREE.InstancedMesh>(null);
  const caps = useRef<THREE.InstancedMesh>(null);
  const mat = useLambert("#2a2a29");
  const o = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const dim = useMemo(() => new THREE.Color("#5c5c58"), []);
  const hot = useMemo(() => new THREE.Color(ISO.chart), []);

  useLayoutEffect(() => {
    const m = caps.current!;
    PILLARS.forEach((_, i) => m.setColorAt(i, dim));
  }, [dim]);

  useFrame(() => {
    const b = body.current;
    const c = caps.current;
    if (!b || !c) return;
    const t = time.current;
    const head = loop ? (t * 0.16) % 1 : -1;
    PILLARS.forEach(([x, z], i) => {
      const p = Math.max(0.001, pop(t, 0.35 + i * 0.022, 0.4));
      o.position.set(x, (PIL_H / 2) * p, z);
      o.scale.set(0.38, PIL_H * p, 0.38);
      o.updateMatrix();
      b.setMatrixAt(i, o.matrix);
      o.position.set(x, PIL_H * p + 0.03, z);
      o.scale.set(0.2 * p, 0.06, 0.2 * p);
      o.updateMatrix();
      c.setMatrixAt(i, o.matrix);
      if (!mobile || Math.round(t * 30) % 2 === 0) {
        let d = head - i / PILLARS.length;
        if (d < 0) d += 1;
        const glow = head < 0 ? 0 : Math.max(0, 1 - d * 9);
        col.copy(dim).lerp(hot, glow);
        c.setColorAt(i, col);
      }
    });
    b.instanceMatrix.needsUpdate = true;
    c.instanceMatrix.needsUpdate = true;
    if (c.instanceColor) c.instanceColor.needsUpdate = true;
  });

  return (
    <IsoModule id="boundary" start={0.3}>
      <instancedMesh ref={body} args={[unitBox, mat, PILLARS.length]} />
      <instancedMesh ref={caps} args={[unitBox, undefined, PILLARS.length]}>
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </IsoModule>
  );
}

/* ---------------- red gate ---------------- */

function PixelX({ size = 0.8 }: { size?: number }) {
  const { time, loop } = useIso();
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.red, toneMapped: false, transparent: true }), []);
  const cells = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < 5; i++) {
      out.push([i, i]);
      if (i !== 2) out.push([i, 4 - i]);
    }
    return out;
  }, []);
  useFrame(() => {
    const t = time.current;
    if (t < 1.6) return void (mat.opacity = 0);
    if (!loop) return void (mat.opacity = 1);
    const c = gatePhase(t);
    const hit = c - G_IN;
    mat.opacity = hit >= 0 && hit < 1.2 ? (Math.floor(hit * 8) % 2 === 0 ? 1 : 0.15) : 0.55;
  });
  const s = size / 5;
  return (
    <group>
      {cells.map(([cx, cy], i) => (
        <mesh key={i} material={mat} position={[0, (2 - cy) * s, (cx - 2) * s]} scale={[0.01, s * 0.92, s * 0.92]} geometry={unitBox} />
      ))}
    </group>
  );
}

function Gate() {
  const { time, loop } = useIso();
  const mat = useMemo(() => new THREE.MeshLambertMaterial({ color: ISO.red }), []);
  const base = useMemo(() => new THREE.Color(ISO.red), []);
  const flash = useMemo(() => new THREE.Color("#ff8a80"), []);
  useFrame(() => {
    const c = loop ? gatePhase(time.current) : -1;
    const hit = c - G_IN;
    const k = hit >= 0 ? Math.exp(-hit * 4) : 0;
    mat.color.copy(base).lerp(flash, k);
  });
  return (
    <IsoModule id="egress" start={1.3} position={[RING, 0, GATE_Z]}>
      <mesh geometry={unitBox} material={mat} position={[0, 0.55, 0]} scale={[0.42, 1.1, 0.9]} />
      <group position={[0.22, 1.55, 0]}>
        <PixelX />
      </group>
    </IsoModule>
  );
}

/** Chartreuse packet that heads for the gate and bounces back. */
function GatePacket() {
  const { time, loop } = useIso();
  const m = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  useFrame(() => {
    const p = m.current;
    if (!p) return;
    const c = loop ? gatePhase(time.current) : -1;
    let f = -1;
    if (c >= 0 && c < G_IN) f = (c / G_IN) * 0.4 + smooth(c / G_IN) * 0.6;
    else if (c >= G_IN && c < G_IN + G_OUT) f = 1 - smooth((c - G_IN) / G_OUT) * 0.45;
    if (f < 0) return void p.scale.setScalar(0.0001);
    const [x, z] = along(GATE_ROUTE, f);
    const hop = c >= G_IN ? Math.sin(clamp01((c - G_IN) / 0.35) * Math.PI) * 0.35 : 0;
    p.position.set(x, 0.2 + hop, z);
    p.scale.setScalar(0.26);
  });
  return <mesh ref={m} geometry={unitBox} material={mat} />;
}

/* ---------------- inside cubes ---------------- */

function DataCube() {
  const { time, loop } = useIso();
  const inner = useRef<THREE.Group>(null);
  const halo = useMemo(() => new THREE.MeshBasicMaterial({ color: "#6a71f0", toneMapped: false, transparent: true, opacity: 0 }), []);
  useFrame(() => {
    const k = loop ? 0.5 + 0.5 * Math.sin(time.current * 1.8) : 0;
    inner.current?.scale.setScalar(1 + k * 0.025);
    halo.opacity = time.current > INTRO ? 0.15 + k * 0.35 : 0;
  });
  return (
    <IsoModule id="data" start={1.5} position={[COBALT[0], 0, COBALT[1]]}>
      <group ref={inner}>
        <Voxel color={ISO.cobalt} position={[0, 0.25, 0]} size={[2, 1.75, 2]} />
        <Voxel color="#3036b8" size={[1.7, 0.25, 1.7]} />
      </group>
      <mesh geometry={unitBox} material={halo} position={[0, 0.015, 0]} scale={[2.5, 0.02, 2.5]} />
    </IsoModule>
  );
}

/* ---------------- outside API cubes ---------------- */

const APIS = [
  { pos: [6.1, 0, 2.6] as const, size: [1.1, 1.1, 1.1] as const, phase: 0 },
  { pos: [6.4, 0, -0.5] as const, size: [1.0, 1.45, 1.0] as const, phase: 1.7 },
  { pos: [6.0, 0, -2.9] as const, size: [1.05, 1.05, 1.05] as const, phase: 3.1 },
];

function ApiCube({ pos, size, phase, start }: { pos: readonly [number, number, number]; size: readonly [number, number, number]; phase: number; start: number }) {
  const { time, loop } = useIso();
  const m = useRef<THREE.Mesh>(null);
  const mat = useLambert("#D6D6D0");
  useFrame(() => {
    const t = time.current;
    const d = loop ? 1 : 0;
    m.current?.position.set(Math.sin(t * 0.5 + phase) * 0.18 * d, size[1] / 2 + (Math.sin(t * 0.9 + phase) * 0.5 + 0.5) * 0.3 * d, Math.cos(t * 0.4 + phase) * 0.14 * d);
  });
  return (
    <IsoModule start={start} position={[pos[0], pos[1], pos[2]]}>
      <mesh ref={m} geometry={unitBox} material={mat} scale={[size[0], size[1], size[2]]} />
    </IsoModule>
  );
}

function Apis() {
  return (
    <IsoModule id="apis" start={2}>
      {APIS.map((a, i) => (
        <ApiCube key={i} {...a} start={2.05 + i * 0.12} />
      ))}
    </IsoModule>
  );
}

/* ---------------- scene ---------------- */

export default function BoundaryScene({ className, style, fallback }: { className?: string; style?: React.CSSProperties; fallback?: React.ReactNode }) {
  return (
    <IsoCanvas className={className} style={style} artWidth={576} artHeight={332} pxPerUnit={37} lookAt={[0.35, 0, -0.25]} callouts={CALLOUTS} introDuration={INTRO} fallback={fallback} tilt={0.05}>
      <Platform />
      <Wall />
      <PathTiles routes={TILES} start={1.9} width={0.6} step={0.55} />
      <DataCube />
      <IsoModule start={1.7} position={[TEAL[0], 0, TEAL[1]]}>
        <Voxel color={ISO.teal} size={[1.8, 1.3, 1.6]} />
      </IsoModule>
      <IsoModule start={1.85} position={[GREEN[0], 0, GREEN[1]]}>
        <Voxel color="#2E9A6E" size={[1.6, 1.25, 1.6]} />
      </IsoModule>
      <Gate />
      <Apis />
      <Packets routes={SHUTTLE} perRoute={2} speed={1.1} size={0.22} start={INTRO - 0.4} />
      <GatePacket />
      <BurstPacket route={PROBE_ROUTE} color="#E4E4DE" start={INTRO + 1.6} cycle={4.6} travel={1.4} y={0.7} />
    </IsoCanvas>
  );
}
