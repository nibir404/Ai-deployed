"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BorderLights,
  ISO,
  IsoCanvas,
  IsoModule,
  PixelRobot,
  Voxel,
  along,
  clamp01,
  smooth,
  unitBox,
  useIso,
  useLambert,
  type Callout,
  type V2,
} from "@/components/iso";

/* Platform "02 Approve": approval gate. 10×10 base centred on the origin; road runs along +x
   through the barrier (which spans −z from the gatehouse) and turns into the building. */

const INTRO = 2.6;
const HALF = 5;
const IDLE_GAP = 5; // seconds between auto-approvals when nobody clicks
const CYCLE = 4.6; // length of one approve cycle

const START: V2 = [-4.4, 0.2];
const WAIT: V2 = [-1.9, 0.2];
const ENTER: V2[] = [WAIT, [1.0, 0.2], [1.0, -0.55]];

const CALLOUTS: Callout[] = [
  { id: "draft", label: "AGENT DRAFT", side: "l", top: 46, inset: 0, icon: "data", anchor: [-1.9, 1.75, 0.2], tip: "The agent prepares the action. It cannot send it." },
  { id: "you", label: "YOU APPROVE", side: "l", top: 286, inset: 0, icon: "shield", anchor: [-0.25, 0.9, 3.4], tip: "Approve, edit or reject from the queue." },
  { id: "systems", label: "YOUR SYSTEMS", side: "r", top: 58, inset: 0, icon: "infra", anchor: [2.6, 2.6, -2.6], tip: "Only approved items ever reach them." },
  { id: "gate", label: "APPROVAL GATE", side: "r", top: 248, inset: 0, icon: "gateway", anchor: [0.1, 1.15, 2.2], tip: "Every draft stops here first." },
];

/** Shared gate state, written by the scene controller each frame. */
type Gate = { cycle: number; edit: number; lift: number };

/* ---------------- controller: clicks + idle auto-cycle ---------------- */

function useGate(approveSignal: number, editSignal: number) {
  const { time, loop } = useIso();
  const gate = useRef<Gate>({ cycle: -99, edit: -99, lift: 0 });
  const pendingApprove = useRef(0);
  const pendingEdit = useRef(0);
  const seen = useRef({ a: approveSignal, e: editSignal });

  useEffect(() => {
    if (approveSignal !== seen.current.a) pendingApprove.current++;
    if (editSignal !== seen.current.e) pendingEdit.current++;
    seen.current = { a: approveSignal, e: editSignal };
  }, [approveSignal, editSignal]);

  useFrame(() => {
    const t = time.current;
    const g = gate.current;
    if (!loop) return void (g.lift = 0);
    const busy = t - g.cycle < CYCLE;
    if (pendingEdit.current && !busy) {
      g.edit = t;
      pendingEdit.current = 0;
    }
    if (pendingApprove.current && !busy) {
      g.cycle = t;
      pendingApprove.current--;
    } else if (!busy && t > INTRO + 1.5 && t - Math.max(g.cycle + CYCLE, g.edit + 1.4) > IDLE_GAP) {
      g.cycle = t;
    }
    const p = t - g.cycle;
    g.lift = p < 0.6 ? smooth(clamp01(p / 0.6)) : p < 2.3 ? 1 : smooth(clamp01(1 - (p - 2.3) / 0.6));
  });
  return gate;
}

/* ---------------- base + road ---------------- */

function Base() {
  return (
    <IsoModule start={0}>
      <Voxel color={ISO.graphite} position={[0, -0.6, 0]} size={[HALF * 2, 0.6, HALF * 2]} />
      <Voxel color="#2c2c2a" position={[0, -0.01, 0]} size={[HALF * 2 - 0.02, 0.02, HALF * 2 - 0.02]} />
      {/* road: along x through the gate, then a spur up to the building door */}
      <Voxel color="#1d1d1c" position={[-0.6, 0.0, 0.2]} size={[8.2, 0.025, 2.2]} />
      <Voxel color="#1d1d1c" position={[1.0, 0.0, -0.4]} size={[2.2, 0.025, 1.6]} />
      <group position={[0, 0.0, 0]}>
        <BorderLights half={HALF} height={0.6} perEdge={18} />
      </group>
      {/* sign post by the queue */}
      <Voxel color={ISO.white} position={[-2.7, 0.3, -1.7]} size={[0.12, 0.7, 0.55]} />
      <Voxel color="#9a9a96" position={[-2.7, 0, -1.7]} size={[0.06, 0.3, 0.06]} />
    </IsoModule>
  );
}

/* ---------------- gatehouse + boom barrier ---------------- */

