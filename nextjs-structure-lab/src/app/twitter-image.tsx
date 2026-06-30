// GENERATED TWITTER/X IMAGE (metadata file: `twitter-image`).
// Same idea as opengraph-image but for the <meta name="twitter:image"> tags.
// You can absolutely share code with opengraph-image; kept separate here so the
// convention is visible.

import { ImageResponse } from "next/og";

export const alt = "Next.js Structure Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg,#16213d,#0b1220)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#4c8dff", letterSpacing: 6 }}>
          INTERVIEW PREP
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 16 }}>
          Next.js Structure Lab
        </div>
      </div>
    ),
    { ...size }
  );
}
