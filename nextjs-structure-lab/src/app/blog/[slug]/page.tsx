// DYNAMIC ROUTE: app/blog/[slug]/page.tsx → /blog/:slug
//
// Key Next 15/16 detail: `params` is a PROMISE, so the component is async and
// awaits it. We also show two common helpers:
//   - generateStaticParams: pre-render known slugs at build time.
//   - generateMetadata: per-page <title> from the awaited params.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "../_lib/posts";

// Pre-render these slugs at build time (the rest render on demand).
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.title : "Post not found" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← must await: params is a Promise
  const post = getPost(slug);

  // Unknown slug → render the nearest not-found UI (root app/not-found.tsx here).
  if (!post) notFound();

  return (
    <div className="demo-box">
      <span className="badge">params.slug = &quot;{slug}&quot;</span>
      <h4 style={{ marginBottom: 4 }}>{post.title}</h4>
      <p className="muted" style={{ marginTop: 0 }}>
        by {post.author}
      </p>
      <p>{post.excerpt}</p>
      <Link className="btn ghost" href="/blog">
        ← All posts
      </Link>
    </div>
  );
}
