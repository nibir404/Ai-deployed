"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Small pixel cursor that trails the pointer (desktop / fine pointers only). */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const scale = useMotionValue(1);
  const ss = useSpring(scale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 4);
      y.set(e.clientY - 4);
      const t = e.target as HTMLElement;
      scale.set(t.closest("a,button,[data-cursor]") ? 3 : 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y, scale]);

  return <motion.div className="cursor-dot" style={{ x: sx, y: sy, scale: ss }} />;
}
