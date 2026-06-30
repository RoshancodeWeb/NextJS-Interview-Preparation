// SITEMAP (metadata file: `sitemap`).
// Exporting a default function from `sitemap.ts` makes Next serve a generated
// `/sitemap.xml`. Here we build it from the concept registry so it stays in
// sync with the demos.

import type { MetadataRoute } from "next";
import { concepts } from "./_lib/concepts";

const BASE_URL = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: BASE_URL,
    lastModified: "2026-06-30",
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  const conceptRoutes = concepts.map((c) => ({
    url: `${BASE_URL}${c.href}`,
    lastModified: "2026-06-30",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [home, ...conceptRoutes];
}
