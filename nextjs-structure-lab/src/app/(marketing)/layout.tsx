// LAYOUT for the (marketing) ROUTE GROUP.
// Wrapping a folder name in parentheses creates a "route group": it groups
// routes and can give them a shared layout, but the (parens) name is OMITTED
// from the URL. So app/(marketing)/about → /about, NOT /marketing/about.

import Link from "next/link";
import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Route groups — (group)"
      subtitle="Organize routes without adding a URL segment. Each group can have its own layout."
      guidePath="src/app/(marketing)/GUIDE.md"
    >
      <div className="panel" style={{ borderLeft: "4px solid var(--brand)" }}>
        You&apos;re inside the <code>(marketing)</code> group, which has its own
        layout. URL stays clean: <code>app/(marketing)/about</code> →{" "}
        <code>/about</code>.
      </div>
      <nav className="row">
        <Link className="btn ghost" href="/about">
          /about · (marketing)
        </Link>
        <Link className="btn ghost" href="/cart">
          /cart · (store)
        </Link>
      </nav>
      {children}
    </ConceptLayout>
  );
}
