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
      "We deploy, integrate, and operate AI systems inside enterprise environments — through embedded engineering.",
    facts: [
      "AI Deployed deploys, integrates, operationalizes, manages, and scales AI, enterprise systems, cloud infrastructure, and modern technology platforms.",
      "Work spans strategy through long-term managed services.",
      "Delivered by Forward-Deployed Engineers, AI Engineers, and Solution Architects embedded inside client organizations.",
      "Outcomes are owned — not just recommended.",
    ],
    links: [
      { label: "How we work", href: "/how-we-work" },
      { label: "Book a consultation", href: "/contact" },
    ],
  },
  {
    id: "fde",
    keywords: ["forward", "fde", "engineer", "embedded", "team"],
    title: "Forward-Deployed Engineers",
    summary:
      "Senior engineers embedded directly with a client organization — they understand both technology and operations.",
    facts: [
      "A Forward-Deployed Engineer translates between technology and operations — designing, deploying, and operating systems in the real environment.",
      "They sit inside the client team, not on the outside advising.",
      "Knowledge transfer and long-term ownership are built in by design.",
      "10 disciplines under FDE: AI/ML, MLOps, Data, Security, Integration, Cloud, App, DevEx, Operations, Transformation.",
    ],
    links: [{ label: "Forward Deployed", href: "/capabilities" }],
  },
  {
    id: "services",
    keywords: ["service", "offer", "capability", "whatwedo", "do"],
    title: "Services",
    summary: "Eight core capabilities delivered end-to-end.",
    facts: [
      "01 — AI Transformation — identify, prioritize, deploy. Tied to outcomes.",
      "02 — Enterprise AI Systems — production-grade, integrated, monitored.",
      "03 — Generative AI — secure LLM, retrieval, governance built in.",
      "04 — AI Agents — workflow automation at enterprise scale.",
      "05 — Systems Integration — applications, data, processes — connected.",
      "06 — Cloud Infrastructure — hyperscaler and hybrid, modernized.",
      "07 — Managed Services — operate, monitor, optimize — embedded.",
      "08 — Modernization — legacy environments, no disruption.",
    ],
    links: [{ label: "All capabilities", href: "/capabilities" }],
  },
  {
    id: "industries",
    keywords: [
      "industry",
      "industries",
      "sector",
      "banking",
      "telecom",
      "government",
      "healthcare",
      "education",
      "manufacturing",
    ],
    title: "Industries served",
    summary:
      "Highly regulated, operationally complex organizations.",
    facts: [
      "Banking & Financial Services — operations, risk, compliance, service.",
      "Telecommunications & ISPs — network intelligence, CX, optimization.",
      "Government — citizen services, transformation, data.",
      "Healthcare — clinical ops, engagement, analytics.",
      "Education — learning systems, modernization.",
      "Manufacturing — production, forecasting, quality.",
      "Enterprise & Conglomerates — integration, data, transformation.",
    ],
  },
  {
    id: "engagement",
    keywords: [
      "engagement",
      "model",
      "how",
      "work",
      "together",
      "project",
      "managed",
      "embedded",
    ],
    title: "Engagement models",
    summary:
      "Three ways to work with us, from targeted outcomes to long-term operations.",
    facts: [
      "01 · Project — outcome-defined delivery. Defined scope, timeline, outcome.",
      "02 · Embedded — engineers inside the organization. Knowledge transfer, ownership, long-term.",
      "03 · Managed — continuous operation at scale. 24/7 operation, continuous improvement, operational SLAs.",
      "Average engagement: 6–18 months from assessment through operationalization to scale.",
    ],
    links: [{ label: "See the full process", href: "/how-we-work" }],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "tier", "fee", "investment"],
    title: "Investment tiers",
    summary: "Three tiers, billed monthly or annually (save 17%).",
    facts: [
      "01 · Foundation — $4,800/mo (or $4,000/mo annual). Operational assessment + one capability. 30/60/90 day milestones.",
      "02 · Embedded — $12,000/mo (or $10,000/mo annual). Embedded engineering team, multi-capability delivery, long-term ownership.",
      "03 · Scaled — $24,000/mo (or $20,000/mo annual). 24/7 managed operations, continuous improvement, operational SLAs.",
      "Custom programs above $30k / month.",
      "Save 17% with annual billing.",
    ],
    links: [{ label: "Discuss your context", href: "/contact" }],
  },
  {
    id: "outcomes",
    keywords: ["outcome", "impact", "result", "deliver", "metric"],
    title: "Outcomes we deliver",
    summary:
      "Measured by outcomes, not deliverables — across operations, productivity, cost, decisions, CX, and beyond.",
    facts: [
      "Faster operations — lower latency, higher throughput.",
      "Higher productivity — embedded automation, compounding.",
      "Lower cost — quantified opex reduction.",
      "Better decisions — decision intelligence, real-time.",
      "Improved CX — quicker, higher-quality service.",
      "Less manual work — repetitive work automated.",
      "Modern stack — cloud-native, observable.",
      "Scalable AI — pilot to production, intact.",
      "Resilience — continuity through change.",
      "Quantifiable value — measured in outcomes, not deliverables.",
    ],
  },
  {
    id: "stats",
    keywords: ["stat", "metric", "number", "how many", "trust"],
    title: "Operating metrics",
    summary:
      "Benchmarked across 47+ multi-year enterprise deployments.",
    facts: [
      "47+ enterprise deployments — across banking, telecom, government, healthcare, and manufacturing.",
      "12 industries served — highly regulated, operationally complex, organization-wide programs.",
      "98% client retention — long-term engagement with measurable operational outcomes.",
      "6–18 months average engagement — time from assessment through operationalization to scale.",
    ],
  },
  {
    id: "case",
    keywords: ["case", "study", "work", "portfolio", "client"],
    title: "Selected work",
    summary: "Three engagements spanning banking, telecoms, and government.",
    facts: [
      "Banking — multi-year AI deployment; millions in measured opex reduction; new operational capabilities still in production.",
      "Telecoms — network intelligence platform; real-time optimization across the operations floor.",
      "Government — citizen services modernization; measurable improvement in service delivery.",
    ],
    links: [{ label: "All case studies", href: "/case-studies" }],
  },
  {
    id: "research",
    keywords: ["research", "whitepaper", "report", "publication"],
    title: "Research",
    summary: "Ten research categories — operator-grade depth, no fluff.",
    facts: [
      "AI Architecture · Agentic Systems · Generative AI · MLOps · Data Platforms · Integration · Cloud · Security · Operations · Modernization.",
      "Each category is a body of operator-grade work — frameworks, patterns, lessons learned.",
    ],
    links: [{ label: "Resources", href: "/resources" }],
  },
  {
    id: "why",
    keywords: ["why", "different", "better", "versus", "consulting", "vendor"],
    title: "Why AI Deployed",
    summary: "We're operators, not advisors — engineering, ownership, and outcomes.",
    facts: [
      "We engineer — we don't just advise.",
      "Embedded delivery — engineers inside your organization, not slide decks.",
      "Long-term ownership — we operate what we deploy.",
      "Vendor-neutral — integrate with hyperscalers, SaaS, existing investments.",
      "Operator-grade — built for regulated, mission-critical environments.",
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "start", "call", "reach", "speak", "talk"],
    title: "Start the conversation",
    summary: "A 30-minute conversation — we help you assess context and define the path forward.",
    facts: [
      "Begin with a discovery conversation.",
      "We'll assess your context, identify the highest-value opportunities, and recommend the right engagement model — project, embedded, or managed.",
    ],
    links: [{ label: "Book consultation", href: "/contact" }],
  },
  {
    id: "faq",
    keywords: ["faq", "question", "frequently"],
    title: "Frequently asked questions",
    summary: "Eight questions we hear most — and the answers.",
    facts: [
      "What does AI Deployed actually do? — Deploy, integrate, operationalize, manage, scale. Delivered by embedded engineers.",
      "How is AI Deployed different from a consulting firm? — We engineer. Outcomes are owned, not recommended.",
      "What kinds of organizations do you work with? — Highly regulated, operationally complex organizations.",
      "What is a Forward-Deployed Engineer? — A senior engineer embedded directly with a client organization.",
      "Do you only work on AI? — No. AI is one layer; we work across AI, engineering, integration, operations, modernization.",
      "How long does a typical engagement last? — 3 months to multi-year; average 6–18 months.",
      "Do you work with our existing vendors? — Yes — vendor-neutral.",
      "How do we start? — Discovery conversation → engagement model.",
    ],
    links: [
      { label: "See all FAQ", href: "/#faq" },
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