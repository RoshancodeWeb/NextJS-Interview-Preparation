"use client";

// Calls the colocated `route.ts` API and shows the JSON. Client Component
// because it has interactivity (a button + state).

import { useState } from "react";

export function ApiDemo() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function call() {
    setLoading(true);
    try {
      const res = await fetch("/routing-files/api");
      setData(JSON.stringify(await res.json(), null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="demo-box">
      <h4>route.ts — an API endpoint</h4>
      <p className="muted">
        <code>GET /routing-files/api</code> · a folder may have a <code>page</code>{" "}
        <strong>or</strong> a <code>route</code>, never both.
      </p>
      <button className="btn" onClick={call} disabled={loading}>
        {loading ? "Calling…" : "Call the API"}
      </button>
      {data ? <pre>{data}</pre> : null}
    </div>
  );
}
