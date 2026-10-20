import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, rendered as a PNG for iOS home screens.
const PX = 180 / 32;
const rects: [number, number, number, number, string][] = [
  [7, 14, 14, 4, "#FFFFFF"],
  [15, 8, 4, 4, "#FFFFFF"],
  [19, 11, 4, 4, "#FFFFFF"],
  [21, 14, 4, 4, "#FFFFFF"],
  [19, 17, 4, 4, "#FFFFFF"],
  [15, 20, 4, 4, "#FFFFFF"],
  [7, 7, 4, 4, "#D6F25C"],
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#3B43D6", position: "relative", display: "flex" }}>
        {rects.map(([x, y, w, h, c], i) => (
          <div key={i} style={{ position: "absolute", left: x * PX, top: y * PX, width: w * PX, height: h * PX, background: c }} />
        ))}
      </div>
    ),
    size,
  );
}
