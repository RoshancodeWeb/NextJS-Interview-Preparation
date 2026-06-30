// LAYOUT for the /routing-files segment (special file: `layout`).
// Wraps this section AND all its child routes, and PERSISTS across navigation
// between them (it does not re-mount). Compare its clock with the template's.

import Link from "next/link";
import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";
import { MountClock } from "./_components/MountClock";

export default function RoutingFilesLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Routing files"
      subtitle="The special files that build a route: layout, template, page, loading, error, not-found, route."
      guidePath="src/app/routing-files/GUIDE.md"
    >
      <div className="panel">
        <p style={{ marginTop: 0 }}>
          <strong>layout.tsx</strong> wraps this whole section and persists across
          navigation — its mount time stays fixed.
        </p>
        <MountClock label="layout mounted" />
      </div>

      <nav className="row">
        <Link className="btn ghost" href="/routing-files">
          Index
        </Link>
        <Link className="btn ghost" href="/routing-files/slow">
          Slow page → loading
        </Link>
        <Link className="btn ghost" href="/routing-files/missing">
          Missing → not-found
        </Link>
        <Link className="btn ghost" href="/routing-files/crash">
          Crash → error
        </Link>
      </nav>

      {children}
    </ConceptLayout>
  );
}
