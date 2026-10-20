import { RevealScope } from "@/components/motion/Reveal";
import { mono, sans, bgImg } from "./styles";
import css from "./HowItWorks.module.css";

const TEAM = [
  {
    tile: "var(--c-accent)",
    labelColor: "var(--c-accent)",
    label: "AI ENGINEERS",
    img: "/assets/1836H27H757SZG0C9T7EEDT5KQ.svg",
    body: "Agents and copilots · Private model deployment · Retrieval over your data · Evals and guardrails",
    face: "#3B43D6",
    delay: "0s",
  },
  {
    tile: "#D6F25C",
    labelColor: "var(--c-text)",
    label: "SOFTWARE ENGINEERS",
    img: "/assets/0FP20V4RV48MVFFP09BBNGSK8Y.svg",
    body: "Internal tools · APIs and integrations · Data pipelines · Front ends your team will use",
    face: "#B8D62E",
    delay: "-1.3s",
  },
  {
    tile: "var(--c-band)",
    labelColor: "var(--c-text)",
    label: "PLATFORM ENGINEERS",
    img: "/assets/4CMWQ32A53VBYM9ZW6N4G7QWGN.svg",
    body: "Cloud and Kubernetes · CI/CD and infra as code · Observability · Security and identity",
    face: "#1B1B1B",
    delay: "-2.7s",
  },
];

export function Team() {
  return (
    <RevealScope className={css.sec} style={{ display: "flex", flexDirection: "column" }}>
      <div className={css.teamHead} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div data-reveal="" style={mono(11, 14, "var(--c-muted)", { letterSpacing: "0.06em" })}>/ WHO JOINS YOUR TEAM</div>
        <h2 data-split className={css.h2} style={{ color: "var(--c-text)", fontFamily: 'var(--font-sans)', maxWidth: "640px" }}>
          Senior engineers, embedded. The people on the call do the work.
        </h2>
      </div>
      <div className={css.teamGrid} data-reveal-stagger="">
        {TEAM.map((t) => (
          <div key={t.label} className={`${css.teamCard} hover-lift`}>
            <div className={css.avatar} style={{ alignItems: "center", backgroundColor: t.tile, display: "flex", flexShrink: 0, height: "80px", justifyContent: "center", width: "72px" }}>
              <div style={bgImg(t.img, 48, 58)} />
              {/* eyelids drawn over the pixel eyes (svg eye cells at x 12/24, y 8 of a 40x48 grid) */}
              <span aria-hidden className={css.lid} style={{ background: t.face, left: "26.4px", animationDelay: t.delay }} />
              <span aria-hidden className={css.lid} style={{ background: t.face, left: "40.8px", animationDelay: t.delay }} />
            </div>
            <div style={mono(12, 16, t.labelColor, { letterSpacing: "0.06em" })}>{t.label}</div>
            <div style={sans(16, 26, "var(--c-text)")}>{t.body}</div>
          </div>
        ))}
      </div>
    </RevealScope>
  );
}
