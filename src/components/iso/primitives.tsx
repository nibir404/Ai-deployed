"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ISO, clamp01, smooth, unitBox, useIso, useLambert } from "./core";

export type V2 = [number, number];
export type V3 = [number, number, number];

/* ---------------- Voxel ---------------- */

/** Box sitting ON y=position[1] (not centred), flat Lambert-shaded. */
export function Voxel({ color, position = [0, 0, 0], size = [1, 1, 1], material, ...rest }: { color?: string; position?: V3; size?: V3; material?: THREE.Material } & Omit<React.ComponentProps<"mesh">, "position" | "scale" | "material">) {
  const own = useLambert(color ?? "#ffffff");
  return <mesh geometry={unitBox} material={material ?? own} position={[position[0], position[1] + size[1] / 2, position[2]]} scale={size} {...rest} />;
}

/* ---------------- float / bob ---------------- */

/** Sine bob applied to a ref'd object's y. amp in world units, speed in rad/s. */
export function useFloat(ref: React.RefObject<THREE.Object3D | null>, { amp = 0.35, speed = 0.9, phase = 0, base = 0 } = {}) {
  const { time, loop } = useIso();
  useFrame(() => {
    if (ref.current) ref.current.position.y = base + (loop ? (Math.sin(time.current * speed + phase) * 0.5 + 0.5) * amp : 0);
  });
}

/* ---------------- PixelRobot ---------------- */

/** Little voxel robot. mode "idle": bob + occasional turn. mode "hop": hops in sequence by `phase` (3s cycle). Always blinks. */
export function PixelRobot({ color, position, mode = "idle", phase = 0, scale = 1, hopStart = 3.4 }: { color: string; position: V3; mode?: "idle" | "hop"; phase?: number; scale?: number; hopStart?: number }) {
  const { time, loop } = useIso();
  const g = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const body = useLambert(color);
  const dark = useLambert(ISO.ink);

  useFrame(() => {
    if (!g.current || !eyes.current) return;
    const t = time.current;
    let y = 0;
    let rot = 0;
    if (loop) {
      if (mode === "idle") {
        y = Math.sin(t * 2.2 + phase * 2) * 0.05;
        const c = (t + phase * 3.1) % 7;
        rot = c < 1.4 ? Math.sin((c / 1.4) * Math.PI) * 0.9 : 0;
      } else {
        const c = (t - hopStart + 3 - phase * 0.45) % 3;
        if (c > 0 && c < 0.55) y = Math.sin((c / 0.55) * Math.PI) * 0.45;
      }
    }
    g.current.position.set(position[0], position[1] + y, position[2]);
    g.current.rotation.y = rot;
    const b = loop ? (t + phase * 0.37) % 3.2 : 1;
    eyes.current.scale.y = b < 0.12 ? 0.15 : 1;
  });

  return (
    <group ref={g} scale={scale}>
      <mesh geometry={unitBox} material={dark} position={[0, 0.06, 0.08]} scale={[0.1, 0.12, 0.1]} />
      <mesh geometry={unitBox} material={dark} position={[0, 0.06, -0.08]} scale={[0.1, 0.12, 0.1]} />
      <mesh geometry={unitBox} material={body} position={[0, 0.25, 0]} scale={[0.3, 0.26, 0.36]} />
      <mesh geometry={unitBox} material={dark} position={[0.151, 0.24, 0]} scale={[0.01, 0.12, 0.16]} />
      <mesh geometry={unitBox} material={body} position={[0, 0.27, 0.24]} scale={[0.1, 0.1, 0.1]} />
      <mesh geometry={unitBox} material={body} position={[0, 0.27, -0.24]} scale={[0.1, 0.1, 0.1]} />
      <mesh geometry={unitBox} material={body} position={[0, 0.52, 0]} scale={[0.34, 0.26, 0.42]} />
      <mesh geometry={unitBox} material={dark} position={[0, 0.7, 0]} scale={[0.08, 0.1, 0.08]} />
      <group ref={eyes} position={[0.171, 0.53, 0]}>
        <mesh geometry={unitBox} material={dark} position={[0, 0, 0.1]} scale={[0.01, 0.09, 0.07]} />
        <mesh geometry={unitBox} material={dark} position={[0, 0, -0.1]} scale={[0.01, 0.09, 0.07]} />
      </group>
    </group>
  );
}

