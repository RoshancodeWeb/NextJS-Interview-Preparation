// Shared wrapper for every concept demo page: a back-link, title, subtitle,
// a pointer to the colocated GUIDE, then the demo content.
//
// Reused by all concept pages → demonstrates strategy #3 (split by feature):
// shared UI at the app root, concept-specific demos in each route folder.

import Link from "next/link";
import type { ReactNode } from "react";

export function ConceptLayout({
  title,
  subtitle,
  guidePath,
  children,
}: {
  title: string;
  subtitle?: string;
  /** Repo-relative path to the colocated guide, e.g. src/app/blog/GUIDE.md */
  guidePath?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Link href="/" className="back-link">
        ← All concepts
      </Link>
      <h1 className="page-title">{title}</h1>
      {subtitle ? <p className="page-sub">{subtitle}</p> : null}
      {guidePath ? (
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          📄 Detailed guide: <code>{guidePath}</code>{" "}
          (read the <code>GUIDE.md</code> / <code>GUIDE.pdf</code> next to the code).
        </p>
      ) : null}
      <div className="stack">{children}</div>
    </div>
  );
}
