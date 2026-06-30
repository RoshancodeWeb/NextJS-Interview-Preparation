// ROOT LAYOUT #2 — for the (shop) group. A DIFFERENT root layout than
// (marketing): different colors, different <html>/<body>. Same app, two roots.

import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = { title: "Shop • Multiple Root Layouts" };

export default function ShopRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-monospace, monospace", margin: 0, background: "#eafaf3", color: "#0b1220" }}>
        <header style={{ padding: "14px 20px", background: "#1f9d6b", color: "white" }}>
          <strong>(shop) root layout</strong> — a separate &lt;html&gt; / &lt;body&gt;
        </header>
        <main style={{ padding: 20 }}>{children}</main>
        <footer style={{ padding: 20, color: "#4b6b5c" }}>
          <Link href="/">← Back to home (marketing root layout)</Link>
        </footer>
      </body>
    </html>
  );
}
