"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

const vert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

// Ordered-dither pixel field. Density ramps toward the bottom edge (matching the
// "Dither texture" in the Paper CTA) and swells around the pointer.
const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uCell;
uniform float uMode; // 0 = bottom ramp, 1 = full field

float bayer4(vec2 p) {
  vec2 q = mod(p, 4.0);
  int i = int(q.x) + int(q.y) * 4;
  float m[16];
  m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;
  m[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;
  for (int k=0;k<16;k++){ if(k==i) return m[k]/16.; }
  return 0.;
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

void main() {
  vec2 px = vUv * uRes;
  vec2 cell = floor(px / uCell);
  vec2 local = fract(px / uCell);
  vec2 mouse = uMouse * uRes;

  float ramp = uMode < 0.5 ? smoothstep(0.55, 0.0, vUv.y) : 0.35 + 0.15 * sin(vUv.x * 6.0 + uTime * 0.4);
  float wave = 0.12 * sin(cell.x * 0.15 + uTime * 0.8) * sin(cell.y * 0.2 - uTime * 0.6);
  float d = distance(px, mouse);
  float glow = uHover * smoothstep(220.0, 0.0, d);
  float v = clamp(ramp * 0.55 + wave + glow * 0.9, 0.0, 1.0);

  float on = step(bayer4(cell), v);
  float sq = step(local.x, 0.5) * step(local.y, 0.5);
  float a = on * sq;

  vec3 col = mix(uInk, uAccent, smoothstep(0.15, 0.9, glow) * step(0.6, hash(cell + floor(uTime * 2.0))));
  float alpha = a * (0.10 + glow * 0.55);
  gl_FragColor = vec4(col, alpha);
}
`;

function Field({ mode }: { mode: number }) {
  const { size, gl } = useThree();
  const { theme } = useTheme();
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const hover = useRef(0);
  const uniforms = useMemo(
    () => ({
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uInk: { value: new THREE.Color("#111111") },
      uAccent: { value: new THREE.Color("#3B43D6") },
      uCell: { value: 6 },
      uMode: { value: mode },
    }),
    [mode],
  );

  useEffect(() => {
    uniforms.uInk.value.set(theme === "dark" ? "#F2F2EE" : "#111111");
    uniforms.uAccent.value.set(theme === "dark" ? "#6A71F2" : "#3B43D6");
  }, [theme, uniforms]);

  useEffect(() => {
    const el = gl.domElement.parentElement!.parentElement!;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.current.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      hover.current = 1;
    };
    const leave = () => (hover.current = 0);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [gl]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uRes.value.set(size.width, size.height);
    uniforms.uMouse.value.lerp(target.current, 0.12);
    uniforms.uHover.value += (hover.current - uniforms.uHover.value) * 0.08;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

/** WebGL dither field. Place inside a position:relative parent; it fills it and listens to pointer on the parent. */
export function PixelField({ mode = 0, style }: { mode?: 0 | 1; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }} aria-hidden>
      <Canvas orthographic dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }} style={{ pointerEvents: "none" }}>
        <Field mode={mode} />
      </Canvas>
    </div>
  );
}
