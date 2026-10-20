"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BlinkingX, ISO, IsoCanvas, IsoModule, PixelRobot, clamp01, pop, smooth, unitBox, useIso, useLambert, type Callout } from "@/components/iso";

/* Governance hero: five stacked policy layers, a locked approval cube on top, a blocked bot below. Art frame 600×400. */

const INTRO = 2.6;
const H = 0.75; // layer thickness
const LAYERS = [
  { id: "l1", size: 11.5, color: "#3B82C4", name: "L1 VOICE" },
  { id: "l2", size: 9.3, color: ISO.architect, name: "L2 CLAIMS" },
  { id: "l3", size: 7.1, color: ISO.amber, name: "L3 POLICY" },
  { id: "l4", size: 5.1, color: "#3E9A6E", name: "L4 CONFIDENTIALITY" },
  { id: "l5", size: 3.5, color: ISO.teal, name: "L5 BRAND" },
];
const LOCK = 1.9;
const GAP = 0.75; // extra separation per layer in exploded view

const CALLOUTS: Callout[] = [
  { id: "lock", label: "APPROVED · LOCKED", side: "r", top: -4, inset: -40, icon: "shield", follow: "pyr-lock", anchor: [0.3, LOCK, 0.5], tip: "Only a draft that clears every layer is queued for human approval." },
  { id: "l5", label: LAYERS[4].name, side: "l", top: 77, inset: -40, icon: "boundary", follow: "pyr-l5", anchor: [-1.6, H, -0.4], tip: "Approved terminology and prohibited language enforced." },
  { id: "l4", label: LAYERS[3].name, side: "r", top: 135, inset: -40, icon: "data", follow: "pyr-l4", anchor: [2.5, H, -0.4], tip: "Sensitive fields stripped before the model. PII never sent." },
  { id: "l3", label: LAYERS[2].name, side: "l", top: 174, inset: -40, icon: "sandbox", follow: "pyr-l3", anchor: [-3.4, H, 0.6], tip: "Per-agent read, write and trigger rules, enforced before generation." },
  { id: "l2", label: LAYERS[1].name, side: "r", top: 232, inset: -40, icon: "gateway", follow: "pyr-l2", anchor: [4.6, H, -0.4], tip: "Any factual claim is checked against its linked source." },
  { id: "l1", label: LAYERS[0].name, side: "l", top: 255, inset: -40, icon: "shield", follow: "pyr-l1", anchor: [-5.75, H * 0.5, 1.5], tip: "Output reads as your voice: tone, register, vocabulary." },
];

/** Shared animation state written by <Driver> each frame and read by the pieces. */
type Shared = { explode: number; packetLayer: number; lock: number };

function Driver({ s, explode }: { s: React.MutableRefObject<Shared>; explode: boolean }) {
  const { time, loop, mobile } = useIso();
  const { gl } = useThree();
  useFrame((_, dt) => {
    // scroll: separate as the hero scrolls up out of view; hover: separate immediately
    const r = gl.domElement.getBoundingClientRect();
    const sc = loop ? clamp01((-r.top + r.height * 0.15) / (r.height * 0.5)) : 0;
    const target = Math.max(explode && !mobile ? 1 : 0, sc);
    s.current.explode += (target - s.current.explode) * Math.min(1, dt * 5);
    // request packet: climbs one layer every 0.55s, holds at the top, repeats every 6s
    const c = loop ? (time.current - INTRO) % 6 : 6;
    s.current.packetLayer = time.current < INTRO ? -1 : c / 0.55;
    s.current.lock = loop ? (c > 3.3 && c < 5.6 ? 1 : 0) : 1;
  });
  return null;
}

function Layer({ i, s }: { i: number; s: React.MutableRefObject<Shared> }) {
  const L = LAYERS[i];
  const inner = useRef<THREE.Group>(null);
  const mat = useLambert(L.color);
  const glow = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }), []);
  const flash = useRef(0);
  useFrame((_, dt) => {
    const p = s.current.packetLayer;
    const hit = p >= i && p < i + 1 ? 1 : 0;
    flash.current += (hit - flash.current) * Math.min(1, dt * (hit ? 18 : 4));
    if (inner.current) inner.current.position.y = s.current.explode * GAP * i;
    glow.opacity = flash.current * 0.42;
  });
  return (
    <IsoModule id={L.id} start={0.15 + i * 0.28} position={[0, i * H, 0]}>
      <group ref={inner} name={`pyr-${L.id}`}>
        <mesh geometry={unitBox} material={mat} position={[0, H / 2, 0]} scale={[L.size, H, L.size]} />
        <mesh geometry={unitBox} material={glow} position={[0, H / 2, 0]} scale={[L.size + 0.02, H + 0.02, L.size + 0.02]} renderOrder={3} />
      </group>
    </IsoModule>
  );
}

