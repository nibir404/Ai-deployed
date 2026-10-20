"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import s from "./platform.module.css";
import { CopyCol, IconList, Section, mono, sans } from "./ui";

type Status = "pending" | "editing" | "edited" | "approved";
type Item = { id: number; title: string; status: Status; ago?: string };

const INITIAL: Item[] = [
  { id: 1, title: "Lead reply · Acme Co.", status: "pending" },
  { id: 2, title: "Reorder · SKU-4129", status: "pending" },
  { id: 3, title: "Support reply · order #8841", status: "approved", ago: "2M AGO" },
];

function GatePng() {
  return (
    <div
      role="img"
      aria-label="Isometric approval gate: drafts pass through a checkpoint before leaving"
      style={{
        backgroundImage: "url(/assets/31PS3GSQ8J2FW7KBPZWJARNAYG.png)",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        aspectRatio: "640 / 318",
        width: "100%",
      }}
    />
  );
}

const GateScene = dynamic(() => import("@/components/iso-scenes/GateScene"), { ssr: false, loading: () => <GatePng /> });

const SUB: Record<Status, string> = {
  pending: "AGENT DRAFTED · AWAITING YOUR REVIEW",
  editing: "EDITING DRAFT · CHANGES NOT SENT",
  edited: "EDITED BY YOU · AWAITING APPROVAL",
  approved: "YOU APPROVED",
};

export function Approve() {
  const [items, setItems] = useState(INITIAL);
  const pending = items.filter((i) => i.status !== "approved").length;

  // Signals for the gate illustration: each APPROVE lifts the barrier, each EDIT turns the robot back.
  const [signals, setSignals] = useState({ approve: 0, edit: 0 });
  const set = (id: number, status: Status) => {
    if (status === "approved") setSignals((x) => ({ ...x, approve: x.approve + 1 }));
    else if (status === "editing") setSignals((x) => ({ ...x, edit: x.edit + 1 }));
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status, ago: status === "approved" ? "JUST NOW" : x.ago } : x)));
  };

  // When the queue is cleared, a fresh draft arrives after a moment.
  useEffect(() => {
    if (pending !== 0) return;
    const t = setTimeout(() => setItems(INITIAL.map((x) => ({ ...x }))), 3200);
    return () => clearTimeout(t);
  }, [pending]);

  return (
    <Section id="approve" reverse>
      <div
        className={`${s.grid} ${s.pane} ${s.paneApprove}`}
        style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box" }}
      >
        <div data-parallax="0.08" className={s.w640}>
          <div data-reveal="scale">
            <GateScene approveSignal={signals.approve} editSignal={signals.edit} fallback={<GatePng />} />
          </div>
        </div>
        <div
          data-reveal=""
          className={s.w640}
          style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}
        >
          <div style={{ borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", justifyContent: "space-between", paddingBlock: "12px", paddingInline: "16px" }}>
            <div style={mono(11, 14, "var(--c-muted)")}>AIDEPLOYED / HANDOFF</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={pending}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                style={mono(11, 14, pending ? "var(--p-amber)" : "var(--p-green)")}
              >
                {pending ? `${pending} PENDING` : "QUEUE CLEAR ✓"}
              </motion.div>
            </AnimatePresence>
          </div>
          {items.map((it, i) => {
            const done = it.status === "approved";
            return (
              <motion.div
                key={it.id}
                layout
                className={s.queueRow}
                animate={{ backgroundColor: done ? "rgba(62,142,102,0)" : it.status === "editing" ? "rgba(59,67,214,0.08)" : "rgba(0,0,0,0)" }}
                style={{
                  alignItems: "center",
                  borderBottom: i < items.length - 1 ? "1px solid var(--c-line)" : undefined,
                  boxSizing: "border-box",
                  display: "flex",
                  gap: "12px",
                  paddingBlock: "12px",
                  paddingInline: "16px",
                  minHeight: "57px",
                }}
              >
                <motion.div
                  animate={{ backgroundColor: done ? "var(--p-green)" : it.status === "editing" ? "var(--c-accent)" : "#E8A23A", scale: done ? [1, 1.6, 1] : 1 }}
                  transition={{ duration: 0.35 }}
                  style={{ boxSizing: "border-box", flexShrink: 0, height: "8px", width: "8px" }}
                />
                <div style={{ boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "2px" }}>
                  <div style={sans(15, 18, done ? "var(--c-muted)" : "var(--c-text)", { transition: "color .3s" })}>{it.title}</div>
                  <div style={mono(10, 12, "var(--c-faint)")}>{done ? `${SUB.approved} ${it.ago}` : SUB[it.status]}</div>
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                  {done ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={mono(11, 14, "var(--p-green)")}
                    >
                      APPROVED ✓
                    </motion.div>
                  ) : (
                    <motion.div key="btns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="button"
                        className={`${s.btnApprove} ${s.tapBtn}`}
                        onClick={() => set(it.id, "approved")}
                        style={{ boxSizing: "border-box", display: "inline-block", paddingBlock: "6px", paddingInline: "10px" }}
                      >
                        <span style={mono(11, 14, "#FFFFFF")}>APPROVE</span>
                      </button>
                      <button
                        type="button"
                        className={`${s.btnEdit} ${s.tapBtn}`}
                        onClick={() => set(it.id, it.status === "editing" ? "edited" : "editing")}
                        style={{ boxSizing: "border-box", display: "inline-block", paddingBlock: "6px", paddingInline: "10px" }}
                      >
                        <span style={mono(11, 14, "var(--c-text)")}>{it.status === "editing" ? "SAVE" : "EDIT"}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <CopyCol
        eyebrow="02 / APPROVE"
        title="Nothing leaves the queue without you."
        body="Every agent has an approval queue. Drafts land there first. The agent never sends, writes or triggers directly. We cannot bypass it from our side."
      >
        <IconList
          items={[
            { icon: "/assets/20TQV9QV0HWBBGHZEYMFT7JAKZ.svg", label: "Per-agent mode: auto, review or strict" },
            { icon: "/assets/7PZE67JMNQH12TX4V4E6NEYR6X.svg", label: "Editable drafts before anything goes out" },
            { icon: "/assets/5JA4C2FFGX8H9HME80DZ32AB5V.svg", label: "Bulk actions for similar items" },
            { icon: "/assets/29NKXSDQ80QYX02H4KXVTXHXXJ.svg", label: "Notifications on every pending item" },
          ]}
        />
      </CopyCol>
    </Section>
  );
}
