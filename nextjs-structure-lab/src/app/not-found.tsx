// ROOT NOT-FOUND (special file: `not-found` at the top of app/).
// The app-wide 404 UI: shown for unmatched URLs and for any `notFound()` that
// isn't caught by a closer not-found.tsx (e.g. an unknown /blog/[slug]).

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="stack">
      <h1 className="page-title">404 — Not found</h1>
      <p className="page-sub">
        This route doesn&apos;t exist. You&apos;re seeing the root{" "}
        <code>app/not-found.tsx</code>.
      </p>
      <Link className="btn" href="/">
        ← Back to all concepts
      </Link>
    </div>
  );
}
