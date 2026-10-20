import { PageShell } from "@/components/layout/PageShell";
import { Hero, Sectors } from "@/components/pages/home/Hero";
import { Capabilities } from "@/components/pages/home/Capabilities";
import { Process, UseCases } from "@/components/pages/home/ProcessAndUseCases";
import { Security, Results } from "@/components/pages/home/SecurityAndResults";
import { Residency } from "@/components/pages/home/Residency";
import s from "@/components/pages/home/Home.module.css";

export default function Home() {
  return (
    <PageShell>
      <div className={s.home} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Hero />
        <Sectors />
        <Capabilities />
        <Process />
        <UseCases />
        <Security />
        <Residency />
        <Results />
      </div>
    </PageShell>
  );
}
