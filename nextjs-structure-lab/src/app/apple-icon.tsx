// GENERATED APPLE TOUCH ICON (metadata file: `apple-icon`).
// Produces the icon iOS uses when the site is saved to the home screen and adds
// <link rel="apple-touch-icon">. Apple icons are 180×180.

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 110,
          fontWeight: 800,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
