// PAGES ROUTER API route.
// In the Pages Router, API endpoints live under `pages/api/` and export a
// default handler `(req, res) => ...`. Compare with the App Router's
// `app/.../route.ts`, which exports per-method functions (GET/POST/...).

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: "Hello from pages/api/hello.ts (Pages Router API)",
    method: req.method,
  });
}
