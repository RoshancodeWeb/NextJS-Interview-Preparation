"use client";

// GLOBAL ERROR (special file: `global-error`).
// Catches errors thrown in the ROOT layout/template — the one place a normal
// `error.tsx` cannot cover. Because it REPLACES the root layout when active, it
// must render its own <html> and <body>. Client Component is required.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#0b1220",
          color: "#e6edf3",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 460, padding: 24 }}>
          <h1>Something went really wrong</h1>
          <p style={{ color: "#9fb0c8" }}>
            This is <code>global-error.tsx</code> — it caught an error from the
            root layout itself.
          </p>
          {error?.digest ? (
            <p style={{ color: "#9fb0c8" }}>Digest: {error.digest}</p>
          ) : null}
          <button className="btn" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
