# Example: Multiple Root Layouts

A standalone Next.js app showing **multiple root layouts** — the one project-
structure concept that can't live in the main lab (it requires removing the
top-level `layout.tsx`).

## Run it

```bash
cd examples/multiple-root-layouts
npm install
npm run dev      # http://localhost:3000
```

- `/` → blue **(marketing)** root layout
- `/cart` → green **(shop)** root layout

Each route group provides its **own** `<html>`/`<body>`. See `GUIDE.md`.