function Gatehouse({ gate }: { gate: React.MutableRefObject<Gate> }) {
  const { time, loop } = useIso();
  const arm = useRef<THREE.Group>(null);
  const lamp = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.red, toneMapped: false }), []);
  const red = useMemo(() => new THREE.Color(ISO.red), []);
  const off = useMemo(() => new THREE.Color("#5a2422"), []);
  const green = useMemo(() => new THREE.Color("#4fc36b"), []);
  const stripes = useMemo(() => Array.from({ length: 7 }, (_, i) => i), []);

  useFrame(() => {
    const l = gate.current.lift;
    if (arm.current) arm.current.rotation.x = l * 1.25;
    if (l > 0.05) lamp.color.copy(green);
    else lamp.color.copy(!loop || Math.sin(time.current * 7) > 0 ? red : off);
  });

  return (
    <IsoModule id="gate" start={0.6} position={[0.1, 0, 2.2]}>
      <Voxel color="#cfcfcb" size={[1.1, 1.0, 1.1]} />
      <Voxel color="#e9e9e5" position={[0, 1.0, 0]} size={[1.16, 0.06, 1.16]} />
      {/* screen panel on the top: chartreuse status + red alert tile, like the art */}
      <Voxel color={ISO.chart} position={[-0.22, 1.06, -0.2]} size={[0.32, 0.02, 0.32]} />
      <mesh geometry={unitBox} material={lamp} position={[0.24, 1.14, 0.22]} scale={[0.26, 0.14, 0.26]} />
      {/* boom: pivot on the gatehouse, arm spans −z across the road */}
      <group ref={arm} position={[0, 0.82, -0.62]}>
        <Voxel color="#8a8a86" position={[0, -0.12, 0.05]} size={[0.3, 0.24, 0.2]} />
        {stripes.map((i) => (
          <Voxel key={i} color={i % 2 ? ISO.white : ISO.orange} position={[0, -0.09, -0.05 - i * 0.42 - 0.21]} size={[0.18, 0.18, 0.42]} />
        ))}
      </group>
    </IsoModule>
  );
}

/* ---------------- robot carrying the draft ---------------- */

function DraftBot({ gate }: { gate: React.MutableRefObject<Gate> }) {
  const { time, loop } = useIso();
  const g = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const pmat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.white, toneMapped: false }), []);

  useFrame(() => {
    const o = g.current;
    if (!o) return;
    const t = time.current;
    const { cycle, edit } = gate.current;
    let pos: V2 = WAIT;
    let rot = 0;
    let s = 1;
    let step = 0;
    if (loop) {
      const p = t - cycle;
      if (p >= 0.35 && p < 2.05) {
        // walk through the open gate to the door
        const f = smooth(clamp01((p - 0.35) / 1.6));
        pos = along(ENTER, f);
        rot = f > 0.72 ? -Math.PI / 2 * smooth(clamp01((f - 0.72) / 0.12)) : 0;
        s = 1 - smooth(clamp01((p - 1.75) / 0.3));
        step = 1;
      } else if (p >= 2.05 && p < 2.6) {
        s = 0;
      } else {
        // first arrival (intro) or a fresh draft after a cycle: walk from the road start to the gate
        const from = p >= 2.6 && p < 4.4 ? p - 2.6 : t - (INTRO - 0.6);
        const f = smooth(clamp01(from / 1.6));
        pos = [START[0] + (WAIT[0] - START[0]) * f, WAIT[1]];
        s = p >= 2.6 && p < 2.9 ? smooth(clamp01((p - 2.6) / 0.3)) : 1;
        step = f < 1 ? 1 : 0;
        // EDIT: turns back for a moment, takes a step away, then returns
        const e = t - edit;
        if (e >= 0 && e < 1.4) {
          const k = Math.sin((e / 1.4) * Math.PI);
          rot = Math.PI * smooth(clamp01(e / 0.25)) * (e > 1.15 ? smooth(clamp01((1.4 - e) / 0.25)) : 1);
          pos = [pos[0] - k * 0.5, pos[1]];
          step = 1;
        }
      }
    }
    const hop = step ? Math.abs(Math.sin(t * 11)) * 0.08 : 0;
    o.position.set(pos[0], hop, pos[1]);
    o.rotation.y = rot;
    o.scale.setScalar(Math.max(0.0001, s));
    if (packet.current) packet.current.position.y = 1.05 + Math.sin(t * 4) * 0.03 * loop;
  });

  return (
    <IsoModule id="draft" start={1.0}>
      <group ref={g} position={[WAIT[0], 0, WAIT[1]]}>
        <PixelRobot color={ISO.chart} position={[0, 0, 0]} mode="idle" phase={0.4} scale={1.9} />
        {/* the draft packet, held out in front */}
        <mesh ref={packet} geometry={unitBox} material={pmat} position={[0.62, 1.05, 0]} scale={[0.3, 0.22, 0.38]} />
        <Voxel color={ISO.cobalt} position={[0.62, 1.15, 0]} size={[0.31, 0.04, 0.2]} />
      </group>
    </IsoModule>
  );
}

/* ---------------- the person ---------------- */

