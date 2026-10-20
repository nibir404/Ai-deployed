import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactBody } from "@/components/pages/contact/ContactBody";

export const metadata: Metadata = { title: "Contact · AI Deployed" };

export default function ContactPage() {
  return (
    <PageShell cta={false}>
      <ContactBody />
    </PageShell>
  );
}
