/**
 * Site launch gate for MySleepLabs public surfaces.
 *
 * Pre-launch (default): one-pager at `/` is the public experience.
 * Full chrome (Guides, Product Lab, Buy, audience landings) stays built
 * but is soft-locked until you flip this flag.
 *
 * Unlock full site:
 *   1. Set `isPrelaunch = false` below, OR
 *   2. Set env `NEXT_PUBLIC_SITE_MODE=live`
 */

export type SiteMode = "prelaunch" | "live";

/** Single flip: set to `false` when you are ready to unlock the full site. */
const PRELAUNCH = true;

export function getSiteMode(): SiteMode {
  if (process.env.NEXT_PUBLIC_SITE_MODE === "live") return "live";
  if (process.env.NEXT_PUBLIC_SITE_MODE === "prelaunch") return "prelaunch";
  return PRELAUNCH ? "prelaunch" : "live";
}

export const isPrelaunch = getSiteMode() === "prelaunch";

/** Marketing / product routes soft-locked during pre-launch. */
export const PRELAUNCH_LOCKED_PREFIXES = [
  "/guides",
  "/product-lab",
  "/buy",
  "/start-here",
  "/seven-night-setup",
  "/newsletter",
  "/search",
  "/busy-minds",
  "/restless",
  "/shift",
  "/family",
] as const;

/** Hash targets on `/` when deep links are soft-locked. */
export function prelaunchRedirectHash(_pathname: string): string {
  // Single-viewport pre-landing: everything lands on the email field.
  return "#waitlist";
}

export function isPrelaunchLockedPath(pathname: string): boolean {
  return PRELAUNCH_LOCKED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
