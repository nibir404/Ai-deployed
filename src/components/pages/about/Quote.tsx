"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealScope } from "@/components/motion/Reveal";
import { sans, bgImg } from "./styles";
import css from "./About.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUOTE = "“AI in business needs to be embedded and governed, not just deployed.”";

const PILLARS = [
  {
    icon: "/assets/29NKXSDQ80QYX02H4KXVTXHXXJ.svg",
    anim: "",
    title: "Embedded",
    body: "An agent you do not run is a pilot. We run the runtime, monitor the queue and keep the configuration in step with your business.",
  },
  {
    icon: "/assets/1JME28A1JQF34JMPRWFQF6ZM41.svg",
    anim: "pulse",
    title: "Governed",
    body: "Every output is checked before it leaves the queue. Every action is logged. The policy stack fails closed.",
  },
  {
    icon: "/assets/20TQV9QV0HWBBGHZEYMFT7JAKZ.svg",
    anim: "spin",
    title: "Accountable",
    body: "We own the outcome. If the agent does not perform, we change the configuration, the model or the policy.",
  },
];

export function Quote() {
  const ref = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      const words = ref.current!.querySelectorAll("[data-qw]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { opacity: 1 });
        return;
      }
      // scrubbed word-by-word reveal tied to scroll position
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 40%", scrub: 0.8, invalidateOnRefresh: true },
      });
    },
    { scope: ref },
  );

  return (
    <RevealScope className={css.quote}>
      <blockquote ref={ref} className={css.quoteText} style={{ color: "var(--c-text)", fontFamily: 'var(--font-sans)' }} aria-label={QUOTE}>
        {QUOTE.split(" ").map((w, i) => (
          <span key={i} aria-hidden>
            <span data-qw className={css.qw}>
              {w}
            </span>{" "}
          </span>
        ))}
      </blockquote>
      <div className={css.pillars} data-reveal-stagger="">
        {PILLARS.map((p) => (
          <div key={p.title} className={css.pillar}>
            <div className={`${css.icon} ${p.anim ? css[p.anim] : ""}`} style={bgImg(p.icon, 32, 32)} />
            <div style={sans(22, 28, "var(--c-text)")}>{p.title}</div>
            <div style={sans(15, 23, "var(--c-muted)")}>{p.body}</div>
          </div>
        ))}
      </div>
    </RevealScope>
  );
}
