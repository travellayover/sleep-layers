"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(useGSAP);

/**
 * Editorial sleeper illustration — OSINT photo refs → illustrated hero
 * (`public/brand/hero/sleeper.png`) + calm water-like fabric drift.
 */
export function SleepingAvatar({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const img = imgRef.current;
      const wash = washRef.current;
      const ripples = ripplesRef.current;

      if (!animate || prefersReducedMotion()) return;

      // Soft breathe on the whole scene (sleep)
      if (img) {
        gsap.to(img, {
          y: 3,
          scale: 1.012,
          duration: 3.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "50% 60%",
        });
      }

      // Water-like fabric wash drifting across duvet (horizontal travel)
      if (wash) {
        gsap.fromTo(
          wash,
          { backgroundPosition: "0% 40%" },
          {
            backgroundPosition: "100% 55%",
            duration: 8,
            ease: "none",
            repeat: -1,
            yoyo: true,
          }
        );
        gsap.to(wash, {
          opacity: 0.42,
          duration: 2.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // Specular ripples — brand gold glints traveling like water highlights
      if (ripples) {
        const dots = ripples.querySelectorAll("[data-glint]");
        dots.forEach((dot, i) => {
          gsap.fromTo(
            dot,
            { x: -20, opacity: 0 },
            {
              x: 40,
              opacity: 0.7,
              duration: 3.8 + i * 0.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.9,
            }
          );
        });
      }
    },
    { scope: rootRef, dependencies: [animate] }
  );

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto w-full max-w-[440px] sm:max-w-[520px] ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_28px_60px_-28px_rgba(0,8,31,0.85)]"
        style={{ aspectRatio: "16 / 10" }}
      >
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/brand/hero/sleeper.png"
            alt="Illustrated person sleeping peacefully in bed under warm lamp light"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 520px"
            className="object-cover object-[center_45%]"
          />
        </div>

        {/* Cool navy grade + warm lamp balance toward brand */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,20,60,0.35) 0%, transparent 45%, rgba(248,184,64,0.12) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Water motion — soft periwinkle wash across fabric folds */}
        <div
          ref={washRef}
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 20%, rgba(80,90,230,0.55) 42%, rgba(168,174,245,0.35) 50%, rgba(80,90,230,0.4) 58%, transparent 78%)",
            backgroundSize: "220% 220%",
          }}
          aria-hidden="true"
        />

        {/* Traveling glints */}
        <div
          ref={ripplesRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <span
            data-glint
            className="absolute left-[55%] top-[58%] h-2 w-2 rounded-full bg-[#F8B840]/80 blur-[1px]"
          />
          <span
            data-glint
            className="absolute left-[62%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/50 blur-[0.5px]"
          />
          <span
            data-glint
            className="absolute left-[48%] top-[70%] h-1 w-3 rounded-full bg-[#A8AEF5]/40 blur-[1px]"
          />
        </div>

        {/* Bottom fade into page night */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(0,8,31,0.55), transparent)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
