// Central registry of every concept demo in this lab.
//
// This file lives in `_lib/` — a PRIVATE FOLDER (the leading underscore opts it
// out of routing), so it can never become a URL. The home page maps over this
// list to render its index. Editing one array keeps the home page in sync.

export type Concept = {
  /** Short id. */
  slug: string;
  /** Card title. */
  title: string;
  /** A representative URL to open the live demo. */
  href: string;
  /** One-line description shown on the card. */
  blurb: string;
  /** Convention syntax shown as a badge (optional). */
  syntax?: string;
  /** Grouping on the home page. */
  category: Category;
};

export type Category =
  | "Special files"
  | "Routes"
  | "Organization"
  | "Advanced routing"
  | "Metadata";

/** Display order of categories on the home page. */
export const categoryOrder: Category[] = [
  "Special files",
  "Routes",
  "Organization",
  "Advanced routing",
  "Metadata",
];

export const concepts: Concept[] = [
  {
    slug: "routing-files",
    title: "Routing files",
    href: "/routing-files",
    syntax: "layout · page · loading · error · not-found · route",
    blurb:
      "The special files that build a route: layout, template, page, loading, error, not-found, and a route.ts API.",
    category: "Special files",
  },
  {
    slug: "component-hierarchy",
    title: "Component hierarchy",
    href: "/component-hierarchy",
    blurb:
      "See the exact order Next nests the special files: layout → template → error → loading → not-found → page.",
    category: "Special files",
  },
  {
    slug: "blog",
    title: "Nested routes",
    href: "/blog",
    blurb:
      "Folders nest into URL segments; each level's layout wraps its children. /blog and /blog/authors.",
    category: "Routes",
  },
  {
    slug: "blog-slug",
    title: "Dynamic route",
    href: "/blog/hello-world",
    syntax: "[slug]",
    blurb:
      "A single dynamic segment. /blog/[slug] matches /blog/hello-world. Read it from awaited params.",
    category: "Routes",
  },
  {
    slug: "shop",
    title: "Catch-all route",
    href: "/shop/men/shoes",
    syntax: "[...slug]",
    blurb:
      "Matches one or more segments. /shop/[...slug] matches /shop/men and /shop/men/shoes/blue.",
    category: "Routes",
  },
  {
    slug: "docs",
    title: "Optional catch-all",
    href: "/docs",
    syntax: "[[...slug]]",
    blurb:
      "Like catch-all but also matches the base path. /docs/[[...slug]] matches /docs AND /docs/a/b.",
    category: "Routes",
  },
  {
    slug: "route-groups",
    title: "Route groups",
    href: "/about",
    syntax: "(group)",
    blurb:
      "Group routes without adding a URL segment. (marketing)/about → /about, (store)/cart → /cart.",
    category: "Organization",
  },
  {
    slug: "private-folders",
    title: "Private folders",
    href: "/private-folders",
    syntax: "_folder",
    blurb:
      "An underscore opts a folder out of routing — a safe home for components and helpers.",
    category: "Organization",
  },
  {
    slug: "colocation",
    title: "Colocation",
    href: "/colocation",
    blurb:
      "Only page/route files become URLs, so you can safely keep components, tests and data beside a page.",
    category: "Organization",
  },
  {
    slug: "dashboard",
    title: "Parallel routes",
    href: "/dashboard",
    syntax: "@slot",
    blurb:
      "Render several pages in one layout at once. A dashboard with independent @team and @analytics slots.",
    category: "Advanced routing",
  },
  {
    slug: "gallery",
    title: "Intercepting routes",
    href: "/gallery",
    syntax: "(.)folder",
    blurb:
      "Open a route as a modal over the current page on soft navigation; a full page on refresh/hard load.",
    category: "Advanced routing",
  },
  {
    slug: "metadata",
    title: "Metadata files",
    href: "/metadata",
    syntax: "icon · sitemap · robots",
    blurb:
      "Special files that auto-wire the head and SEO: icons, OG/Twitter images, sitemap.xml, robots.txt.",
    category: "Metadata",
  },
];
