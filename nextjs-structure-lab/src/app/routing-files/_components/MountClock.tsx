"use client";

// Records the time it MOUNTED. Placed in both layout.tsx and template.tsx so you
// can see the difference: the layout's clock stays fixed across navigation
// (layout persists), while the template's clock updates every navigation
// (template re-mounts). Time is set in an effect to avoid hydration mismatch.

import { useEffect, useState } from "react";

export function MountClock({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
  return (
    <span className="badge">
      {label}: {time ?? "…"}
    </span>
  );
}
