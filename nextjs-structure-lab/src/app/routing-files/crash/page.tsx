"use client";

// Demonstrates `error.tsx`. The button flips state so the component throws
// DURING RENDER (error boundaries catch render errors, not event-handler
// errors). The nearest error.tsx then renders; its reset() brings us back here.

import { useState } from "react";

export default function CrashPage() {
  const [boom, setBoom] = useState(false);

  if (boom) {
    throw new Error("💥 Intentional render error — caught by routing-files/error.tsx");
  }

  return (
    <div className="panel">
      <p style={{ marginTop: 0 }}>
        This page renders fine until you ask it to crash. Clicking the button sets
        state, the component re-renders and throws, and <code>error.tsx</code>{" "}
        takes over.
      </p>
      <button className="btn danger" onClick={() => setBoom(true)}>
        Trigger a render error
      </button>
    </div>
  );
}
