// LAYOUT for the (store) ROUTE GROUP — a SEPARATE layout from (marketing).
// Both groups sit at the URL root, but each subtree gets a different shell.
// This is the main reason to use route groups: different layouts for different
// sections without nesting the URL.

import Link from "next/link";
import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Route groups — (group)"
      subtitle="The (store) group has a different layout than (marketing), even though both live at the root."
      guidePath="src/app/(marketing)/GUIDE.md"
    >
      <div className="panel" style={{ borderLeft: "4px solid var(--brand-2)" }}>
        You&apos;re inside the <code>(store)</code> group — note the accent color
        differs from <code>(marketing)</code>. <code>app/(store)/cart</code> →{" "}
        <code>/cart</code>.
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
