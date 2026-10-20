import type { CSSProperties } from "react";



export const mono = (size: number, lh: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  boxSizing: "border-box",
  color,
  display: "inline-block",
  fontFamily: 'var(--font-mono)',
  fontSize: `${size}px`,
  lineHeight: `${lh}px`,
  ...extra,
});

export const sans = (size: number, lh: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  boxSizing: "border-box",
  color,
  display: "inline-block",
  fontFamily: 'var(--font-sans)',
  fontSize: `${size}px`,
  lineHeight: `${lh}px`,
  ...extra,
});

export const bgImg = (url: string, w: number, h: number): CSSProperties => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: "50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  boxSizing: "border-box",
  flexShrink: 0,
  height: `${h}px`,
  width: `${w}px`,
});
