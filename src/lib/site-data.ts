/**
 * site-data — single source of truth for all site content.
 *
 * This module exposes a structured, search-friendly view of the
 * site's content. The CLI panel uses it as its knowledge base; the
 * visible page sections use their own local data copies that match
 * this structure (kept in sync manually — single source of truth
 * would require a refactor that this site doesn't yet justify).
 *
 * Adding a new query topic:
 *   1. Add an entry to `SITE_DATA` with a unique `id` and an array
 *      of keyword aliases.
 *   2. Write `title`, `summary`, and a list of `facts` that the CLI
 *      will surface when the topic matches.
 *   3. Optional: add `links` to point the user to the relevant
 *      on-page section (anchor href) or page.
 */

export type SiteFact = string;
export type SiteLink = { label: string; href: string };

export type SiteTopic = {
  id: string;
  /** Aliases that the matcher checks against the user's query. */
  keywords: string[];
  title: string;
  /** 1-line teaser shown before the facts. */
  summary: string;
  /** 2–5 bullet-style facts. */
  facts: SiteFact[];
  /** Optional footer links. */
  links?: SiteLink[];
};

export const SITE_DATA: SiteTopic[] = [
  {
    id: "what",
    keywords: [
      "what",
      "do",
      "company",
      "about",
      "who",
      "ai-deployed",
      "aideployed",
    ],
    title: "What AI Deployed does",
    summary:
      "We design, build, and run custom AI agents for businesses that need a real, governed system in production.",
    facts: [
      "AI Deployed builds custom AI agents — scoped to one job, governed by your rules, reviewed by your team.",
      "Each agent is a configuration: a goal, a tool allowlist, a set of guardrails, an approval mode.",
      "We run the agents in production, monitor the queue, and improve the configuration as your business changes.",
      "Delivered by named people — not a pool. You will probably talk to one of the founders in the first call.",
    ],
    links: [
      { label: "How it works", href: "/platform" },
      { label: "Talk to us", href: "/contact" },
    ],
  },
  {
    id: "agents",
    keywords: ["agent", "agents", "ai", "custom", "build", "configuration"],
    title: "Custom AI agents",
    summary:
      "Each agent is scoped to one job — a goal, a tool allowlist, a set of guardrails, an approval mode.",
    facts: [
      "One agent, one job. We do not hand you a builder and call it done.",
      "Configuration is the product. If the configuration is wrong, the agent is wrong.",
      "We design the configuration with you, against your existing systems, until it is right.",
      "We cannot bypass the approval gate from our side. The governance layer enforces it.",
    ],
    links: [{ label: "Platform", href: "/platform" }],
  },
  {
    id: "governance",
    keywords: [
      "govern",
      "governance",
      "approval",
      "audit",
      "policy",
      "compliance",
      "guardrail",
    ],
    title: "Governance",
    summary:
      "Approval queues, audit logs, and a failsafe policy layer. The agent never sends, writes, or triggers directly.",
    facts: [
      "Every agent has an approval queue. Drafts land there first. Nothing leaves without you.",
      "Two synced audit logs. Every input, output, and decision — append-only, reconstructable.",
      "Sensitive fields are stripped before the model sees them. PII never reaches the model.",
      "You decide the approval mode per agent — auto, review, or strict.",
      "The failsafe policy layer enforces the rules. The agent cannot override it.",
    ],
    links: [{ label: "Governance", href: "/governance" }],
  },
  {
    id: "platform",
    keywords: ["platform", "build", "approve", "operate", "measure", "integrate"],
    title: "The platform",
    summary:
      "Build, approve, govern, audit, integrate, operate, and measure — in one place.",
    facts: [
      "Build — design the configuration with us, against your existing systems.",
      "Approve — every agent operates under an approval queue.",
      "Govern — the failsafe policy layer enforces the rules.",
      "Audit — append-only logs of every input, output, and decision.",
      "Integrate — connects to the systems you already use.",
      "Operate — we run the runtime, monitor the agents, and improve the configurations.",
      "Measure — you get a weekly report and an approval queue.",
    ],
    links: [{ label: "Platform", href: "/platform" }],
  },
  {
    id: "engagement",
    keywords: [
      "engagement",
      "how",
      "work",
      "process",
      "step",
      "stages",
      "discovery",
      "production",
    ],
    title: "How an engagement works",
    summary:
      "Four steps. Most engagements are running in production by week four.",
    facts: [
      "Discovery call — we learn about the work you want an agent to do, your systems, and your governance requirements.",
      "Design and build — we design the agent — goal, tools, guardrails, approval mode — and build it against your systems.",
      "Review outputs — your team reviews the agent's drafts. We tune the configuration based on what your team edits.",
      "Monitor and improve — we run the agent in production, monitor the queue, and improve the configuration as your business changes.",
    ],
    links: [{ label: "How it works", href: "/#engagement" }],
  },
  {
    id: "use-cases",
    keywords: [
      "use",
      "case",
      "where",
      "support",
      "sales",
      "operations",
      "analytics",
      "finance",
      "marketing",
    ],
    title: "Where agents work",
    summary:
      "Functions where an AI agent does real, repeatable work — scoped to the job, governed by your rules.",
    facts: [
      "Support — triage and respond to inbound. Drafts queued for your review before anything is sent.",
      "Sales — personalized follow-ups after every demo. Voice matched to your team, edited only where needed.",
      "Operations — reorder low-stock SKUs, route approvals to the right lead, and keep the ops inbox clean.",
      "Analytics — summarize weekly pipeline, surface risk callouts, and produce board-ready notes from your data.",
      "Finance — reconcile invoices, flag anomalies, and draft approvals for the controller.",
      "Marketing — newsletter drafts, subject-line tests, social scheduling. Reviewed before anything goes out.",
    ],
    links: [{ label: "Use cases", href: "/#use-cases" }],
  },
  {
    id: "differentiators",
    keywords: [
      "different",
      "principle",
      "why",
      "versus",
      "consulting",
      "vendor",
      "approach",
    ],
    title: "What makes us different",
    summary:
      "We engineer, we operate, and we own the outcome. Configuration is the product.",
    facts: [
      "Custom build, not a generic assistant. We design the configuration with you, against your existing systems.",
      "An approval gate you control. You decide the approval mode per agent — auto, review, or strict.",
      "We run it. We operate it. We own it. If the agent does not perform, we change the configuration.",
    ],
  },
  {
    id: "about",
    keywords: ["about", "team", "california", "who", "founders"],
    title: "About AI Deployed",
    summary:
      "A small team based in California. We hire engineers slowly, pay well, and do not run a sales pipeline.",
    facts: [
      "We are a small team based in California.",
      "We hire engineers slowly, pay well, and do not run a sales pipeline.",
      "Every customer engagement is delivered by named people — not a pool.",
      "If you are considering us, you will probably talk to one of the founders in the first call.",
    ],
    links: [
      { label: "About", href: "/about" },
      { label: "Talk to us", href: "/contact" },
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "start", "call", "reach", "speak", "talk"],
    title: "Start the conversation",
    summary:
      "A short conversation. We will tell you when we are not the right fit.",
    facts: [
      "Begin with a short conversation. We learn about the work you want an agent to do.",
      "We will tell you when we are not the right fit. We are not the right fit for every business.",
    ],
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    id: "faq",
    keywords: ["faq", "question", "frequently"],
    title: "Frequently asked questions",
    summary: "Common questions we hear — and the answers.",
    facts: [
      "What does AI Deployed actually do? — We design, build, and run custom AI agents.",
      "How is AI Deployed different from a platform? — We deliver a working agent, not a builder.",
      "Who owns the configuration? — You do. We operate it on your behalf.",
      "What kinds of organizations do you work with? — Businesses with real, repeatable work an agent can do.",
      "Do you only work on AI? — No. We work across the configuration, the systems, and the operations around the agent.",
      "How long does a typical engagement last? — Most engagements are running in production by week four. We continue to operate and improve.",
      "Do you work with our existing systems? — Yes. The agent is configured against the systems you already use.",
      "How do we start? — A short conversation, then a discovery call.",
    ],
    links: [
      { label: "See all FAQ", href: "/faq" },
      { label: "Ask directly", href: "/contact" },
    ],
  },
];