/* ---------------- paths + packets ---------------- */

export function routeLen(r: V2[]) {
  let l = 0;
  for (let i = 1; i < r.length; i++) l += Math.hypot(r[i][0] - r[i - 1][0], r[i][1] - r[i - 1][1]);
  return l;
}
/** Point at fraction f (0..1) along an x/z polyline. */
export function along(r: V2[], f: number): V2 {
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

/** Instanced flat tiles laid along routes; they pop in one by one from `start`. */
export function PathTiles({ routes, color = ISO.olive, start = 2.5, width = 0.82, step = 0.8 }: { routes: V2[][]; color?: string; start?: number; width?: number; step?: number }) {
  const { time } = useIso();
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useLambert(color);
  const tiles = useMemo(() => {
    const out: V2[] = [];
    for (const r of routes) {
      const n = Math.max(1, Math.round(routeLen(r) / step));
      for (let i = 0; i <= n; i++) out.push(along(r, i / n));
    }
    return out;
  }, [routes, step]);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    tiles.forEach(([x, z], i) => {
      const p = Math.max(0.001, clamp01((time.current - start - i * 0.025) / 0.25));
      o.position.set(x, 0.015, z);
      o.scale.set(width * p, 0.03, width * p);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[unitBox, mat, tiles.length]} />;
}

/** Small glowing cubes travelling along routes forever (instanced). Hidden before `start` and under reduced motion. */
export function Packets({ routes, color = ISO.chart, perRoute = 4, speed = 1.4, size = 0.24, start = 3, y = 0.2 }: { routes: V2[][]; color?: string; perRoute?: number; speed?: number; size?: number; start?: number; y?: number }) {
  const { time, loop, mobile } = useIso();
  const per = mobile ? Math.max(1, Math.ceil(perRoute / 2)) : perRoute;
  const ref = useRef<THREE.InstancedMesh>(null);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, toneMapped: false }), [color]);
  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current - start;
    let k = 0;
    routes.forEach((r, ri) => {
      const sp = speed / routeLen(r);
      for (let i = 0; i < per; i++) {
        const f = (((t * sp + i / per + ri * 0.13) % 1) + 1) % 1;
        const [x, z] = along(r, f);
        const fade = clamp01(Math.min(f / 0.06, (1 - f) / 0.06));
        o.position.set(x, y + Math.abs(Math.sin(f * 40)) * 0.06, z);
        o.scale.setScalar(loop && t > 0 ? Math.max(0.0001, size * fade) : 0.0001);
        o.updateMatrix();
        m.setMatrixAt(k++, o.matrix);
      }
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh key={per} ref={ref} args={[unitBox, mat, routes.length * per]} />;
}

/** A packet that travels a route, hits the end and bursts into shards (e.g. a blocked request). */
export function BurstPacket({ route, color = ISO.red, start = 4.2, cycle = 4.2, travel = 1.6, y = 0.2 }: { route: V2[]; color?: string; start?: number; cycle?: number; travel?: number; y?: number }) {
  const { time, loop } = useIso();
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 9;
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, toneMapped: false }), [color]);
  const o = useMemo(() => new THREE.Object3D(), []);
  const dirs = useMemo(() => Array.from({ length: N - 1 }, (_, i) => {
    const a = (i / (N - 1)) * Math.PI * 2;
    return [0.6 + ((i * 37) % 10) / 16, Math.cos(a) * 1.4, Math.sin(a) * 1.4] as V3;
  }), []);
  const end = route[route.length - 1];
  const back = route[route.length - 2] ?? route[0];
  const dir = useMemo(() => {
    const l = Math.hypot(back[0] - end[0], back[1] - end[1]) || 1;
    return [(back[0] - end[0]) / l, (back[1] - end[1]) / l] as V2;
  }, [back, end]);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.current - start;
    const c = ((t % cycle) + cycle) % cycle;
    const on = loop && t > 0;
    if (on && c < travel) {
      const [x, z] = along(route, smooth(c / travel) * 0.6 + (c / travel) * 0.4);
      o.position.set(x, y, z);
      o.scale.setScalar(0.24);
    } else o.scale.setScalar(0.0001);
    o.updateMatrix();
    m.setMatrixAt(0, o.matrix);
    const b = (c - travel) / 0.7;
    dirs.forEach((d, i) => {
      if (on && b > 0 && b < 1) {
        // shards bounce back off the obstacle
        const sx = dir[0] * d[0] * b * 0.6 - dir[1] * d[2] * b * 0.5;
        const sz = dir[1] * d[0] * b * 0.6 + dir[0] * d[2] * b * 0.5;
        o.position.set(end[0] + sx, y + d[1] * b * 0.35 + 0.3 * b - 0.5 * b * b, end[1] + sz);
        o.scale.setScalar(0.1 * (1 - b));
      } else o.scale.setScalar(0.0001);
      o.updateMatrix();
      m.setMatrixAt(i + 1, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[unitBox, mat, N]} />;
}

/* ---------------- BlinkingX ---------------- */

/** Red X decal that blinks (a "blocked" signal). Place on a face; rotation orients the plane (default faces +z). */
export function BlinkingX({ position, rotation = [0, 0, 0], size = 0.5, color = ISO.red, start = 0, rate = 2.5 }: { position: V3; rotation?: V3; size?: number; color?: string; start?: number; rate?: number }) {
  const { time, loop } = useIso();
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, toneMapped: false, transparent: true }), [color]);
  useFrame(() => {
    const t = time.current;
    mat.opacity = t < start ? 0 : loop ? (Math.floor(t * rate) % 2 === 0 ? 1 : 0.25) : 1;
  });
  return (
    <group position={position} rotation={rotation}>
      <mesh material={mat} rotation={[0, 0, Math.PI / 4]} scale={[size, size * 0.14, 1]}>
        <planeGeometry />
      </mesh>
      <mesh material={mat} rotation={[0, 0, -Math.PI / 4]} scale={[size, size * 0.14, 1]}>
        <planeGeometry />
      </mesh>
    </group>
  );
}

