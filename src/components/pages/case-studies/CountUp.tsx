"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts the numeric part of `value` up when scrolled into view (keeps prefix/suffix). */
export function CountUp({ value, style, className }: { value: string; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -14% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*)([\d.]+)([\s\S]*)$/);
  const [text, setText] = useState(m && !reduce ? `${m[1]}0${m[3]}` : value);

  useEffect(() => {
    if (!m || reduce || !inView) {
      if (reduce) setText(value);
      return;
    }
    const [, pre, num, post] = m;
    const decimals = (num.split(".")[1] || "").length;
    const c = animate(0, parseFloat(num), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(`${pre}${v.toFixed(decimals)}${post}`),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className={className} style={style}>
      {text}
    </div>
  );
}
