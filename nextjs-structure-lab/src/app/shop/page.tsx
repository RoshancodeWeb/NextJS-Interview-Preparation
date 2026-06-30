// PAGE for /shop itself.
//
// IMPORTANT teaching point: a catch-all `[...slug]` does NOT match the base path
// (`/shop`). This `shop/page.tsx` is what makes `/shop` work. Delete it and
// `/shop` would 404 — which is exactly the difference from an OPTIONAL
// catch-all `[[...slug]]` (see /docs), which matches the base too.

import Link from "next/link";
import { Callout } from "../_components/Callout";

export default function ShopIndex() {
  return (
    <div className="stack">
      <Callout variant="warn">
        <p>
          You&apos;re on <code>/shop</code>, served by <code>shop/page.tsx</code>.
          The catch-all <code>[...slug]</code> only handles <code>/shop/&lt;…&gt;</code>{" "}
          — one or more segments below this one.
        </p>
      </Callout>

      <div className="demo-box">
        <h4>Try the catch-all with different depths:</h4>
        <nav className="row">
          <Link className="btn ghost" href="/shop/men">
            /shop/men
          </Link>
          <Link className="btn ghost" href="/shop/men/shoes">
            /shop/men/shoes
          </Link>
          <Link className="btn ghost" href="/shop/men/shoes/blue">
            /shop/men/shoes/blue
          </Link>
        </nav>
      </div>
    </div>
  );
}
