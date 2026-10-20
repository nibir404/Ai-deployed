import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PlatformBody } from "@/components/pages/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Platform · AI Deployed",
  description: "One platform for building, running and governing AI agents: build, approve, govern, audit, integrate, operate and measure.",
};

export default function PlatformPage() {
  return (
    <PageShell>
      <PlatformBody />
    </PageShell>
  );
}
