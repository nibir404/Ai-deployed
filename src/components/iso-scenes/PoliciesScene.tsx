"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BorderLights, ISO, IsoCanvas, IsoModule, Voxel, clamp01, pop, smooth, unitBox, useIso, useLambert, type Callout } from "@/components/iso";

/* Governance "Policies are data": a chain of policy-version cubes on a dark audit platform. Art frame 640×373. */

export type PolicyMode = "rollback" | "diff" | "export" | null;

const INTRO = 2.4;
const HALF = 6.2;
const CZ = -2.3; // chain lane (z)
const SLOT = (s: number) => -2.9 + s * 2.2; // slot → x
const CUBE = 1.35;
const PERIOD = 2.8;
const PALETTE = [ISO.cobalt, ISO.orange, ISO.chart, ISO.teal, ISO.violet];

const CALLOUTS: Callout[] = [
  { id: "s0", label: "VERSIONED RULES", side: "l", top: 32, inset: 0, icon: "data", anchor: [SLOT(0), CUBE, CZ], tip: "Every rule change is a new version. Nothing is overwritten." },
  { id: "s1", label: "SCOPED PER AGENT", side: "r", top: -2, inset: 0, icon: "boundary", anchor: [SLOT(1), CUBE, CZ], tip: "Each version applies to the agents it names, nothing else." },
  { id: "s2", label: "REVERSIBLE", side: "r", top: 85, inset: 0, icon: "gateway", anchor: [SLOT(2), CUBE, CZ], tip: "Roll back to any prior version in one click." },
  { id: "chain", label: "APPEND-ONLY CHAIN", side: "l", top: 235, inset: 0, icon: "runtime", anchor: [SLOT(1) - 0.3, 0, CZ + 0.7], tip: "New versions are appended; history is never rewritten." },
  { id: "audit", label: "TWO SYNCED LOGS", side: "r", top: 275, inset: 0, icon: "server", anchor: [2.6, 0.6, 4.1], tip: "Every input, output and decision, with timestamp, actor and context." },
];

function Platform() {
  return (
    <IsoModule start={0}>
      <Voxel color="#232322" position={[0, -0.6, 0]} size={[HALF * 2, 0.6, HALF * 2]} />
      <BorderLights half={HALF} height={0.6} perEdge={24} speed={0.18} />
    </IsoModule>
  );
}

/** Chain of version cubes. Six slots of state are kept so the chain can slide either way. */
function Chain({ mode }: { mode: React.MutableRefObject<PolicyMode> }) {
  const { time, loop, active, setHover, mobile } = useIso();
  const cubes = useRef<(THREE.Group | null)[]>([]);
  const links = useRef<(THREE.Mesh | null)[]>([]);
  const mats = useMemo(() => Array.from({ length: 6 }, () => new THREE.MeshLambertMaterial({ color: ISO.cobalt, transparent: true })), []);
  const linkMat = useLambert("#9A9A96");
  const slot = useMemo(() => new THREE.Color(), []);
  const own = useRef({ clock: 0, shift: 0, diff: 0 });
  const lift = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const activeRef = useRef(active);
  activeRef.current = active;

  useFrame((_, dt) => {
    const t = time.current;
    const st = own.current;
    const m = mode.current;
    // chain clock only advances while nothing on the page is asking for a state
    if (loop && t > INTRO && !m) st.clock += Math.min(dt, 0.1);
    st.shift += ((m === "rollback" ? 1 : 0) - st.shift) * Math.min(1, dt * 5);
    st.diff += ((m === "diff" ? 1 : 0) - st.diff) * Math.min(1, dt * 6);
    const u = st.clock / PERIOD;
    const base = Math.floor(u);
    const f = loop ? smooth(clamp01((u - base) / 0.35)) : 1;
    const intro = (j: number) => pop(t, 0.6 + j * 0.22);
    for (let j = 0; j < 6; j++) {
      const v = base - 2 + j;
      const sl = v - base + (1 - f) + st.shift; // slot position (0 = oldest shown, 3 = newest)
      const g = cubes.current[j];
      if (!g) continue;
      const vis = smooth(clamp01(sl + 1)) * clamp01(4 - sl);
      const appear = Math.max(0, Math.min(1.2, sl > 2.5 ? pop(4 - sl, 0, 1) : 1));
      const sc = Math.max(0.0001, vis * appear * (base === 0 && st.shift < 0.01 && t < INTRO + 1 ? intro(Math.round(sl)) : 1));
      const slotIdx = Math.round(sl);
      const hl = activeRef.current === `s${slotIdx}` ? 1 : 0;
      const isDiff = slotIdx === 1 || slotIdx === 2 ? 1 : 0;
      lift.current[j] += (Math.max(hl, isDiff * st.diff) * 0.35 - lift.current[j]) * Math.min(1, dt * 8);
      g.position.set(SLOT(sl), lift.current[j], CZ);
      g.scale.setScalar(sc);
      const mat = mats[j];
      mat.color.set(PALETTE[((v % 5) + 5) % 5]);
      mat.opacity = clamp01(sl + 1) * (1 - st.diff * 0.65 * (1 - isDiff));
      slot.set(ISO.white);
      mat.emissive.copy(isDiff && st.diff > 0.01 ? slot : mat.color);
      mat.emissiveIntensity = isDiff ? st.diff * (0.25 + 0.15 * Math.sin(t * 8)) + hl * 0.25 : hl * 0.25;
      const l = links.current[j];
      if (l) {
        // a link only shows while both the cube and its successor (at sl + 1) are visible
        const nsl = sl + 1;
        const nvis = smooth(clamp01(nsl + 1)) * clamp01(4 - nsl) * Math.max(0, Math.min(1.2, nsl > 2.5 ? pop(4 - nsl, 0, 1) : 1));
        const ls = Math.max(0.0001, Math.min(vis * appear, nvis) * (nvis > 0.35 ? 1 : 0));
        l.position.set(SLOT(sl + 0.5), 0.45 + lift.current[j] * 0.5, CZ);
        l.scale.set(0.95 * ls, 0.3 * ls, 0.3 * ls);
      }
    }
  });

  const hover = (j: number) =>
    mobile
      ? {}
      : {
          onPointerOver: () => {
            const g = cubes.current[j];
            if (g) setHover(`s${Math.round((g.position.x + 2.9) / 2.2)}`);
          },
          onPointerOut: () => setHover(null),
        };

  return (
    <group>
      {mats.map((mat, j) => (
        <group key={j} ref={(el) => void (cubes.current[j] = el)}>
          <group {...hover(j)}>
            <mesh geometry={unitBox} material={mat} position={[0, CUBE / 2, 0]} scale={[CUBE, CUBE * 0.78, CUBE]} />
          </group>
          {/* the black "≡" handle marks on the lid */}
          <Voxel color={ISO.ink} position={[-0.18, CUBE * 0.78, 0]} size={[0.14, 0.02, 0.8]} />
          <Voxel color={ISO.ink} position={[0.18, CUBE * 0.78, 0]} size={[0.14, 0.02, 0.8]} />
        </group>
      ))}
      {mats.map((_, j) => (
        <mesh key={j} ref={(el) => void (links.current[j] = el)} geometry={unitBox} material={linkMat} />
      ))}
    </group>
  );
}

