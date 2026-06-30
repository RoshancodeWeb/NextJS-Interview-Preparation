"use client";

// ERROR UI (special file: `error`).
// A React error boundary for this segment. MUST be a Client Component. It
// receives the thrown `error` and a `reset()` to retry rendering the segment.
// (It does NOT catch errors in the segment's own layout — that's global-error.)

import { useEffect } from "react";

export default function RoutingFilesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real app you'd log to your error service here.
    console.error("Caught by routing-files/error.tsx:", error);
  }, [error]);

  return (
    <div className="callout danger">
      <span className="label">error.tsx caught a render error</span>
      <p>{error.message}</p>
      <button className="btn danger" onClick={() => reset()}>
        Try again (reset boundary)
      </button>
    </div>
  );
}
