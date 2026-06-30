// PAGES ROUTER home page.
// In the older `pages/` directory, a file = a route, and the DEFAULT EXPORT is
// the page component. `pages/index.tsx` → "/". There are no layout/loading/error
// special files here; conventions differ from the App Router.

import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Pages Router</h1>
      <p>
        This app uses the older <code>pages/</code> directory instead of{" "}
        <code>app/</code>. Here, <code>pages/index.tsx</code> maps to{" "}
        <code>/</code>, and data fetching uses <code>getServerSideProps</code> /{" "}
        <code>getStaticProps</code> rather than async Server Components.
      </p>
      <ul>
        <li>
          <code>pages/index.tsx</code> → <code>/</code> (this page)
        </li>
        <li>
          <code>pages/api/hello.ts</code> → <code>/api/hello</code> (API route)
        </li>
      </ul>
      <p>
        <Link href="/api/hello">Call /api/hello →</Link>
      </p>
      <p style={{ color: "#666" }}>
        The main lab (<code>nextjs-structure-lab</code>) uses the modern{" "}
        <code>app/</code> router. This example exists only to show the{" "}
        <code>pages/</code> top-level folder for contrast.
      </p>
    </main>
  );
}
