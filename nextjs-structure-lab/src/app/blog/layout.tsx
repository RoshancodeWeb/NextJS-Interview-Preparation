// NESTED LAYOUT for /blog (special file: `layout`).
// Demonstrates nested routes: this layout wraps the blog index, /blog/authors,
// and every /blog/[slug]. The section nav below persists while children change.

import Link from "next/link";
import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Nested routes"
      subtitle="Nest folders to nest URL segments. A parent layout wraps all its children."
      guidePath="src/app/blog/GUIDE.md"
    >
      <div className="panel">
        <code>app/blog/layout.tsx</code> wraps everything under <code>/blog</code>:
        the index, <code>/blog/authors</code>, and each <code>/blog/[slug]</code>.
      </div>
      <nav className="row">
        <Link className="btn ghost" href="/blog">
          Posts
        </Link>
        <Link className="btn ghost" href="/blog/authors">
          Authors (nested)
        </Link>
      </nav>
      {children}
    </ConceptLayout>
  );
}