/** Audit cube: big black block with a green log screen that ticks as entries append. */
function Audit() {
  const { time, loop } = useIso();
  const screen = useMemo(() => new THREE.MeshBasicMaterial({ color: "#3E9A6E", toneMapped: false }), []);
  const lo = useMemo(() => new THREE.Color("#2F7A57"), []);
  const hi = useMemo(() => new THREE.Color("#5FC28F"), []);
  useFrame(() => {
    const c = loop ? (time.current % PERIOD) / PERIOD : 1;
    screen.color.copy(lo).lerp(hi, c < 0.12 ? 1 - c / 0.12 : 0.15);
  });
  return (
    <IsoModule id="audit" start={1.4} position={[1.4, 0, 3.0]}>
      <Voxel color="#161616" size={[2.5, 2.0, 2.5]} />
      <Voxel color="#4A4A48" position={[0, 2.0, 0]} size={[2.51, 0.02, 2.51]} />
      <mesh geometry={unitBox} material={screen} position={[0, 2.035, 0]} scale={[1.95, 0.02, 1.95]} />
    </IsoModule>
  );
}

/** Gauge icon: a pixel ring standing above the back corner, needle sweeping. */
function Gauge() {
  const { time, loop } = useIso();
  const needle = useRef<THREE.Group>(null);
  const ink = useLambert(ISO.ink);
  const hand = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  const ring = useMemo(() => Array.from({ length: 20 }, (_, i) => (i / 20) * Math.PI * 2), []);
  useFrame(() => {
    if (needle.current) needle.current.rotation.z = loop ? -time.current * 1.6 : -0.9;
  });
  return (
    <IsoModule start={1.8} position={[-4.4, 2.2, -4.4]}>
      <group rotation={[0, Math.PI / 4, 0]}>
        {ring.map((a, i) => (
          <mesh key={i} geometry={unitBox} material={ink} position={[Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0]} rotation={[0, 0, a]} scale={[0.22, 0.3, 0.2]} />
        ))}
        <mesh geometry={unitBox} material={ink} position={[0.55, -0.9, 0]} rotation={[0, 0, -0.8]} scale={[0.22, 0.6, 0.2]} />
        <group ref={needle}>
          <mesh geometry={unitBox} material={hand} position={[0.25, 0, 0.05]} scale={[0.5, 0.12, 0.05]} />
        </group>
        <mesh geometry={unitBox} material={hand} position={[0, 0, 0.06]} scale={[0.14, 0.14, 0.05]} />
      </group>
    </IsoModule>
  );
}

/** Export: packets leave the newest version and fly off the right edge while "export" is active. */
function ExportPacket({ mode }: { mode: React.MutableRefObject<PolicyMode> }) {
  const { time } = useIso();
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const on = useRef(0);
  const t0 = useRef(0);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const want = mode.current === "export";
    if (want && !on.current) t0.current = time.current;
    on.current = want ? 1 : 0;
    for (let i = 0; i < 3; i++) {
      const c = want ? (time.current - t0.current - i * 0.45) % 1.35 : -1;
      if (c >= 0) {
        const k = c / 1.35;
        // from the last cube's lid out past the right (−z) side of the platform
        o.position.set(SLOT(3) + k * 1.5, CUBE + 0.3 + Math.sin(k * Math.PI) * 0.8, CZ - k * 7.5);
        o.scale.setScalar(0.32 * (1 - smooth(clamp01((k - 0.75) / 0.25))) + 0.0001);
      } else o.scale.setScalar(0.0001);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[unitBox, mat, 3]} />;
}

export default function PoliciesScene({ className, style, fallback, mode = null }: { className?: string; style?: React.CSSProperties; fallback?: React.ReactNode; mode?: PolicyMode }) {
  const modeRef = useRef<PolicyMode>(mode);
  modeRef.current = mode;
  return (
    <IsoCanvas className={className} style={style} artWidth={640} artHeight={373} pxPerUnit={30} lookAt={[0, 0.2, 0]} callouts={CALLOUTS} introDuration={INTRO} fallback={fallback} cycleMs={3200}>
      <Platform />
      <Chain mode={modeRef} />
      <Audit />
      <Gauge />
      <ExportPacket mode={modeRef} />
    </IsoCanvas>
  );
}
