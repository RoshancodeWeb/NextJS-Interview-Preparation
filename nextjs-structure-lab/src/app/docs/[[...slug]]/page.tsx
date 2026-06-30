// OPTIONAL CATCH-ALL: app/docs/[[...slug]]/page.tsx
//   /docs               → slug = undefined   (base path matches too!)
//   /docs/getting-started → slug = ["getting-started"]
//   /docs/api/reference   → slug = ["api", "reference"]
//
// Because slug can be undefined, default it to []. No separate docs/page.tsx is
// needed — this single file covers the base AND all nested paths.

import Link from "next/link";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];
  const atRoot = segments.length === 0;

  return (
    <div className="demo-box">
      <span className="badge">
        params.slug = {slug === undefined ? "undefined" : JSON.stringify(slug)}
      </span>
      <h4>{atRoot ? "/docs (the base path)" : `/docs/${segments.join("/")}`}</h4>
      <p>
        {atRoot
          ? "Notice this works even though slug is undefined — that's the 'optional' part. A normal [...slug] would 404 here."
          : `Captured ${segments.length} segment(s) below /docs.`}
      </p>
      <nav className="row">
        <Link className="btn ghost" href="/docs">
          /docs
        </Link>
        <Link className="btn ghost" href="/docs/getting-started">
          /docs/getting-started
        </Link>
        <Link className="btn ghost" href="/docs/api/reference">
          /docs/api/reference
        </Link>
      </nav>
    </div>
  );
}
