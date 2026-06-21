"use client";

import { useEffect, useRef } from "react";
import { useGsapContext } from "@/lib/motion";

/**
 * EnterpriseMap — architectural visualization of an operating enterprise.
 * Six nodes (People, Processes, Applications, Data, Infrastructure, AI Systems)
 * connected by hairline strokes. GSAP draws strokes on mount and reveals nodes.
 */
export function EnterpriseMap() {
  const { ref } = useGsapContext((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".em-edge", {
      strokeDashoffset: 600,
      duration: 1.6,
      stagger: 0.08,
    })
      .from(
        ".em-node",
        { opacity: 0, y: 12, duration: 0.7, stagger: 0.08 },
        "-=1.2",
      )
      .from(
        ".em-label",
        { opacity: 0, duration: 0.6, stagger: 0.04 },
        "-=0.8",
      );
  });

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] md:aspect-[16/9]">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        role="img"
        aria-label="Enterprise operating map: people, processes, applications, data, infrastructure, and AI systems connected through a structured operational network."
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.06"
            />
          </pattern>
        </defs>

        <rect width="1000" height="600" fill="url(#grid)" />

        {/* Edges */}
        <g
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
          aria-hidden
        >
          <path
            className="em-edge"
            d="M 200 150 L 500 300"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 200 450 L 500 300"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 800 150 L 500 300"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 800 450 L 500 300"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 500 300 L 350 100"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 500 300 L 650 100"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 500 300 L 350 500"
            pathLength={600}
            strokeDasharray="4 4"
          />
          <path
            className="em-edge"
            d="M 500 300 L 650 500"
            pathLength={600}
            strokeDasharray="4 4"
          />
        </g>

        {/* Outer nodes */}
        <g>
          {/* People */}
          <g className="em-node">
            <circle
              cx="200"
              cy="150"
              r="44"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="200"
              y="156"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="9"
              letterSpacing="1.4"
              fill="currentColor"
            >
              PEOPLE
            </text>
          </g>

          {/* Processes */}
          <g className="em-node">
            <circle
              cx="200"
              cy="450"
              r="44"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="200"
              y="456"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="9"
              letterSpacing="1.4"
              fill="currentColor"
            >
              PROCESSES
            </text>
          </g>

          {/* Applications */}
          <g className="em-node">
            <circle
              cx="800"
              cy="150"
              r="44"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="800"
              y="156"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="9"
              letterSpacing="1.4"
              fill="currentColor"
            >
              APPLICATIONS
            </text>
          </g>

          {/* Data */}
          <g className="em-node">
            <circle
              cx="800"
              cy="450"
              r="44"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="800"
              y="456"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="9"
              letterSpacing="1.4"
              fill="currentColor"
            >
              DATA
            </text>
          </g>

          {/* Infrastructure */}
          <g className="em-node">
            <circle
              cx="350"
              cy="100"
              r="40"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="350"
              y="105"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="8"
              letterSpacing="1.4"
              fill="currentColor"
            >
              INFRASTRUCTURE
            </text>
          </g>

          {/* AI Systems */}
          <g className="em-node">
            <circle
              cx="650"
              cy="100"
              r="40"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="650"
              y="105"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="8"
              letterSpacing="1.4"
              fill="currentColor"
            >
              AI SYSTEMS
            </text>
          </g>

          {/* Governance */}
          <g className="em-node">
            <circle
              cx="350"
              cy="500"
              r="40"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="350"
              y="505"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="8"
              letterSpacing="1.4"
              fill="currentColor"
            >
              GOVERNANCE
            </text>
          </g>

          {/* Operations */}
          <g className="em-node">
            <circle
              cx="650"
              cy="500"
              r="40"
              fill="var(--color-card)"
              stroke="currentColor"
              strokeOpacity="0.4"
            />
            <text
              x="650"
              y="505"
              textAnchor="middle"
              className="em-label font-mono"
              fontSize="8"
              letterSpacing="1.4"
              fill="currentColor"
            >
              OPERATIONS
            </text>
          </g>
        </g>

        {/* Center hub */}
        <g className="em-node">
          <circle
            cx="500"
            cy="300"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="0.8"
          />
          <circle
            cx="500"
            cy="300"
            r="60"
            fill="var(--color-card)"
            stroke="currentColor"
            strokeOpacity="0.8"
          />
          <text
            x="500"
            y="296"
            textAnchor="middle"
            className="em-label font-display"
            fontSize="11"
            letterSpacing="2"
            fill="currentColor"
          >
            ENTERPRISE
          </text>
          <text
            x="500"
            y="312"
            textAnchor="middle"
            className="em-label font-mono"
            fontSize="8"
            letterSpacing="2"
            fill="currentColor"
            opacity="0.6"
          >
            OPERATING SYSTEM
          </text>
        </g>
      </svg>
    </div>
  );
}
