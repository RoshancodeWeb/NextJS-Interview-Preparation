// LAYOUT for /dashboard with PARALLEL ROUTES.
// Each `@slot` folder (here @team and @analytics) is passed to this layout as a
// prop named after the slot, IN ADDITION to the usual `children` (the unnamed
// slot = page.tsx). The layout renders them all at once.

import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function DashboardLayout({
  children,
  team,
  analytics,
}: {
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
}) {
  return (
    <ConceptLayout
      title="Parallel routes — @slot"
      subtitle="Render several independent pages in one layout simultaneously."
      guidePath="src/app/dashboard/GUIDE.md"
    >
      <div className="panel">
        This layout receives <code>children</code> (the page), plus a{" "}
        <code>team</code> and an <code>analytics</code> prop — one per{" "}
        <code>@slot</code> folder — and renders them together below.
      </div>

      {children}

      <div className="grid-2">
        {team}
        {analytics}
      </div>
    </ConceptLayout>
  );
}
