"use client";

import { useState } from "react";

type Props = {
  productSlug: string;
  destinationUrl: string;
  retailer?: string;
  className?: string;
  children: React.ReactNode;
};

// ExternalLink that fires a tracking beacon before navigating. The
// navigation always happens even if the beacon fails (so the user never
// loses the click). The beacon is fire-and-forget.
export function TrackedAffiliateLink({
  productSlug,
  destinationUrl,
  retailer,
  className,
  children,
}: Props) {
  const [busy, setBusy] = useState(false);

  function onClick() {
    if (busy) return;
    setBusy(true);
    try {
      // sendBeacon keeps the request alive past the navigation
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ productSlug, destinationUrl, retailer })],
          { type: "application/json" },
        );
        navigator.sendBeacon("/api/public?action=affiliate-click", blob);
      } else {
        // fallback
        fetch("/api/public?action=affiliate-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug, destinationUrl, retailer }),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // never block navigation
    }
  }

  return (
    <a
      href={destinationUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
