// Tiny in-memory "database" for the blog demo. Colocated in blog/_lib (private
// folder) so it's never routable.

export type Post = {
  slug: string;
  title: string;
  author: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, World",
    author: "Ada",
    excerpt: "The very first post — proves /blog/[slug] resolves a dynamic segment.",
  },
  {
    slug: "app-router-basics",
    title: "App Router Basics",
    author: "Linus",
    excerpt: "Folders are routes, files are conventions. That's the whole trick.",
  },
  {
    slug: "server-components",
    title: "Why Server Components",
    author: "Grace",
    excerpt: "Render on the server by default; opt into the client with 'use client'.",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
