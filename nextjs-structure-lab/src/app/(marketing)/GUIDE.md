# Route groups — `(group)`

> **Live demos:** `/about` (in `(marketing)`) and `/cart` (in `(store)`)
> **Code:** `src/app/(marketing)/` and `src/app/(store)/`

> This guide covers **both** groups in this lab.

## What it is

Wrapping a folder name in **parentheses** — `(marketing)`, `(store)` — creates a
**route group**. The group name is used only for organization and is **omitted
from the URL**.

| File | URL | The group adds to the path? |
| --- | --- | --- |
| `app/(marketing)/about/page.tsx` | `/about` | ❌ no |
| `app/(store)/cart/page.tsx` | `/cart` | ❌ no |

## What it's for

1. **Organize routes** by team/section/intent without changing URLs
   (marketing pages vs shop pages vs admin).
2. **Give a subset of routes their own layout.** In this lab `(marketing)` and
   `(store)` each have a **different `layout.tsx`**, even though both live at the
   URL root. Notice the accent color differs between `/about` and `/cart`.
3. Opt specific routes into (or out of) a shared layout/loading skeleton without
   nesting the URL.

## Related: multiple root layouts

If you remove the top-level `app/layout.tsx` and give **each group its own root
layout** (with its own `<html>`/`<body>`), you get *multiple root layouts* —
totally separate shells. Because that conflicts with this lab's single shared
shell, it's demonstrated in its own app: `examples/multiple-root-layouts/`.

## Gotcha

Don't create two routes that resolve to the **same URL** in different groups
(e.g. a `(a)/page.tsx` and `(b)/page.tsx` both mapping to `/`) — that's a
conflict.

## Interview Q&A

- **Q: Does `(group)` affect the URL?**
  No. Parentheses are stripped from the path; they're purely organizational.
- **Q: Give a real reason to use route groups.**
  To apply different layouts to different sections that share the same URL level
  (e.g. a marketing shell vs an app shell), or to scope a `loading.tsx` to just
  some routes.
