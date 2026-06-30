// CATCH-ALL ROUTE: app/shop/[...slug]/page.tsx
//   /shop/men            → slug = ["men"]
//   /shop/men/shoes      → slug = ["men", "shoes"]
//   /shop/men/shoes/blue → slug = ["men", "shoes", "blue"]
//
// `params.slug` is a string[]. As always in Next 16, params is awaited.

import Link from "next/link";

export default async function ShopCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return (
    <div className="demo-box">
      <span className="badge">params.slug = {JSON.stringify(slug)}</span>
      <h4>/shop/{slug.join("/")}</h4>
      <p>
        The folder <code>[...slug]</code> captured <strong>{slug.length}</strong>{" "}
        segment(s) into an array. Breadcrumb:
      </p>
      <p className="muted">{["shop", ...slug].join("  ›  ")}</p>
      <Link className="btn ghost" href="/shop">
        ← Back to /shop
      </Link>
    </div>
  );
}