/**
 * Strip punctuation, lowercase, and split on whitespace. Used by the
 * matcher to turn user input into comparable tokens.
 */
export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Find the best-matching topic for a user query.
 *
 * Strategy:
 *   1. Tokenize the query.
 *   2. For each topic, count how many of its keywords appear as
 *      whole-token matches in the query.
 *   3. Also boost topics whose `title` words appear in the query.
 *   4. Return the top-scoring topic, or null if nothing scored.
 *
 * Cheap and predictable — no LLM, no API calls, fully offline. The
 * output reads as if an AI synthesized an answer because the
 * structured facts are already editorial-grade.
 */
export function findTopic(query: string): SiteTopic | null {
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  let best: { topic: SiteTopic; score: number } | null = null;

  for (const topic of SITE_DATA) {
    let score = 0;
    for (const kw of topic.keywords) {
      const kwt = kw.toLowerCase();
      // Substring match for multi-word keywords, exact-token match for single words.
      if (kwt.includes(" ")) {
        if (query.toLowerCase().includes(kwt)) score += 2;
      } else {
        if (tokens.includes(kwt)) score += 2;
      }
    }
    // Title word bonus
    const titleWords = tokenize(topic.title);
    for (const w of titleWords) {
      if (w.length > 2 && tokens.includes(w)) score += 1;
    }
    // Phrase bonuses
    if (tokens.includes("how") && tokens.includes("much")) score += 6;
    if (tokens.includes("how") && tokens.includes("long")) score += 6;
    if (tokens.includes("what") && tokens.includes("is")) score += 4;
    if (tokens.includes("who") && tokens.includes("are")) score += 4;

    if (!best || score > best.score) {
      best = { topic, score };
    }
  }

  if (!best || best.score === 0) return null;
  return best.topic;
}
