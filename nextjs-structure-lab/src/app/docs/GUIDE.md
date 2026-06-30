# Optional catch-all route — `[[...slug]]`

> **Live demo:** `/docs`, `/docs/getting-started`, `/docs/api/reference`
> **Code:** `src/app/docs/`

## What it is

An **optional catch-all**, written `[[...slug]]` (double brackets), works like
`[...slug]` **but also matches the base path**. One file covers everything.

| Folder | URL | `params.slug` |
| --- | --- | --- |
| `docs/[[...slug]]` | `/docs` | `undefined` |
| `docs/[[...slug]]` | `/docs/getting-started` | `["getting-started"]` |
| `docs/[[...slug]]` | `/docs/api/reference` | `["api","reference"]` |

```tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>; // slug is OPTIONAL → can be undefined
}) {
  const { slug } = await params;
  const segments = slug ?? [];          // default it
}
```

## Why it matters

- **No separate `docs/page.tsx` is needed.** `/docs` (base) and every nested
  path are all handled by the single `[[...slug]]` file.
- `slug` can be `undefined`, so always default it (`slug ?? []`).

Compare with the `/shop` catch-all, which required its own `page.tsx` for the
base path.

## When to use

A docs site or wiki where the index and all nested pages share one renderer.

## Interview Q&A

- **Q: When would you pick `[[...slug]]` over `[...slug]`?**
  When the *base* route and the nested routes should be served by the same file
  (the base path must match too).
- **Q: What's `params.slug` at the base path?**
  `undefined` — handle it (e.g. `slug ?? []`).
