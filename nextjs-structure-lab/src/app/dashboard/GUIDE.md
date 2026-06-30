# Parallel routes — `@slot`

> **Live demo:** `/dashboard` · **Code:** `src/app/dashboard/`

## What it is

**Parallel routes** let one layout render **multiple pages at the same time**.
A folder named `@name` is a **named slot**; it's passed to the segment's
`layout.tsx` as a **prop** (named after the slot), alongside the usual
`children`.

## Files in this folder

| Path | Becomes | Renders |
| --- | --- | --- |
| `dashboard/layout.tsx` | — | Receives `children`, `team`, `analytics` |
| `dashboard/page.tsx` | `children` slot | Overview |
| `dashboard/@team/page.tsx` | `team` prop | Team panel |
| `dashboard/@analytics/page.tsx` | `analytics` prop | Analytics panel |
| `dashboard/@team/default.tsx` | — | Fallback when slot is unmatched |
| `dashboard/@analytics/default.tsx` | — | Fallback when slot is unmatched |

```tsx
export default function DashboardLayout({ children, team, analytics }) {
  return (<>{children}{team}{analytics}</>);
}
```

## `default.tsx` — why it's needed

`@slot` folders are not part of the URL. On a **hard navigation** to a URL the
slot doesn't define, Next needs to know what to render there — that's
`default.tsx`. Returning `null` renders nothing. **Without a `default.tsx`, an
unmatched slot 404s.**

## When to use

- Dashboards with independent panels.
- Showing two things at once that can load/error/navigate independently.
- Combined with intercepting routes, to render **modals** (see `/gallery`).

## Interview Q&A

- **Q: How does a `@slot` reach the layout?**
  As a prop named after the slot (e.g. `@team` → `team`), in addition to
  `children` (the unnamed slot = `page.tsx`).
- **Q: What is `default.tsx` for in parallel routes?**
  It's the fallback a slot renders for URLs it doesn't match (especially on hard
  navigation); without it the slot 404s.
- **Q: Do `@slot` folders change the URL?**
  No — like route groups, they're organizational.
