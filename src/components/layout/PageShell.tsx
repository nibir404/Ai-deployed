import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";

/** Wraps a page body: 1280 content column, optional closing CTA, footer. */
export function PageShell({ children, cta = true, footer = true }: { children: React.ReactNode; cta?: boolean; footer?: boolean }) {
  return (
    <main className="page">
      {children}
      {cta && <CtaSection />}
      {footer && <Footer />}
    </main>
  );
}
