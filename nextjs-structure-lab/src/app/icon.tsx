// GENERATED APP ICON (metadata file: `icon`).
// Because this is `icon.tsx` (not a static icon.png), Next runs it to generate
// the favicon-style icon and injects the proper <link rel="icon"> tag.

import { ImageResponse } from "next/og";

// Route segment config consumed by Next for this metadata file:
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#4c8dff,#7c5cff)",
          color: "white",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
