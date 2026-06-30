// ROOT LAYOUT #1 — for the (marketing) group.
// There is NO top-level app/layout.tsx in this app. Instead, EACH route group
// provides its own root layout, so each must render its own <html> and <body>.
// This gives sections completely independent shells.

import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = { title: "Marketing • Multiple Root Layouts" };

export default function MarketingRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#eef4ff", color: "#0b1220" }}>
        <header style={{ padding: "14px 20px", background: "#2b66d9", color: "white" }}>
          <strong>(marketing) root layout</strong> — its own &lt;html&gt; / &lt;body&gt;
        </header>
        <main style={{ padding: 20 }}>{children}</main>
        <footer style={{ padding: 20, color: "#5b6b86" }}>
          <Link href="/cart">Jump to /cart (the other root layout) →</Link>
        </footer>
      </body>
    </html>
  );
}
