"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BlinkingX,
  BorderLights,
  BurstPacket,
  ISO,
  IsoCanvas,
  IsoModule,
  Packets,
  PathTiles,
  PixelRobot,
  Voxel,
  clamp01,
  pop,
  unitBox,
  useFloat,
  useIso,
  useLambert,
  type Callout,
  type V2,
} from "@/components/iso";

/* Hero scene: "FIG. 01 — the deployment stack". World is a 12×12 base centred on the origin. */

const INTRO = 3.4;

const CALLOUTS: Callout[] = [
  { id: "sandbox", label: "MICROVM SANDBOX", side: "l", top: 163, icon: "sandbox", anchor: [-2.95, 2.1, -1.9], tip: "Each agent runs in an isolated microVM." },
  { id: "runtime", label: "SOVEREIGN AGENT RUNTIME", side: "l", top: 419, icon: "runtime", anchor: [-1.1, 1.0, 1.6], tip: "Our runtime, deployed inside your perimeter." },
  { id: "network", label: "ZERO-TRUST NETWORK", side: "l", top: 511, icon: "shield", anchor: [-1.2, 0.5, 3.4], tip: "Every call authenticated, every egress checked." },
  { id: "inference", label: "PRIVATE INFERENCE", side: "r", top: 129, icon: "server", anchor: [0.4, 1.55, -4.6], tip: "Models served on your hardware or VPC." },
  { id: "gateway", label: "TOOL GATEWAY · MCP", side: "r", top: 302, icon: "gateway", anchor: [4.7, 1.55, -3.6], tip: "Scoped tool access, logged per call." },
  { id: "infra", label: "YOUR INFRASTRUCTURE", side: "r", top: 523, icon: "infra", anchor: [6, -0.5, 1.5], tip: "Cloud, on-prem or air-gapped." },
];

const ROUTES: V2[][] = [
  [[-1.8, 3.0], [2.5, 3.0], [2.5, 1.0], [3.8, 1.0], [3.8, -2.3]], // sandbox → runtime → gateway → infra
  [[-1.8, -1.75], [2.2, -1.75], [2.2, -2.3]], // sandbox → inference
];
const RED_ROUTE: V2[] = [[5.9, 3.75], [3.32, 3.75]];

/* ---------------- base ---------------- */

function Base() {
  const grid = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const x = c.getContext("2d")!;
    x.fillStyle = "#2b2b29";
    x.fillRect(0, 0, 8, 8);
    x.fillStyle = "#222220";
    x.fillRect(0, 0, 8, 1);
    x.fillRect(0, 0, 1, 8);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 24);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  const top = useMemo(() => new THREE.MeshLambertMaterial({ color: "#ffffff", map: grid }), [grid]);
  return (
    <IsoModule id="infra" start={0}>
      <Voxel color={ISO.graphite} position={[0, -1, 0]} size={[12, 1, 12]} />
      <mesh material={top} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[12, 12]} />
      </mesh>
      <BorderLights half={6} height={1} />
    </IsoModule>
  );
}

/* ---------------- sandboxes ---------------- */

const GLASS = [-4.75, -2.95].flatMap((x, ci) => [-1.9, -0.2, 1.5].map((z, ri) => ({ x, z, i: ci * 3 + ri })));
const GLASS_BOTS = [ISO.chart, ISO.white, ISO.white, ISO.white, ISO.orange, ISO.chart];

function GlassCube({ x, z, i, start }: { x: number; z: number; i: number; start: number }) {
  const { time, loop } = useIso();
  const mat = useMemo(() => new THREE.MeshLambertMaterial({ color: ISO.violet, transparent: true, opacity: 0.42, depthWrite: false }), []);
  useFrame(() => {
    mat.opacity = 0.36 + (loop ? Math.sin(time.current * 1.4 + i * 0.9) * 0.1 : 0.04);
  });
  return (
    <IsoModule start={start} position={[x, 0.35, z]}>
      <mesh geometry={unitBox} material={mat} position={[0, 0.78, 0]} scale={[1.5, 1.55, 1.5]} renderOrder={2}>
        <Edges color={ISO.architect} />
      </mesh>
      <PixelRobot color={GLASS_BOTS[i]} position={[0.05, 0, 0]} mode="idle" phase={i} scale={1.6} />
    </IsoModule>
  );
}

