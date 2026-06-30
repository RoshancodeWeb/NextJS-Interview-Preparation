"use client";

// The modal shell for the intercepted route. Client Component because it uses
// the router to close (go back) on backdrop click or the Close button.

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="modal-backdrop" onClick={() => router.back()}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn ghost" onClick={() => router.back()}>
            Close
          </button>
        </div>
        <p className="muted" style={{ fontSize: "0.8rem", marginBottom: 0 }}>
          This is the intercepted <code>(.)photo</code> route shown as a modal.
          Refresh this URL to load the full page instead.
        </p>
      </div>
    </div>
  );
}
