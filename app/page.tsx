"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { BrandLockup } from "@/components/public/brand-logo";
import { SleepingAvatar } from "@/components/public/sleeping-avatar";
import { useIntroDone } from "@/components/public/page-loader";
import { isPrelaunch } from "@/lib/site-mode";
import { prefersReducedMotion, useHeroEntrance } from "@/lib/animations";

/**
 * Pre-launch = Pinterest-style coming-soon:
 * brand · sleeping avatar (water bed motion) · email.
 */
export default function HomePage() {
  const introDone = useIntroDone();
  const heroRef = useHeroEntrance({ enabled: introDone, delay: 0.1 });
  const lampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introDone || prefersReducedMotion()) return;
    const lamp = lampRef.current;
    if (!lamp) return;
    const tween = gsap.to(lamp, {
      opacity: 0.7,
      scale: 1.05,
      duration: 3.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [introDone]);

  if (!isPrelaunch) {
    return <LiveHomeStub />;
  }

  return (
    <section
      ref={heroRef}
      className="relative isolate flex flex-1 flex-col overflow-hidden"
      aria-label="MySleepLabs — coming soon"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #132456 0%, #00143C 42%, #00081F 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-[6%] h-[50vmin] w-[70vmin] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(80,90,230,0.22) 0%, transparent 68%)",
            filter: "blur(40px)",
          }}
        />
        <div
          ref={lampRef}
          className="absolute bottom-[22%] left-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(248,184,64,0.38) 0%, rgba(248,184,64,0.06) 45%, transparent 70%)",
            filter: "blur(26px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[36%]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,8,31,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 pb-8 pt-16 text-center sm:max-w-lg sm:px-8 sm:pb-10 sm:pt-14">
        <div data-hero-enter>
          <BrandLockup size="sm" animate variant="onDark" layout="stack" />
        </div>

        <div className="mt-5 w-full sm:mt-6" data-hero-enter>
          <SleepingAvatar animate={introDone} />
        </div>

        <p
          className="mt-2 text-[11px] font-medium tracking-[0.18em] text-[var(--color-night-fg)]/50 uppercase"
          data-hero-enter
        >
          Coming soon
        </p>

        <h1
          className="mt-2.5 max-w-[14ch] font-serif text-[1.95rem] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--color-night-fg)] sm:max-w-none sm:text-[2.65rem]"
          data-hero-enter
        >
          Sleep for the night you actually have.
        </h1>

        <p
          className="mx-auto mt-3 max-w-[28ch] text-[14px] leading-relaxed text-[var(--color-night-fg)]/65 sm:text-[15px]"
          data-hero-enter
        >
          Practical evening guidance. Leave your email — we’ll open soon.
        </p>

        <div
          className="mt-6 w-full max-w-xs sm:max-w-sm"
          data-hero-enter
          id="waitlist"
        >
          <NewsletterForm
            source="prelaunch-landing"
            ctaLabel="Notify me"
            variant="onDark"
          />
        </div>

        <p
          className="mt-4 text-[11px] leading-relaxed text-[var(--color-night-fg)]/40"
          data-hero-enter
        >
          Educational only ·{" "}
          <Link
            href="/medical-disclaimer"
            className="underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[var(--color-night-fg)]/70"
          >
            not medical advice
          </Link>
        </p>
      </div>
    </section>
  );
}

function LiveHomeStub() {
  return (
    <section className="mx-auto max-w-lg px-4 py-24 text-center">
      <BrandLockup size="lg" />
      <h1 className="mt-8 font-serif text-4xl font-medium tracking-tight text-foreground">
        MySleepLabs is live.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Flip `PRELAUNCH` off and restore the full home experience.
      </p>
    </section>
  );
}
