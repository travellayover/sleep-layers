/**
 * GSAP Animation Utilities for MySleepLabs
 *
 * Motion thesis (home): one authored hero entrance; quieter scroll reveals;
 * soft scene parallax; micro-feedback on CTAs/rows. Respect reduced-motion.
 *
 * Content stays visible by default (no permanent opacity:0) so failed scripts
 * or unscrolled screenshots never blank the page.
 */

"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ============================================================================
// Easing presets (smooth, no bounce)
// ============================================================================

export const ease = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  quint: "cubic-bezier(0.22, 1, 0.36, 1)",
  smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInView(el: Element, ratio = 0.88): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * ratio && rect.bottom > 0;
}

/** Reveal only when entering view — never leave content stuck at opacity 0. */
function revealWhenVisible(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: {
    distance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    distance = 20,
    duration = 0.7,
    delay = 0,
    stagger,
    start = "top 88%",
  } = options;

  const play = () => {
    gsap.fromTo(
      targets,
      { opacity: 0.4, y: distance },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: ease.out,
        overwrite: "auto",
      }
    );
  };

  if (isInView(trigger)) {
    play();
    return;
  }

  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: play,
  });
}

// ============================================================================
// Hook: Authored hero entrance (focal moment — home only)
// ============================================================================

/**
 * Focal sequence: brand settles → type rises → CTAs → scene clip-reveals.
 * Elements stay visible until the timeline starts (then briefly tween from).
 * Pass `enabled: false` while a page intro overlay is still playing.
 */
export function useHeroEntrance<T extends HTMLElement = HTMLDivElement>(
  options: { delay?: number; enabled?: boolean } = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const { delay = 0.06, enabled = true } = options;

  useGSAP(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (prefersReducedMotion()) return;

    const items = el.querySelectorAll<HTMLElement>("[data-hero-enter]");
    const scene = el.querySelector<HTMLElement>("[data-hero-scene]");

    const tl = gsap.timeline({ delay });

    if (items.length) {
      tl.fromTo(
        items,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: ease.out,
        }
      );
    }

    if (scene) {
      tl.fromTo(
        scene,
        {
          opacity: 0.35,
          clipPath: "inset(10% 6% 10% 6% round 1.25rem)",
          scale: 1.03,
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
          scale: 1,
          duration: 1.0,
          ease: ease.out,
        },
        "-=0.4"
      );
    }
  }, { scope: ref, dependencies: [enabled, delay] });

  return ref;
}

// ============================================================================
// Hook: Soft scroll parallax on layered children
// ============================================================================

export function useSoftParallax<T extends HTMLElement = HTMLDivElement>(
  options: { intensity?: number } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { intensity = 28 } = options;
    const layers = el.querySelectorAll<HTMLElement>("[data-parallax]");

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.parallax) || 1;
      gsap.fromTo(
        layer,
        { y: -intensity * depth * 0.35 },
        {
          y: intensity * depth,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, { scope: ref });

  return ref;
}

// ============================================================================
// Hook: Scroll reveal (fade up on scroll) — play once
// ============================================================================

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    delay?: number;
    distance?: number;
    duration?: number;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { delay = 0, distance = 22, duration = 0.7 } = options;

    revealWhenVisible(el, el, { duration, delay, distance });
  }, { scope: ref });

  return ref;
}

// ============================================================================
// Hook: Stagger fade (for lists) — play once
// ============================================================================

export function useStaggerFade<T extends HTMLElement = HTMLDivElement>(
  options: {
    distance?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const {
      distance = 16,
      duration = 0.55,
      stagger = 0.07,
      delay = 0,
    } = options;

    const children = el.querySelectorAll("[data-stagger]");
    if (!children.length) return;

    revealWhenVisible(children, el, {
      duration,
      delay,
      stagger,
      distance,
      start: "top 82%",
    });
  }, { scope: ref });

  return ref;
}

// ============================================================================
// Hook: Parallax (mouse move effect)
// ============================================================================

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: {
    intensity?: number;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { intensity = 20 } = options;
    const target = el;

    function handleMouseMove(e: MouseEvent) {
      const rect = target.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(target, {
        x: x * intensity,
        y: y * intensity,
        duration: 0.5,
        ease: ease.out,
      });
    }

    target.addEventListener("mousemove", handleMouseMove);

    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, [options]);

  return ref;
}

// ============================================================================
// Animation presets
// ============================================================================

export const presets = {
  fadeIn: (target: gsap.TweenTarget, delay: number = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay, ease: ease.out }
    );
  },

  slideUp: (
    target: gsap.TweenTarget,
    distance: number = 40,
    delay: number = 0
  ) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: distance },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: ease.out }
    );
  },

  scaleIn: (target: gsap.TweenTarget, delay: number = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay, ease: ease.quint }
    );
  },

  float: (
    target: gsap.TweenTarget,
    distance: number = 10,
    duration: number = 3
  ) => {
    return gsap.to(target, {
      y: distance,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },
};
