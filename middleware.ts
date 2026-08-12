import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isPrelaunch,
  isPrelaunchLockedPath,
  prelaunchRedirectHash,
} from "@/lib/site-mode";

/**
 * Soft-lock secondary marketing routes during pre-launch.
 * Pages remain in the codebase; chrome + deep links funnel to `/`.
 */
export function middleware(request: NextRequest) {
  if (!isPrelaunch) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (!isPrelaunchLockedPath(pathname)) return NextResponse.next();

  const hash = prelaunchRedirectHash(pathname);
  // Redirect to home with a query the client can use to scroll to the section.
  // (Location hashes are unreliable across redirect clients.)
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.searchParams.set("to", hash.replace(/^#/, ""));
  url.hash = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/guides",
    "/guides/:path*",
    "/product-lab",
    "/product-lab/:path*",
    "/buy",
    "/buy/:path*",
    "/start-here",
    "/start-here/:path*",
    "/seven-night-setup",
    "/newsletter",
    "/search",
    "/busy-minds",
    "/restless",
    "/shift",
    "/family",
  ],
};
