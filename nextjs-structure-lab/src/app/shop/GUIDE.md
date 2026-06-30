# Catch-all route — `[...slug]`

> **Live demo:** `/shop`, `/shop/men`, `/shop/men/shoes/blue`
> **Code:** `src/app/shop/`

## What it is

A **catch-all** segment, written `[...slug]`, matches **one or more** path
segments and gives you them as a **string array**.

| Folder | URL | `params.slug` |
| --- | --- | --- |
| `shop/[...slug]` | `/shop/men` | `["men"]` |
| `shop/[...slug]` | `/shop/men/shoes` | `["men", "shoes"]` |
| `shop/[...slug]` | `/shop/men/shoes/blue` | `["men","shoes","blue"]` |

```tsx
export default async function ShopCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params; // string[]
}
```

## The key gotcha: it does NOT match the base path

`[...slug]` matches `/shop/<something>` but **not** `/shop` itself. In this demo
`/shop` only works because there's a separate `shop/page.tsx`. Remove that and
`/shop` would 404.

➡ If you want **one file** to handle both `/shop` *and* `/shop/...`, use an
**optional** catch-all `[[...slug]]` (see the `/docs` demo).

## When to use

- Documentation trees, file browsers, category paths of unknown depth.
- Anywhere the number of segments isn't fixed.

## Interview Q&A

- **Q: `[...slug]` vs `[[...slug]]`?**
  Both capture multiple segments into an array. The double-bracket **optional**
  one *also* matches the parent/base path; the single-bracket one does not.
- **Q: What type is `params.slug` for a catch-all?**
  `string[]` (and the `params` object is a Promise you await).
