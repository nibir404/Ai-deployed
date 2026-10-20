/**
 * Isometric motion-graphics kit (R3F). Reference scene: src/components/hero-iso/IsoScene.tsx.
 *
 * Usage
 *   // MyDiagram.tsx ("use client"), loaded with next/dynamic({ ssr: false })
 *   <IsoCanvas artWidth={576} artHeight={332} pxPerUnit={30} callouts={CALLOUTS}
 *              fallback={<img src="/assets/x.png" alt="" style={{ width: "100%" }} />}>
 *     <IsoModule id="data" start={0.3} position={[0, 0, 0]}>   // id links to a callout
 *       <Voxel color={ISO.cobalt} size={[2, 1, 2]} />
 *     </IsoModule>
 *     <Packets routes={[[[-3, 0], [3, 0]]]} start={2} />
 *   </IsoCanvas>
 *
 * World: 1 unit ≈ pxPerUnit px at artWidth; ground is y=0; +x runs screen right-down,
 * +z runs screen left-down; visible side faces are +x (dark) and +z (mid).
 * Size the parent by width only; the canvas keeps artWidth:artHeight (plus a legend under it below 768px).
 *
 * Pieces
 *  - IsoCanvas: camera, lights, pixelated render, in-view frameloop, pointer/scroll tilt,
 *    reduced-motion (renders `fallback`, else a static final frame), no-WebGL fallback, callouts.
 *  - IsoModule / useIntroSequence(ref, {start}): staggered drop + springy scale-in; IsoModule adds hover highlight.
 *  - Voxel, PixelRobot (idle | hop, blinks), Packets (along x/z routes), BurstPacket (hits route end, bursts),
 *    PathTiles, BlinkingX, BorderLights (chasing dashed lights around a square base), useFloat (bob).
 *  - Callout: { id, label, side, top, anchor, tip?, icon?, variant?: "default" | "blue" | "red" | "black" }.
 *  - useIso(): { time (ref, seconds), loop (0 when reduced), mobile, active, setHover } for custom useFrame logic.
 *    Always animate from `time.current`, multiply loop offsets by `loop`.
 */
export { IsoCanvas, type IsoCanvasProps } from "./IsoCanvas";
export { ISO, IsoModule, useIso, useIntroSequence, useLambert, pop, clamp01, smooth, unitBox, type IsoState } from "./core";
export { Voxel, PixelRobot, Packets, BurstPacket, PathTiles, BlinkingX, BorderLights, useFloat, along, routeLen, type V2, type V3 } from "./primitives";
export { Callouts, CalloutChip, CalloutGlyph, CalloutProjector, type Callout, type CalloutIcon } from "./Callouts";
