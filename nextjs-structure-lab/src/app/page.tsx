// HOME PAGE (special file: `page`) for the route "/".
// A folder only becomes a public URL once it has a `page` (or `route`) file —
// this one makes "/" accessible.
//
// It reads the concept registry from the `_lib` private folder and renders an
// index card per concept, grouped by category.

import Link from "next/link";
import { concepts, categoryOrder, type Category } from "./_lib/concepts";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <span className="badge">Next.js 16 · App Router</span>
        <h1>Next.js Project-Structure Lab</h1>
        <p>
          Every folder &amp; file convention from the official{" "}
          <a
            href="https://nextjs.org/docs/app/getting-started/project-structure"
            target="_blank"
            rel="noreferrer"
          >
            Project Structure
          </a>{" "}
          page, implemented as a live demo. Click a card to see it run, then read
          the <code>GUIDE.md</code> / <code>GUIDE.pdf</code> next to its code.
        </p>
      </section>

      {categoryOrder.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  const items = concepts.filter((c) => c.category === category);
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="category-title">{category}</h2>
      <div className="concept-grid">
        {items.map((c) => (
          <Link key={c.slug} href={c.href} className="concept-card">
            <h3>{c.title}</h3>
            <p>{c.blurb}</p>
            {c.syntax ? <span className="badge">{c.syntax}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