function Lock({ s }: { s: React.MutableRefObject<Shared> }) {
  const { time } = useIso();
  const inner = useRef<THREE.Group>(null);
  const shackle = useRef<THREE.Group>(null);
  const cube = useLambert(ISO.chart);
  const ink = useLambert(ISO.ink);
  const halo = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }), []);
  const lit = useMemo(() => new THREE.MeshBasicMaterial({ color: "#F4FFB8", transparent: true, opacity: 0, depthWrite: false, toneMapped: false }), []);
  const halo3 = useRef<THREE.Mesh>(null);
  const k = useRef(0);
  const click = useRef(0);
  useFrame((_, dt) => {
    const st = s.current;
    if (inner.current) inner.current.position.y = st.explode * GAP * LAYERS.length;
    const prev = k.current;
    k.current += (st.lock - k.current) * Math.min(1, dt * (st.lock ? 16 : 3));
    if (st.lock && prev < 0.5 && k.current >= 0.5) click.current = time.current;
    if (shackle.current) shackle.current.position.y = 0.3 * (1 - k.current);
    const g = st.lock ? Math.max(0, 1 - (time.current - click.current) / 1.2) : 0;
    lit.opacity = k.current * 0.25 + g * 0.45;
    halo.opacity = g * 0.45;
    halo3.current?.scale.setScalar(LOCK * (1.05 + (1 - g) * 0.5));
  });
  return (
    <IsoModule id="lock" start={0.15 + LAYERS.length * 0.28} position={[0, LAYERS.length * H, 0]}>
      <group ref={inner} name="pyr-lock">
        <mesh geometry={unitBox} material={cube} position={[0, LOCK / 2, 0]} scale={LOCK} />
        <mesh geometry={unitBox} material={lit} position={[0, LOCK / 2, 0]} scale={LOCK + 0.01} renderOrder={3} />
        <mesh ref={halo3} geometry={unitBox} material={halo} position={[0, LOCK / 2, 0]} />
        {/* padlock body + keyhole */}
        <group position={[-0.15, LOCK, -0.15]}>
          <mesh geometry={unitBox} material={ink} position={[0, 0.36, 0]} scale={[0.25, 0.62, 0.78]} />
          <mesh geometry={unitBox} material={cube} position={[0.13, 0.36, 0]} scale={[0.01, 0.22, 0.1]} />
          <group ref={shackle}>
            <mesh geometry={unitBox} material={ink} position={[0, 0.82, 0.27]} scale={[0.14, 0.42, 0.13]} />
            <mesh geometry={unitBox} material={ink} position={[0, 0.82, -0.27]} scale={[0.14, 0.42, 0.13]} />
            <mesh geometry={unitBox} material={ink} position={[0, 1.06, 0]} scale={[0.14, 0.13, 0.67]} />
          </group>
        </group>
      </group>
    </IsoModule>
  );
}

/** Request packet: hops up the front staircase, one layer per step, then enters the lock cube. */
function Packet({ s }: { s: React.MutableRefObject<Shared> }) {
  const m = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.chart, toneMapped: false }), []);
  useFrame(() => {
    const p = s.current.packetLayer;
    const mesh = m.current;
    if (!mesh) return;
    if (p < 0 || p > LAYERS.length + 0.6) return void (mesh.visible = false);
    mesh.visible = true;
    const i = Math.min(LAYERS.length - 1, Math.floor(p));
    const f = p - Math.floor(p);
    const ex = s.current.explode * GAP;
    const at = (j: number) => {
      // front edge of layer j (on the +x/+z diagonal), just inside its border
      const d = Math.min(LAYERS[Math.min(j, LAYERS.length - 1)].size / 2 - 0.35, 99);
      const top = (Math.min(j, LAYERS.length) + 1) * H + ex * Math.min(j, LAYERS.length);
      return j >= LAYERS.length ? new THREE.Vector3(0, LAYERS.length * H + ex * LAYERS.length + LOCK * 0.5, 0) : new THREE.Vector3(d * 0.75, top, d * 0.75);
    };
    const a = at(i);
    const b = at(i + 1);
    const e = smooth(clamp01(f / 0.6));
    mesh.position.lerpVectors(a, b, e);
    mesh.position.y += 0.15 + Math.sin(e * Math.PI) * 0.6;
    mesh.scale.setScalar(p > LAYERS.length ? 0.3 * (1 - clamp01((p - LAYERS.length) / 0.6)) + 0.0001 : 0.3);
  });
  return <mesh ref={m} geometry={unitBox} material={mat} />;
}

