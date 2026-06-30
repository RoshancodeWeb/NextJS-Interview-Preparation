# Private folders — `_folder`

> **Live demo:** `/private-folders` · **Code:** `src/app/private-folders/`

## What it is

Prefixing a folder name with an **underscore** (`_components`, `_lib`) makes it a
**private folder**: it (and everything inside it) is **opted out of routing**. It
can never become a URL — it's only ever reached by being imported.

## Files in this folder

| Path | Routable? |
| --- | --- |
| `private-folders/page.tsx` | ✅ → `/private-folders` |
| `private-folders/_components/Banner.tsx` | ❌ imported only |
| `private-folders/_lib/data.ts` | ❌ imported only |

Try opening `/private-folders/_components` in the browser → **404**.

## Private folder vs colocation

Colocation already prevents non-`page`/`route` files from being routable, so
private folders aren't *required*. They add value by:

- Separating UI/logic from routing clearly.
- Consistent, recognizable structure across a codebase.
- Avoiding name clashes with future Next.js special files.

## Tips

- The whole subtree is excluded, not just the top folder.
- Need a literal underscore **in a URL**? Use the encoded form `%5Ffolder`.

## Interview Q&A

- **Q: What does a leading underscore on a folder do?**
  Opts the folder and all its subfolders out of the router — they can't be URLs.
- **Q: If colocation already prevents routing, why use private folders?**
  For intent, consistent organization, and to avoid clashing with Next.js
  reserved filenames.
