// PAGE for /metadata. An index of the metadata special files, which all live at
// the TOP of app/ (not in this folder) because they apply app-wide. This page
// just documents them and links to the outputs you can open directly.

import { ConceptLayout } from "../_components/ConceptLayout";

const FILES: { file: string; output: string; href?: string }[] = [
  { file: "app/favicon.ico", output: "Browser tab icon", href: "/favicon.ico" },
  { file: "app/icon.tsx", output: "Generated <link rel=icon>", href: "/icon" },
  { file: "app/apple-icon.tsx", output: "Apple touch icon", href: "/apple-icon" },
  { file: "app/opengraph-image.tsx", output: "og:image (social preview)", href: "/opengraph-image" },
  { file: "app/twitter-image.tsx", output: "twitter:image", href: "/twitter-image" },
  { file: "app/sitemap.ts", output: "/sitemap.xml", href: "/sitemap.xml" },
  { file: "app/robots.ts", output: "/robots.txt", href: "/robots.txt" },
];

export default function MetadataPage() {
  return (
    <ConceptLayout
      title="Metadata files"
      subtitle="Special files that auto-wire the <head> and SEO endpoints — no manual <link>/<meta> needed."
      guidePath="src/app/metadata/GUIDE.md"
    >
      <div className="callout info">
        <span className="label">Where they live</span>
        <p>
          These files sit at the <strong>top of app/</strong>, not in this folder,
          because they apply app-wide. Open each output below in a new tab (icons
          and OG images are also injected into this page&apos;s <code>&lt;head&gt;</code>{" "}
          — try View Source).
        </p>
      </div>

      <div className="demo-box">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Produces</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {FILES.map((f) => (
              <tr key={f.file}>
                <td>
                  <code>{f.file}</code>
                </td>
                <td>{f.output}</td>
                <td>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noreferrer">
                      view ↗
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ConceptLayout>
  );
}
