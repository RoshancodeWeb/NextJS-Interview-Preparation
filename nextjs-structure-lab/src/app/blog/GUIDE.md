# Nested routes + a dynamic `[slug]`

> **Live demo:** `/blog` (and `/blog/authors`, `/blog/hello-world`)
> **Code:** `src/app/blog/`

## What it is

Two concepts in one folder:

1. **Nested routes** — folders nest to nest URL segments, and a parent
   `layout.tsx` wraps every child.
2. **A dynamic route** — `[slug]` captures a single URL segment as a parameter.

## Files in this folder

| Path | URL | Notes |
| --- | --- | --- |
| `blog/layout.tsx` | — | Wraps the index, `authors`, and every `[slug]` |
| `blog/page.tsx` | `/blog` | Post list |
| `blog/authors/page.tsx` | `/blog/authors` | A nested static route |
| `blog/[slug]/page.tsx` | `/blog/:slug` | Dynamic — reads the slug |
| `blog/_lib/posts.ts` | — | Data (private folder, not routable) |

## The dynamic route — the important details

```tsx
// app/blog/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;   // ← params is a PROMISE in Next 15/16
}) {
  const { slug } = await params;        // ← so you await it
  ...
}
```

- **`params` is a Promise** (Next 15/16). The component is `async` and `await`s
  it. (In older Next it was a plain object.)
- **`generateStaticParams()`** pre-renders known slugs at build time (this demo
  pre-builds `hello-world`, `app-router-basics`, `server-components`). The build
  log shows them under `/blog/[slug]`.
- **`generateMetadata()`** builds a per-page `<title>` from the awaited params.
- An unknown slug calls **`notFound()`** → the nearest `not-found.tsx`
  (here the root one) renders.

## When to use

Dynamic segments for any "detail" page keyed by an id/slug: posts, products,
users, etc. Nested folders whenever a URL has sub-sections that should share a
layout.

## Interview Q&A

- **Q: How do you read a route param in the App Router (Next 15/16)?**
  `params` is a Promise — make the component `async` and `await params`.
- **Q: What does `generateStaticParams` do?**
  Tells Next which dynamic values to pre-render at build time (SSG); others
  render on demand.
- **Q: Does a child route automatically get the parent layout?**
  Yes — every segment is wrapped by all ancestor layouts.