function Sandboxes() {
  return (
    <IsoModule id="sandbox" start={0.45} position={[-3.85, 0, -0.2]}>
      <Voxel color={ISO.architect} size={[3.8, 0.35, 5.3]} />
      <Voxel color={ISO.violet} position={[0, 0.35, 0]} size={[3.7, 0.01, 5.2]} />
      <group position={[3.85, 0, 0.2]}>
        {GLASS.map((c) => (
          <GlassCube key={c.i} {...c} start={0.75 + c.i * 0.09} />
        ))}
      </group>
    </IsoModule>
  );
}

/* ---------------- runtime ---------------- */

function Pad({ position }: { position: [number, number, number] }) {
  const { time, loop } = useIso();
  const m = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  const lo = useMemo(() => new THREE.Color("#8fa03a"), []);
  const hi = useMemo(() => new THREE.Color(ISO.chart), []);
  useFrame(() => {
    const k = loop ? 0.5 + 0.5 * Math.sin(time.current * 3 + position[0] * 2) : 1;
    mat.color.copy(lo).lerp(hi, k);
    m.current?.scale.set(0.7 + k * 0.08, 0.04, 0.7 + k * 0.08);
  });
  return <mesh ref={m} geometry={unitBox} material={mat} position={position} />;
}

function Runtime() {
  return (
    <IsoModule id="runtime" start={1.1} position={[0.6, 0, 0.6]}>
      <Voxel color={ISO.cobalt} size={[3.4, 1.2, 3.4]} />
      <Voxel color="#5058E6" position={[0, 1.2, 0]} size={[3.3, 0.01, 3.3]} />
      <Pad position={[-1.2, 1.22, -1.2]} />
      <Pad position={[1.2, 1.22, 1.2]} />
      <Pad position={[1.2, 1.22, -1.2]} />
      <PixelRobot color={ISO.chart} position={[-0.5, 1.2, -0.3]} mode="hop" phase={0} scale={1.25} hopStart={INTRO} />
      <PixelRobot color={ISO.orange} position={[0.2, 1.2, 0.5]} mode="hop" phase={1} scale={1.25} hopStart={INTRO} />
      <PixelRobot color={ISO.white} position={[0.4, 1.2, -0.75]} mode="hop" phase={2} scale={1.25} hopStart={INTRO} />
    </IsoModule>
  );
}

/* ---------------- inference ---------------- */

function Rack({ x, i, start }: { x: number; i: number; start: number }) {
  const { time, loop } = useIso();
  const led = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  const dim = useMemo(() => new THREE.Color("#7f9233"), []);
  const hi = useMemo(() => new THREE.Color(ISO.chart), []);
  useFrame(() => {
    const t = time.current;
    if (!loop) return void led.color.copy(hi);
    const near = clamp01(1 - Math.abs(((t * 1.6) % 6) - i)); // scan sweeps the 4 racks, then rests
    const flick = Math.sin(t * 37 + i * 11) > 0.6 ? 0.25 : 0; // activity-LED flicker
    led.color.copy(dim).lerp(hi, near * 0.7 + 0.3 - flick * (1 - near));
  });
  return (
    <IsoModule start={start} position={[x, 1, -4]}>
      <Voxel color={ISO.tealDark} size={[0.8, 0.5, 2.4]} />
      <mesh geometry={unitBox} material={led} scale={[0.66, 0.02, 2.2]} position={[0, 0.51, 0]} />
    </IsoModule>
  );
}

