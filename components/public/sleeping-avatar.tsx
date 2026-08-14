"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(useGSAP);

/**
 * Pinterest pin card: Kiola evening still.
 * 4:5 on phone (save ratio), 16:10 on desktop. Reveal + breathe only.
 */
export function KiolaHero({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const img = imgRef.current;
      if (!animate) return;

      if (prefersReducedMotion()) {
        if (frame) {
          gsap.set(frame, {
            clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
            opacity: 1,
          });
        }
        return;
      }

      if (frame) {
        gsap.fromTo(
          frame,
          {
            clipPath: "inset(8% 6% 8% 6% round 1.25rem)",
            opacity: 0.75,
            scale: 1.025,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          }
        );
      }

      if (img) {
        gsap.to(img, {
          y: 2.5,
          scale: 1.01,
          duration: 4.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "50% 55%",
          delay: 0.9,
        });
      }
    },
    { scope: rootRef, dependencies: [animate] }
  );

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto w-full max-w-[240px] sm:max-w-[420px] md:max-w-[480px] ${className}`}
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/5] max-h-[42dvh] w-full overflow-hidden rounded-[1.25rem] border border-white/10 shadow-[0_24px_48px_-24px_rgba(0,8,31,0.8)] will-change-transform sm:aspect-[16/10] sm:max-h-none"
        style={{
          clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
        }}
      >
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/brand/hero/kiola-evening.png"
            alt="Kiola in a quiet bedroom at dusk"
            fill
            priority
            sizes="(max-width: 640px) 240px, 480px"
            className="object-cover object-[center_40%] sm:object-center"
          />
        </div>

        {/* Light grade — texture of the illustration stays visible */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,27,58,0.06) 0%, transparent 32%, transparent 72%, rgba(0,8,31,0.22) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/** @deprecated Use KiolaHero. Kept so older imports keep compiling. */
export const SleepingAvatar = KiolaHero;
