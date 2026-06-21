"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MutableRefObject, RefCallback, RefObject } from "react";

type GSAPContext = ReturnType<typeof import("gsap").gsap.context> | undefined;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * useIsomorphicLayoutEffect — useLayoutEffect on the client, useEffect on the server.
 * Keeps GSAP wiring deterministic without SSR warnings.
 */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * useGsapContext — registers a GSAP context scoped to the returned ref.
 * Automatically cleans up on unmount. Pass a function that receives (gsap, ScrollTrigger).
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (
    gsap: typeof import("gsap").gsap,
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
  ) => void | (() => void),
  scope?: RefObject<T | null>,
) {
  const ref = useRef<T | null>(null);
  const localRef: MutableRefObject<T | null> = scope ?? ref;
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    if (!localRef.current) return;
    let ctx: GSAPContext;
    let cleanup: void | (() => void);

    (async () => {
      const { gsap } = await import("gsap");
      const STModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = STModule.ScrollTrigger ?? STModule.default;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        cleanup = setup(gsap, ScrollTrigger);
      }, localRef);
      setReady(true);
    })();

    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cast: useRef returns RefObject<T | null> but the JSX ref prop wants
  // RefObject<T> | RefCallback<T>. We narrow at the boundary with a callback ref.
  const setRef: RefCallback<T> = (node) => {
    localRef.current = node;
  };
  return { ref: setRef, ready };
}

/**
 * useReducedMotion — reactive boolean.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export { prefersReducedMotion };
