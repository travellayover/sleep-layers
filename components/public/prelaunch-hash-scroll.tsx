"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Soft-lock redirects land on `/?to=waitlist|paths|setup`.
 * Scroll to the matching in-page section once.
 */
export function PrelaunchHashScroll() {
  const params = useSearchParams();

  useEffect(() => {
    const to = params.get("to");
    if (!to) return;
    const id = to.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    // Wait for intro overlay / layout
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Clean query without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("to");
      window.history.replaceState({}, "", `${url.pathname}${url.hash}`);
    }, 400);

    return () => window.clearTimeout(t);
  }, [params]);

  return null;
}
