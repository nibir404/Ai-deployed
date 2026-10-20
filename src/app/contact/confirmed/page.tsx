import { Suspense } from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Confirmed } from "@/components/pages/contact/Confirmed";

export const metadata: Metadata = { title: "Booked · AI Deployed" };

export default function ConfirmedPage() {
  return (
    <PageShell cta={false} footer={true}>
      <Suspense>
        <Confirmed />
      </Suspense>
    </PageShell>
  );
}
