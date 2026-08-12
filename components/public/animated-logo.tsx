/**
 * Re-exports — homepage and older imports use AnimatedLogo / LogoWithText.
 * Canonical implementation lives in brand-logo.tsx.
 */
"use client";

import { BrandWaveMark, BrandLockup } from "./brand-logo";

export function AnimatedLogo({
  size = "md",
  animate = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}) {
  return (
    <BrandWaveMark
      size={size}
      variant="onDark"
      withCircle
      animate={animate}
    />
  );
}

export function LogoWithText({
  size = "md",
  animate = true,
}: {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}) {
  return <BrandLockup size={size} animate={animate} />;
}
