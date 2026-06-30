# Next.js Project-Structure Learning Lab

A hands-on, runnable companion to the official
[**Project structure and organization**](https://nextjs.org/docs/app/getting-started/project-structure)
docs page. **Every** folder/file convention on that page is implemented as a
live, browsable demo, and each concept has a **PDF guide colocated in its
folder** so you can revise offline.

Built for **Next.js interview prep**: open the app, click through each concept,
read the matching `GUIDE` next to the code.

---

## Quick start

```bash
cd nextjs-structure-lab
npm install          # one-time (node_modules is git-ignored, never committed)
npm run dev          # open http://localhost:3000  → home page links to every demo
```

Other commands (from `nextjs-structure-lab/`):

```bash
npm run build        # production build — proves every route/convention compiles
```

Regenerate the PDF guides (from the **repo root**, separate tooling):

```bash
cd ..                # repo root
npm install          # one-time: installs `marked`
npm run build:pdfs   # rebuilds every GUIDE.pdf from its GUIDE.md (needs wkhtmltopdf)
```

> The home page (`/`) is an index: a short blurb + link for each concept. Start
> there. Start with `guides/00-overview.md` for the big picture.

---

## What's inside

```
NextJS-Interview-Preparation/
├─ guides/00-overview.md        ← read this first: the whole page summarized
├─ scripts/build-pdfs.mjs       ← turns every GUIDE.md into a colocated GUIDE.pdf
├─ nextjs-structure-lab/        ← THE MAIN APP (one app, demonstrates ~everything)
│  └─ src/app/<concept>/        ← each concept: live demo + GUIDE.md + GUIDE.pdf
└─ examples/                    ← tiny standalone apps for concepts needing isolation
   ├─ multiple-root-layouts/
   └─ pages-router/
```

## Concept → where to look

| Concept | Live demo (URL) | Code + guide |
| --- | --- | --- |
| Routing files (`layout`/`page`/`loading`/`error`/`template`/`not-found`/`route`) | `/routing-files` | `src/app/routing-files/` |
| Component hierarchy (render order) | `/component-hierarchy` | `src/app/component-hierarchy/` |
| Nested routes | `/blog`, `/blog/authors` | `src/app/blog/` |
| Dynamic route `[slug]` | `/blog/hello-world` | `src/app/blog/[slug]/` |
| Catch-all `[...slug]` | `/shop/men/shoes` | `src/app/shop/[...slug]/` |
| Optional catch-all `[[...slug]]` | `/docs`, `/docs/a/b` | `src/app/docs/[[...slug]]/` |
| Route groups `(group)` | `/about`, `/cart` | `src/app/(marketing)/`, `src/app/(store)/` |
| Private folders `_folder` | `/private-folders` | `src/app/private-folders/` |
| Colocation | `/colocation` | `src/app/colocation/` |
| Parallel routes `@slot` | `/dashboard` | `src/app/dashboard/` |
| Intercepting routes `(.)` (modal) | `/gallery` | `src/app/gallery/` |
| Metadata files (icons/OG/sitemap/robots) | `/metadata`, `/sitemap.xml`, `/robots.txt` | `src/app/metadata/` + files in `src/app/` |
| Top-level files (`proxy`, `instrumentation`, env, config) | — | `nextjs-structure-lab/` root |
| `src` folder | — | the whole app lives in `src/` |
| Multiple root layouts | run separately | `examples/multiple-root-layouts/` |
| `pages` router (contrast) | run separately | `examples/pages-router/` |

## Notes

- **`node_modules` is never committed** (git-ignored). Run `npm install` to get it.
- Real `.env` files are git-ignored; only `.env.example` is committed.
- PDF generation lives at the **repo root** (`scripts/build-pdfs.mjs` +
  root `package.json`). It uses the system **`wkhtmltopdf`** binary + the
  `marked` dev-dependency. The committed `*.pdf` files are already up to date;
  you only need this to regenerate them after editing a `GUIDE.md`. If
  `wkhtmltopdf` isn't installed: `brew install --cask wkhtmltopdf`.
- The `examples/*` apps are intentionally minimal and each have their own
  `README` + run steps.

## How to study this for an interview

1. Read `guides/00-overview.md`.
2. `npm run dev`, then walk the home page top to bottom.
3. For each concept: open the demo in the browser **and** read its `GUIDE` next
   to the code. The guides end with 1–2 likely interview questions.
