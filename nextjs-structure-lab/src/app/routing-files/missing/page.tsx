// Demonstrates `not-found.tsx`. Calling notFound() throws a special control-flow
// error that Next catches to render the nearest not-found UI. notFound() returns
// `never`, so nothing after it runs.

import { notFound } from "next/navigation";

export default function MissingPage() {
  notFound();
}
