// GENERATED OPEN GRAPH IMAGE (metadata file: `opengraph-image`).
// The image shown when the site is shared on Slack/Discord/LinkedIn etc.
// Next adds the <meta property="og:image"> tags automatically. 1200×630 is the
// standard OG size.

import { ImageResponse } from "next/og";

export const alt = "Next.js Structure Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg,#0b1220,#16213d)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#29d3a3", letterSpacing: 6 }}>
          NEXT.JS · APP ROUTER
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 16 }}>
          Project-Structure Lab
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#9fb0c8", marginTop: 16 }}>
          Every routing convention, as a live demo.
        </div>
      </div>
    ),
    { ...size }
  );
}
