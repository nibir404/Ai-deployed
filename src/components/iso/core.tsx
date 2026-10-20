"use client";

import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { createContext, useContext, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/** Art palette (from the design tokens). */
export const ISO = {
  violet: "#8B6CF0",
  architect: "#7B3FE0",
  cobalt: "#3B43D6",
  teal: "#3FA9A0",
  tealDark: "#1F5F5A",
  chart: "#D6F25C",
  amber: "#E8A23A",
  red: "#D9534F",
  graphite: "#1B1B1B",
  white: "#F2F2EE",
  orange: "#E8913A",
  olive: "#5E6B22",
  ink: "#111111",
} as const;

export type IsoState = {
  /** scene clock in seconds; advances only while visible, pinned to 1000 when motion is off */
  time: React.MutableRefObject<number>;
  /** 1 = loops run, 0 = render the static final state (reduced motion) */
  loop: number;
  mobile: boolean;
  /** id of the highlighted module (hovered, or auto-cycled callout) */
  active: string | null;
  setHover: (id: string | null) => void;
};

export const IsoContext = createContext<IsoState | null>(null);
export function useIso() {
  const c = useContext(IsoContext);
  if (!c) throw new Error("useIso must be used inside <IsoCanvas>");
  return c;
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (x: number) => x * x * (3 - 2 * x);

/** Springy 0→1 with overshoot (easeOutBack), starting at `start` seconds. */
export function pop(t: number, start: number, dur = 0.55) {
  const x = clamp01((t - start) / dur);
  const c1 = 2.2;
  const c3 = c1 + 1;
  return x === 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/** Shared unit cube; scale meshes instead of creating geometries. */
export const unitBox = new THREE.BoxGeometry(1, 1, 1);

/** Flat-shaded Lambert material (top/left/right faces get light/mid/dark from the key light). */
export function useLambert(color: string, extra?: THREE.MeshLambertMaterialParameters) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => new THREE.MeshLambertMaterial({ color, ...extra }), [color]);
}

/**
 * Staggered assemble animation for a group: drops in from `drop` units above and
 * springs its scale 0→1 at `start` seconds. Returns the progress getter.
 */
export function useIntroSequence(
  ref: React.RefObject<THREE.Group | null>,
  { start, position = [0, 0, 0], drop = 3, extra }: { start: number; position?: [number, number, number]; drop?: number; extra?: () => { lift: number; scale: number } },
) {
  const { time } = useIso();
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const t = time.current;
    const p = pop(t, start);
    const e = extra ? extra() : { lift: 0, scale: 1 };
    g.scale.setScalar(Math.max(0.0001, p) * e.scale);
    g.position.set(position[0], position[1] + (1 - clamp01((t - start) / 0.45)) * drop + e.lift, position[2]);
    g.visible = t > start;
  });
}

/**
 * A scene module: intro pop at `start`, and when `id` matches the active callout it
 * lifts, scales up 4% and glows. Hovering it activates the matching callout.
 */
export function IsoModule({ id, start, children, position = [0, 0, 0] }: { id?: string; start: number; children: React.ReactNode; position?: [number, number, number] }) {
  const { active, setHover, mobile } = useIso();
  const g = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshLambertMaterial[]>([]);
  const hl = useRef(0);

  useLayoutEffect(() => {
    const list: THREE.MeshLambertMaterial[] = [];
    g.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material;
      if (m instanceof THREE.MeshLambertMaterial && !list.includes(m)) list.push(m);
    });
    mats.current = list;
  }, []);

  useFrame((_, dt) => {
    const target = id && active === id ? 1 : 0;
    hl.current += (target - hl.current) * Math.min(1, dt * 8);
    for (const m of mats.current) {
      m.emissive.copy(m.color);
      m.emissiveIntensity = hl.current * 0.28;
    }
  });
  useIntroSequence(g, { start, position, extra: () => ({ lift: hl.current * 0.18, scale: 1 + hl.current * 0.04 }) });

  const handlers =
    id && !mobile
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
