# Intercepting routes — `(.)folder` (the modal pattern)

> **Live demo:** `/gallery` (click a photo → modal; refresh the modal URL → full page)
> **Code:** `src/app/gallery/`

## What it is

**Intercepting routes** let you load a route from elsewhere in the app **inside
the current layout**, instead of navigating away. The classic use is a
**modal**: clicking a thumbnail opens a detail view as an overlay on **soft**
(client-side) navigation, but visiting/refreshing that same URL loads the
**full** page.

## The matchers

| Convention | Meaning |
| --- | --- |
| `(.)folder` | Intercept a route at the **same** level |
| `(..)folder` | Intercept one level **up** |
| `(..)(..)folder` | Two levels up |
| `(...)folder` | Intercept from the **app root** |

This demo uses `(.)photo` — intercepting the sibling `photo` route.

## Files in this folder (combines intercepting + a parallel slot)

| Path | Role |
| --- | --- |
| `gallery/layout.tsx` | Renders `children` (grid) **and** the `modal` slot |
| `gallery/page.tsx` | The photo grid; links to `/gallery/photo/[id]` |
| `gallery/photo/[id]/page.tsx` | **Full page** view (hard load / refresh) |
| `gallery/@modal/(.)photo/[id]/page.tsx` | The **intercepted modal** (soft nav) |
| `gallery/@modal/default.tsx` | `null` when no modal is open |

## How it works

1. On `/gallery`, the `@modal` slot has no match → `default.tsx` renders `null`.
2. Click a photo → **soft navigation** to `/gallery/photo/1`. The `(.)photo`
   interceptor (inside `@modal`) renders **over** the grid, because the grid
   (`children`) and the modal (`modal` slot) render in parallel.
3. **Refresh** `/gallery/photo/1` → it's a hard load, so interception **doesn't**
   apply: the real `photo/[id]/page.tsx` full page renders.

The modal closes with `router.back()` (backdrop or Close button).

## When to use

Image lightboxes, "quick view" dialogs, login modals — anything that should be a
shareable/refreshable URL **and** an in-context overlay.

## Interview Q&A

- **Q: What do `(.)`, `(..)`, `(...)` mean?**
  Where to intercept *from*: same level, one level up, and the app root,
  respectively.
- **Q: Why does the modal become a full page on refresh?**
  Interception only happens on **soft** (client) navigation. A hard load hits
  the real route directly.
- **Q: Why is a parallel `@modal` slot used with the interceptor?**
  So the modal renders **on top of** the existing page (both render at once),
  rather than replacing it.