/** Red invader bot: walks to the front corner, tries to climb L1, gets knocked back. Red dotted line flickers. */
function Invader() {
  const { time, loop } = useIso();
  const g = useRef<THREE.Group>(null);
  const dots = useRef<THREE.InstancedMesh>(null);
  const red = useMemo(() => new THREE.MeshBasicMaterial({ color: ISO.red, toneMapped: false, transparent: true }), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const C = LAYERS[0].size / 2; // front corner at (C, 0, C)
  useFrame(() => {
    const t = time.current - INTRO - 0.6;
    const c = loop ? ((t % 4) + 4) % 4 : 0;
    // 0–1.2 approach, 1.2–1.6 jump at the edge, 1.6–2.3 knocked back, rest idle
    let d = 2.4;
    let y = 0;
    if (t > 0) {
      if (c < 1.2) d = 2.4 - smooth(c / 1.2) * 1.5;
      else if (c < 1.6) {
        const k = (c - 1.2) / 0.4;
        d = 0.9 - k * 0.45;
        y = Math.sin(k * Math.PI * 0.85) * 0.75;
      } else if (c < 2.3) {
        const k = (c - 1.6) / 0.7;
        d = 0.45 + smooth(k) * 1.95;
        y = Math.abs(Math.sin(k * Math.PI * 2)) * 0.35 * (1 - k);
      }
    }
    const appear = pop(time.current, 1.6);
    g.current?.position.set(C + d * 0.707, y - H * 0, C + d * 0.707);
    g.current?.scale.setScalar(Math.max(0.0001, appear) * 1.5);
    const hitFlash = t > 0 && c > 1.5 && c < 2.1;
    red.opacity = time.current < 2 ? 0 : loop ? (hitFlash ? (Math.floor(time.current * 16) % 2 ? 1 : 0.15) : Math.sin(time.current * 9) > -0.3 ? 0.9 : 0.35) : 0.9;
    const m = dots.current;
    if (!m) return;
    for (let i = 0; i < 6; i++) {
      const k = 0.35 + i * 0.32; // dotted path from the bot's start to the blocked corner
      o.position.set(C + k * 0.707, 0.05, C + k * 0.707);
      o.scale.set(0.13, 0.05, 0.13);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <group ref={g}>
        <PixelRobot color={ISO.red} position={[0, 0, 0]} mode="idle" phase={2} />
      </group>
      {/* red dotted line rising from the bot's landing spot to the blocked corner */}
      <instancedMesh ref={dots} args={[unitBox, red, 6]} />
      <BlinkingX position={[C + 0.01, H * 0.5, C - 0.5]} rotation={[0, Math.PI / 2, 0]} size={0.45} start={INTRO} rate={3} />
    </>
  );
}

export default function PyramidScene({ className, style, fallback, explode = false }: { className?: string; style?: React.CSSProperties; fallback?: React.ReactNode; explode?: boolean }) {
  const s = useRef<Shared>({ explode: 0, packetLayer: -1, lock: 0 });
  return (
    <IsoCanvas className={className} style={style} artWidth={600} artHeight={400} pxPerUnit={30} lookAt={[0, 1.2, 0]} callouts={CALLOUTS} introDuration={INTRO} fallback={fallback} cycleMs={3000}>
      <Driver s={s} explode={explode} />
      {LAYERS.map((_, i) => (
        <Layer key={i} i={i} s={s} />
      ))}
      <Lock s={s} />
      <Packet s={s} />
      <Invader />
    </IsoCanvas>
  );
}