function Inference() {
  return (
    <IsoModule id="inference" start={1.5} position={[0.4, 0, -4]}>
      <Voxel color={ISO.teal} size={[4, 1, 3.2]} />
      <group position={[-0.4, 0, 4]}>
        {[-1.1, -0.1, 0.9, 1.9].map((x, i) => (
          <Rack key={i} x={x} i={i} start={1.7 + i * 0.1} />
        ))}
      </group>
    </IsoModule>
  );
}

/* ---------------- amber wall ---------------- */

const PILLARS: V2[] = (() => {
  const out: V2[] = [];
  for (let z = -4.6; z <= 4.25; z += 0.7) if (z < 0.3 || z > 1.7) out.push([3, z]);
  out.push([2.3, 4.2], [1.6, 4.2]);
  return out;
})();
const X_PILLAR = PILLARS[PILLARS.findIndex(([, z]) => Math.abs(z - 3.8) < 0.36)];

function Wall() {
  const { time } = useIso();
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useLambert(ISO.amber);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    PILLARS.forEach(([x, z], i) => {
      const p = Math.max(0.001, pop(time.current, 1.9 + i * 0.04, 0.45));
      o.position.set(x, 0.7 * p, z);
      o.scale.set(0.6, 1.4 * p, 0.6);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <IsoModule id="network" start={1.85}>
      <instancedMesh ref={ref} args={[unitBox, mat, PILLARS.length]} />
      <BlinkingX position={[X_PILLAR[0] + 0.305, 0.75, X_PILLAR[1]]} rotation={[0, Math.PI / 2, 0]} start={2.4} />
    </IsoModule>
  );
}

/* ---------------- free cubes ---------------- */

function FloatCube({ color, pos, size, start, phase, id, float = true }: { color: string; pos: [number, number, number]; size: number; start: number; phase: number; id?: string; float?: boolean }) {
  const m = useRef<THREE.Mesh>(null);
  useFloat(m, { amp: float ? 0.35 : 0, phase, base: size / 2 });
  const mat = useLambert(color);
  return (
    <IsoModule id={id} start={start} position={pos}>
      <mesh ref={m} geometry={unitBox} material={mat} scale={size} />
    </IsoModule>
  );
}

/* ---------------- scene ---------------- */

export default function IsoScene({ className, style, fallback, variant = "full" }: { className?: string; style?: React.CSSProperties; fallback?: React.ReactNode; variant?: "full" | "mini" }) {
  const mini = variant === "mini";
  return (
    <IsoCanvas
      className={className}
      style={style}
      callouts={mini ? [] : CALLOUTS}
      initialActive={1}
      introDuration={INTRO}
      fallback={fallback}
      {...(mini ? { artHeight: 752, pxPerUnit: 56, tilt: 0, timeScale: 0.6, cycleMs: 0 } : {})}
    >
      <Base />
      <PathTiles routes={ROUTES} start={2.5} />
      <Sandboxes />
      <Runtime />
      <Inference />
      <Wall />
      <FloatCube id="gateway" color={ISO.graphite} pos={[4.7, 0, -3.6]} size={1.5} start={2.3} phase={0} float={false} />
      <FloatCube color={ISO.white} pos={[5.0, 0, -0.6]} size={1.15} start={2.4} phase={1.2} />
      <FloatCube color={ISO.cobalt} pos={[4.6, 0, 2.3]} size={1.25} start={2.5} phase={2.4} />
      <FloatCube color={ISO.red} pos={[4.2, 0, 4.95]} size={1.15} start={2.6} phase={3.6} />
      <FloatCube id="network" color={ISO.white} pos={[-1.2, 0, 3.4]} size={0.5} start={2.7} phase={0.6} />
      <Packets routes={ROUTES} start={INTRO - 0.4} />
      <BurstPacket route={RED_ROUTE} start={INTRO + 0.8} />
    </IsoCanvas>
  );
}
