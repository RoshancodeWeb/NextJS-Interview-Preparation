// NOT-FOUND UI (special file: `not-found`).
// Rendered when `notFound()` is called inside this segment (see
// /routing-files/missing) or when a URL doesn't match a route here.

import Link from "next/link";

export default function RoutingFilesNotFound() {
  return (
    <div className="callout warn">
      <span className="label">not-found.tsx</span>
      <p>That item doesn&apos;t exist — <code>notFound()</code> was called.</p>
      <Link className="btn ghost" href="/routing-files">
        Back to the section
      </Link>
    </div>
  );
}
