# Metadata files (icons, social images, SEO)

> **Live demo:** `/metadata` (+ `/sitemap.xml`, `/robots.txt`)
> **Code:** the files live at the top of `src/app/`; this page indexes them.

## What it is

Drop specially-named files in `app/` and Next.js automatically wires up the
`<head>` tags or serves the file — no manual `<link>`/`<meta>` needed. There are
two flavors: **static** files (e.g. `favicon.ico`) and **generated** files
(`.tsx`/`.ts` that produce the asset in code).

## The files in this lab (all at `app/`)

| File | Produces | Open |
| --- | --- | --- |
| `favicon.ico` | Tab icon | `/favicon.ico` |
| `icon.tsx` | `<link rel="icon">` (generated) | `/icon` |
| `apple-icon.tsx` | `<link rel="apple-touch-icon">` | `/apple-icon` |
| `opengraph-image.tsx` | `og:image` social preview | `/opengraph-image` |
| `twitter-image.tsx` | `twitter:image` | `/twitter-image` |
| `sitemap.ts` | `/sitemap.xml` | `/sitemap.xml` |
| `robots.ts` | `/robots.txt` | `/robots.txt` |

## Generated images (`ImageResponse`)

`icon.tsx`, `opengraph-image.tsx`, etc. export a default function returning
`new ImageResponse(<jsx/>, { width, height })` plus route-segment config like
`size`, `contentType`, and `alt`. Next runs them and injects the right tags.

## Code-based SEO

```ts
// sitemap.ts → /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap { return [ ... ]; }

// robots.ts → /robots.txt
export default function robots(): MetadataRoute.Robots { return { rules: {...}, sitemap: "..." }; }
```

## Also: the Metadata API

Beyond files, you export a `metadata` object (or `generateMetadata()`) from a
`layout`/`page` for `<title>`, `description`, etc. See the root
`app/layout.tsx` (`title.template`, `metadataBase`) and `blog/[slug]`
(`generateMetadata`).

## Interview Q&A

- **Q: How do you add a favicon/OG image in the App Router?**
  Put `favicon.ico` / `opengraph-image.(png|tsx)` in `app/`; Next injects the
  tags automatically. Use a `.tsx` file with `ImageResponse` to generate them.
- **Q: How do you generate a sitemap or robots file?**
  Export a default function from `app/sitemap.ts` / `app/robots.ts`; Next serves
  `/sitemap.xml` and `/robots.txt`.
- **Q: Static vs generated metadata files?**
  Static = a real asset file (e.g. `icon.png`). Generated = a `.ts`/`.tsx` file
  whose code produces the asset at build/request time.