/* ---------------- BorderLights ---------------- */

/** Dashed chartreuse lights around a square platform (top inset + the two visible side faces), with a chasing highlight. */
export function BorderLights({ half = 6, height = 1, perEdge = 22, color = ISO.chart, dimColor = "#6f7d2c", speed = 0.22 }: { half?: number; height?: number; perEdge?: number; color?: string; dimColor?: string; speed?: number }) {
  const { time, loop, mobile } = useIso();
  const ref = useRef<THREE.InstancedMesh>(null);
  const pts = useMemo(() => {
    const out: { p: V3; s: V3; k: number }[] = [];
    const i0 = half - 0.35;
    const corners: V2[] = [[-i0, -i0], [i0, -i0], [i0, i0], [-i0, i0]];
    for (let e = 0; e < 4; e++) {
      const [ax, az] = corners[e];
      const [bx, bz] = corners[(e + 1) % 4];
      const horiz = Math.abs(bx - ax) > 0;
      for (let i = 0; i < perEdge; i++) {
        const f = (i + 0.5) / perEdge;
        out.push({ p: [ax + (bx - ax) * f, 0.02, az + (bz - az) * f], s: horiz ? [0.22, 0.04, 0.08] : [0.08, 0.04, 0.22], k: (e * perEdge + i) / (4 * perEdge) });
      }
    }
    for (let i = 0; i < perEdge; i++) {
      const f = (i + 0.5) / perEdge;
      out.push({ p: [half + 0.01, -height / 2, -half + 2 * half * f], s: [0.02, 0.06, 0.22], k: 0.25 + f * 0.25 });
      out.push({ p: [half - 2 * half * f, -height / 2, half + 0.01], s: [0.22, 0.06, 0.02], k: 0.5 + f * 0.25 });
    }
    return out;
  }, [half, height, perEdge]);
  const col = useMemo(() => new THREE.Color(), []);
  const dim = useMemo(() => new THREE.Color(dimColor), [dimColor]);
  const hot = useMemo(() => new THREE.Color(color), [color]);

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
    const head = (time.current * speed) % 1;
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
    <instancedMesh ref={ref} args={[unitBox, undefined, pts.length]}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
