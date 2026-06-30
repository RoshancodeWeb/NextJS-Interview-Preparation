// ROUTE HANDLER (special file: `route`).
// `route.ts` defines an API endpoint by exporting HTTP-method functions
// (GET/POST/...). It returns data, not UI. A folder can have `page` OR `route`,
// never both. This lives at /routing-files/api because the folder is `api/`.

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from routing-files/api/route.ts",
    method: "GET",
    tip: "Swap GET for POST/PUT/DELETE to handle other verbs.",
    at: new Date().toISOString(),
  });
}
