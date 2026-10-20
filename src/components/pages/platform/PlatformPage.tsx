import s from "./platform.module.css";
import { PlatformHero } from "./Hero";
import { TabBar } from "./TabBar";
import { Build } from "./Build";
import { Approve } from "./Approve";
import { Govern } from "./Govern";
import { Audit } from "./Audit";
import { Triple } from "./Triple";

export function PlatformBody() {
  return (
    <div className={s.root} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <PlatformHero />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <TabBar />
        <Build />
        <Approve />
        <Govern />
        <Audit />
        <Triple />
      </div>
    </div>
  );
}
