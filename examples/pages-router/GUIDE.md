# Pages Router — the `pages/` top-level folder

> **Live demo:** `/` and `/api/hello` — run this app separately.
> **Code:** `examples/pages-router/pages/`

## What it is

Before the App Router (`app/`), Next.js routed via the **`pages/`** directory.
It's still supported and listed as a top-level folder in the docs. This tiny app
exists to show what `pages/` looks like, for contrast.

## How `pages/` routing works

| File | URL |
| --- | --- |
| `pages/index.tsx` | `/` |
| `pages/about.tsx` | `/about` |
| `pages/blog/[slug].tsx` | `/blog/:slug` |
| `pages/api/hello.ts` | `/api/hello` (API) |

The **default export** of a file is the page. There are no `layout`/`loading`/
`error` special files; shared UI uses a custom `pages/_app.tsx`, and the document
shell uses `pages/_document.tsx`.

## App Router vs Pages Router (interview-ready)

| Topic | Pages Router (`pages/`) | App Router (`app/`) |
| --- | --- | --- |
| Routing unit | a file's default export | a `page.tsx` in a folder |
| Components | Client by default | **Server Components** by default |
| Layouts | manual (`_app`, per-page) | built-in nested `layout.tsx` |
| Data fetching | `getServerSideProps` / `getStaticProps` / `getStaticPaths` | `async`/`await` in Server Components; `generateStaticParams` |
| API | `pages/api/*` default handler `(req,res)` | `route.ts` with `GET`/`POST` exports |
| Loading/Error UI | manual | `loading.tsx` / `error.tsx` |
| Streaming/Suspense | limited | first-class |

## Can they coexist?

Yes — `app/` and `pages/` can live in the same project during migration, but a
given URL must be owned by only one of them. New apps should use `app/`.

## Interview Q&A

- **Q: What's the difference between `pages/` and `app/`?**
  `pages/` is the older file-as-route system (client components by default,
  `getServerSideProps`); `app/` is the modern router with Server Components,
  nested layouts, and special files (`layout`, `loading`, `error`, `route`).
- **Q: Where do API routes go in each?**
  Pages Router: `pages/api/*.ts` (default handler). App Router: `route.ts` with
  HTTP-method exports.
