// ROBOTS (metadata file: `robots`).
// Exporting a default function from `robots.ts` makes Next serve a generated
// `/robots.txt`. We point crawlers at the generated sitemap above.

import type { MetadataRoute } from "next";

const BASE_URL = "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private-folders/_secret", // illustrative only
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
