// PAGE for /blog. Lists posts; each links to a dynamic /blog/[slug] route.

import Link from "next/link";
import { posts } from "./_lib/posts";

export default function BlogIndex() {
  return (
    <div className="demo-box">
      <h4>/blog — posts</h4>
      <ul className="clean">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>{" "}
            <span className="muted">— {p.excerpt}</span>
          </li>
        ))}
      </ul>
      <p className="muted">
        Each link goes to <code>app/blog/[slug]/page.tsx</code> →{" "}
        <code>/blog/:slug</code>.
      </p>
    </div>
  );
}
