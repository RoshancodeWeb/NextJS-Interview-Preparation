// ROOT LAYOUT (special file: `layout`).
// - Required at the top of `app/`. It must render <html> and <body>.
// - It WRAPS every route and persists across navigation (it does not re-mount).
// - `metadata` here applies app-wide and is the base for the metadata files
//   (icon, opengraph-image, sitemap, ...). `metadataBase` makes generated
//   image/SEO URLs absolute.

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Next.js Structure Lab",
    template: "%s · Next.js Structure Lab",
  },
  description:
    "A runnable, annotated demo of every Next.js App Router project-structure convention.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            <span className="logo">N</span>
            <span>Next.js Structure Lab</span>
          </Link>
          <nav className="links">
            <Link href="/">Home</Link>
            <Link href="/metadata">Metadata</Link>
            <a
              href="https://nextjs.org/docs/app/getting-started/project-structure"
              target="_blank"
              rel="noreferrer"
            >
              Docs ↗
            </a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