function Person() {
  const { time, loop } = useIso();
  const g = useRef<THREE.Group>(null);
  const blue = useLambert(ISO.cobalt);
  const skin = useLambert("#f1cfae");
  const hair = useLambert(ISO.ink);
  useFrame(() => {
    if (g.current) g.current.position.y = loop ? Math.max(0, Math.sin(time.current * 2.4)) * 0.03 : 0;
  });
  return (
    <IsoModule id="you" start={0.9} position={[-0.35, 0, 3.35]}>
      <group ref={g}>
        <mesh geometry={unitBox} material={blue} position={[0, 0.2, 0.12]} scale={[0.22, 0.4, 0.18]} />
        <mesh geometry={unitBox} material={blue} position={[0, 0.2, -0.12]} scale={[0.22, 0.4, 0.18]} />
        <mesh geometry={unitBox} material={blue} position={[0, 0.62, 0]} scale={[0.36, 0.46, 0.62]} />
        <mesh geometry={unitBox} material={skin} position={[0, 1.04, 0]} scale={[0.36, 0.36, 0.36]} />
        <mesh geometry={unitBox} material={hair} position={[-0.03, 1.25, 0]} scale={[0.4, 0.1, 0.4]} />
      </group>
    </IsoModule>
  );
}

/* ---------------- building with window sweep ---------------- */

const LIT = new Set([0, 1, 3, 4, 6, 7, 9, 10]); // left-face windows that are chartreuse at rest (as drawn)

function Building({ gate }: { gate: React.MutableRefObject<Gate> }) {
  const { time, loop } = useIso();
  const W = 3.6;
  const H = 2.7;
  const wins = useMemo(() => {
    const out: { pos: [number, number, number]; scale: [number, number, number]; col: number; row: number; rest: boolean; face: number }[] = [];
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 4; col++) {
        const off = -W / 2 + 0.5 + col * ((W - 1) / 3);
        const y = 0.55 + row * 0.75;
        // +z face (left, mid tone) and +x face (right, dark)
        out.push({ pos: [off, y, W / 2 + 0.01], scale: [0.42, 0.42, 0.02], col, row, rest: LIT.has(row * 4 + col), face: 0 });
        out.push({ pos: [W / 2 + 0.01, y, -off], scale: [0.02, 0.42, 0.42], col: col + 4, row, rest: false, face: 1 });
      }
    return out;
  }, []);
  const mats = useMemo(() => wins.map(() => new THREE.MeshBasicMaterial({ toneMapped: false })), [wins]);
  const lav = useMemo(() => new THREE.Color("#8A90F7"), []);
  const lavDark = useMemo(() => new THREE.Color("#7076df"), []);
  const hot = useMemo(() => new THREE.Color(ISO.chart), []);

  useFrame(() => {
    const p = loop ? time.current - gate.current.cycle : 99;
    wins.forEach((w, i) => {
      // sweep: a wave from the door outwards, column by column, after the robot enters
      const s = p - 1.9 - w.col * 0.09 - (2 - w.row) * 0.05;
      const k = s < 0 ? 0 : s < 0.12 ? s / 0.12 : clamp01(1 - (s - 0.12) / 1.6);
      const base = w.rest ? hot : w.face ? lavDark : lav;
      mats[i].color.copy(base).lerp(hot, k);
    });
  });

  return (
    <IsoModule id="systems" start={0.3} position={[2.6, 0, -2.6]}>
      <Voxel color={ISO.cobalt} size={[W, H, W]} />
      <Voxel color="#5058E6" position={[0, H, 0]} size={[W - 0.06, 0.02, W - 0.06]} />
      {/* door facing the road spur */}
      <Voxel color="#1e2280" position={[-1.6, 0, W / 2 + 0.005]} size={[0.6, 0.85, 0.02]} />
      {wins.map((w, i) => (
        <mesh key={i} geometry={unitBox} material={mats[i]} position={w.pos} scale={w.scale} />
      ))}
    </IsoModule>
  );
}

/* ---------------- scene ---------------- */

function Gate({ approveSignal, editSignal }: { approveSignal: number; editSignal: number }) {
  const gate = useGate(approveSignal, editSignal);
  return (
    <>
      <Base />
      <Building gate={gate} />
      <Gatehouse gate={gate} />
      <Person />
      <DraftBot gate={gate} />
    </>
  );
}

export default function GateScene({
  approveSignal = 0,
  editSignal = 0,
  className,
  style,
  fallback,
}: {
  /** increment to run one approve cycle (barrier lifts, robot delivers) */
  approveSignal?: number;
  /** increment to make the robot turn back briefly */
  editSignal?: number;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}) {
  return (
    <IsoCanvas
      className={className}
      style={style}
      artWidth={640}
      artHeight={318}
      pxPerUnit={34}
      lookAt={[0.3, 0.4, 0.3]}
      callouts={CALLOUTS}
      initialActive={2}
      introDuration={INTRO}
      fallback={fallback}
    >
      <Gate approveSignal={approveSignal} editSignal={editSignal} />
    </IsoCanvas>
  );
}
