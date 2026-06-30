// TEMPLATE for the /routing-files segment (special file: `template`).
// Like a layout, it wraps children — BUT it creates a fresh instance on every
// navigation (state resets, effects re-run). Its mount time changes each time
// you click a link in this section, unlike the layout above.

import type { ReactNode } from "react";
import { MountClock } from "./_components/MountClock";

export default function RoutingFilesTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="stack">
      <div className="panel">
        <p style={{ marginTop: 0 }}>
          <strong>template.tsx</strong> re-mounts on every navigation — watch this
          time update as you click the links above.
        </p>
        <MountClock label="template mounted" />
      </div>
      {children}
    </div>
  );
}
