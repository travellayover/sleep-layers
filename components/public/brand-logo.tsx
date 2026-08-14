"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SLEEP = "#5B67E8";
const GOLD = "#F2B84B";
const WHITE = "#F4F2EC";
const NAVY = "#0B1B3A";

type Size = "sm" | "md" | "lg" | "xl";

const MARK_PX: Record<Size, number> = {
  sm: 32,
  md: 40,
  lg: 80,
  xl: 112,
};

/**
 * Circular mark from brand assets (exact logo).
 */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const px = MARK_PX[size];
  return (
    <Image
      src="/brand/sleep_layers_avatar.png"
      alt=""
      width={px}
      height={px}
      className={`rounded-full ${className}`}
      priority={size === "md" || size === "lg"}
    />
  );
}

/**
 * Animated SVG wave mark — thick rounded strokes matching the logo.
 * onDark: white / sleep / white (like the circular mark)
 * onLight: navy / sleep / navy (like the lockup)
 */
export function BrandWaveMark({
  size = "md",
  variant = "onDark",
  animate = true,
  withCircle = false,
  className = "",
}: {
  size?: Size;
  variant?: "onDark" | "onLight";
  animate?: boolean;
  withCircle?: boolean;
  className?: string;
}) {
  const px = MARK_PX[size];
  const stroke = size === "sm" ? 5.5 : size === "md" ? 6.5 : size === "lg" ? 7.5 : 8.5;
  const wave1 = useRef<SVGPathElement>(null);
  const wave2 = useRef<SVGPathElement>(null);
  const wave3 = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);

  const top = variant === "onDark" ? WHITE : NAVY;
  const mid = SLEEP;
  const bot = variant === "onDark" ? WHITE : NAVY;

  // Resting paths (logo-like S-curves)
  const d1 = "M14 20 C22 14, 30 14, 38 20 S50 26, 50 20";
  const d1b = "M14 20 C22 16, 30 12, 38 18 S50 24, 50 20";
  const d2 = "M12 32 C20 26, 28 26, 36 32 S52 40, 52 32";
  const d2b = "M12 32 C20 28, 28 24, 36 30 S52 38, 52 32";
  const d3 = "M14 44 C22 38, 30 38, 38 44 S50 50, 48 44";
  const d3b = "M14 44 C22 40, 30 36, 38 42 S50 48, 48 44";

  useGSAP(() => {
    if (!animate) return;

    if (wave1.current) {
      gsap.to(wave1.current, {
        attr: { d: d1b },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (wave2.current) {
      gsap.to(wave2.current, {
        attr: { d: d2b },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.25,
      });
    }
    if (wave3.current) {
      gsap.to(wave3.current, {
        attr: { d: d3b },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }
    if (dot.current) {
      gsap.to(dot.current, {
        attr: { r: 3.4 },
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [animate]);

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {withCircle && <circle cx="32" cy="32" r="32" fill={NAVY} />}
      <path
        ref={wave1}
        d={d1}
        stroke={top}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      <path
        ref={wave2}
        d={d2}
        stroke={mid}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      <path
        ref={wave3}
        d={d3}
        stroke={bot}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      {/* Gold insight dot — nestled on bottom wave end */}
      <circle ref={dot} cx="48" cy="44" r="2.8" fill={GOLD} />
    </svg>
  );
}

/**
 * MySleepLabs wordmark — fg + sleep periwinkle + fg (or light on night).
 */
export function BrandWordmark({
  size = "md",
  variant = "onLight",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "onLight" | "onDark";
  className?: string;
}) {
  const text = {
    sm: "text-[15px]",
    md: "text-lg",
    lg: "text-2xl md:text-3xl",
  }[size];
  const side = variant === "onDark" ? "text-[var(--color-night-fg)]" : "text-foreground";

  return (
    <span
      className={`inline-flex items-baseline font-sans font-semibold tracking-tight ${text} ${className}`}
      style={{ letterSpacing: "-0.02em" }}
      aria-label="MySleepLabs"
    >
      <span className={side}>My</span>
      <span className="text-sleep">Sleep</span>
      <span className={side}>Labs</span>
    </span>
  );
}

/**
 * Nav / hero lockup: circular navy mark + wordmark.
 * onDark: for night / full-bleed heroes (light wordmark).
 * layout stack: mark above wordmark (logo lockup asset / Pinterest coming-soon).
 */
export function BrandLockup({
  size = "md",
  animate = false,
  variant = "onLight",
  layout = "inline",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  variant?: "onLight" | "onDark";
  layout?: "inline" | "stack";
  className?: string;
}) {
  const markSize: Size =
    layout === "stack"
      ? size === "lg"
        ? "xl"
        : size === "sm"
          ? "md"
          : "lg"
      : size === "lg"
        ? "lg"
        : size === "sm"
          ? "sm"
          : "md";
  const stacked = layout === "stack";
  const gap = stacked
    ? size === "lg"
      ? "gap-4"
      : "gap-3"
    : size === "lg"
      ? "gap-3.5"
      : "gap-2.5";

  return (
    <span
      className={`inline-flex ${stacked ? "flex-col items-center" : "items-center"} ${gap} ${className}`}
    >
      {animate ? (
        <BrandWaveMark
          size={markSize}
          variant={variant === "onDark" ? "onDark" : "onLight"}
          withCircle={variant === "onDark" || stacked}
          animate
        />
      ) : (
        <BrandMark size={markSize} />
      )}
      <BrandWordmark size={size} variant={variant} />
    </span>
  );
}
