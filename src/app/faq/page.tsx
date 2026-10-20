import { PageShell } from "@/components/layout/PageShell";
import { FaqBody } from "@/components/pages/faq/FaqBody";

export const metadata = { title: "FAQ · AI Deployed" };

export default function FaqPage() {
  return (
    <PageShell>
      <FaqBody />
    </PageShell>
  );
}
