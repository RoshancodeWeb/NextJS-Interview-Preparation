// PROXY (top-level file: `proxy.ts`) — Next.js 16+.
// Runs on the server BEFORE a request is completed. This is the renamed,
// modern replacement for `middleware.ts`. With a `src/` folder it lives in
// `src/`, at the same level as `app/`.
//
// IMPORTANT: without `config.matcher` a proxy runs on EVERY request (including
// static assets). We scope it to /about so it can't interfere with the demos.
// Here it just attaches a demo response header — open /about in DevTools and
// look for `x-demo-proxy` in the response headers.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-demo-proxy", `hello from proxy.ts (${request.nextUrl.pathname})`);
  return response;
}

export const config = {
  matcher: "/about/:path*",
};
