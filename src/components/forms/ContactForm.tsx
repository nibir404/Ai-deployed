"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/site/primitives/Button";
import { ArrowUpRight, Check } from "@/components/site/icons";
import { cn } from "@/lib/cn";

const ENGAGEMENT = [
  { id: "foundation", label: "Foundation", desc: "Assessment + 1 capability" },
  { id: "embedded", label: "Embedded", desc: "Forward Deployed team" },
  { id: "scaled", label: "Scaled", desc: "Full managed operations" },
  { id: "unsure", label: "Not sure yet", desc: "Help me figure it out" },
] as const;

type EngagementId = (typeof ENGAGEMENT)[number]["id"];

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [engagement, setEngagement] = useState<EngagementId>("embedded");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // Placeholder: wire to a real endpoint later
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card-surface p-6 sm:p-8 md:p-10"
      noValidate
    >
      {status === "sent" ? (
        <div className="py-12 text-center">
          <div className="inline-flex size-12 items-center justify-center border hairline mb-6">
            <Check size={20} className="text-ink" aria-hidden />
          </div>
          <h3 className="font-display text-h3 font-medium text-ink">
            Message received.
          </h3>
          <p className="mt-3 text-sm text-ink-muted max-w-sm mx-auto">
            A senior engineer will reach out within one business day with a
            proposed time for your 30-minute conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              label="Name"
              id="contact-name"
              value={name}
              onChange={setName}
              placeholder="Jordan Reyes"
              required
            />
            <Field
              label="Work email"
              id="contact-email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="jordan@company.com"
              required
            />
          </div>

          <Field
            label="Organization"
            id="contact-org"
            value={org}
            onChange={setOrg}
            placeholder="Company / institution"
          />

          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              Engagement model
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-px bg-[var(--color-line)]">
              {ENGAGEMENT.map((e) => {
                const active = engagement === e.id;
                return (
                  <label
                    key={e.id}
                    className={cn(
                      "card-surface p-4 cursor-pointer transition-colors",
                      active
                        ? "bg-[var(--color-surface)]"
                        : "hover:bg-[var(--color-surface)]",
                    )}
                  >
                    <input
                      type="radio"
                      name="engagement"
                      value={e.id}
                      checked={active}
                      onChange={() => setEngagement(e.id)}
                      className="sr-only"
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-h3 font-medium text-ink">
                        {e.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "inline-block size-3 border hairline shrink-0",
                          active
                            ? "bg-[var(--color-ink)]"
                            : "bg-transparent",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                      {e.desc}
                    </p>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="contact-message"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted"
            >
              What are you working on? <span className="text-ink">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A few sentences on your context, what you're trying to operationalize, and what 'good' looks like."
              className="mt-3 w-full bg-transparent border hairline px-4 py-3 text-ink placeholder:text-ink-dim focus:outline-none focus:border-[var(--color-ink)] transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
            >
              Please complete name, email, and message.
            </p>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim max-w-xs">
              By submitting, you agree to be contacted by an AI Deployed
              engineer.
            </p>
            <Button
              type="submit"
              variant="primary"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}{" "}
              <ArrowUpRight size={14} aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted"
      >
        {label} {required && <span className="text-ink">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border hairline px-4 py-3 text-ink placeholder:text-ink-dim focus:outline-none focus:border-[var(--color-ink)] transition-colors"
      />
    </div>
  );
}