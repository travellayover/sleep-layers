"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { BrandLockup } from "@/components/public/brand-logo";
import { KiolaHero } from "@/components/public/sleeping-avatar";
import { useIntroDone } from "@/components/public/page-loader";
import { isPrelaunch } from "@/lib/site-mode";
import { prefersReducedMotion, useHeroEntrance } from "@/lib/animations";

/**
 * Pre-launch = a Pinterest pin that became a page:
 * illustrated scene · caption · notify.
 * Intro already showed the mark — hero leads with Kiola.
 */
export default function HomePage() {
  const introDone = useIntroDone();
  const heroRef = useHeroEntrance({ enabled: introDone, delay: 0.08 });
  const lampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introDone || prefersReducedMotion()) return;
    const lamp = lampRef.current;
    if (!lamp) return;
    const tween = gsap.to(lamp, {
      opacity: 0.62,
      scale: 1.04,
      duration: 4.2,
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
      aria-label="MySleepLabs coming soon"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #132456 0%, #0B1B3A 42%, #00081F 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-[8%] h-[42vmin] w-[58vmin] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,103,232,0.16) 0%, transparent 68%)",
            filter: "blur(40px)",
          }}
        />
        <div
          ref={lampRef}
          className="absolute bottom-[20%] left-1/2 h-[32vmin] w-[32vmin] -translate-x-1/2 rounded-full opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(242,184,75,0.32) 0%, rgba(242,184,75,0.05) 45%, transparent 70%)",
            filter: "blur(26px)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:px-8 sm:pb-8 sm:pt-12">
        <div className="w-full" data-hero-enter data-hero-scene>
          <KiolaHero animate={introDone} />
        </div>

        <p
          className="mt-4 text-[11px] font-medium tracking-[0.2em] text-[var(--color-night-fg)]/50 uppercase"
          data-hero-enter
        >
          Coming soon
        </p>

        <h1
          className="mt-2 max-w-[16ch] font-serif text-[1.75rem] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--color-night-fg)] sm:text-[2.45rem]"
          data-hero-enter
        >
          Sleep for the night you actually have.
        </h1>

        <p
          className="mx-auto mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-[var(--color-night-fg)]/65 sm:text-[15px]"
          data-hero-enter
        >
          Practical evening guidance. Leave your email — we open soon.
        </p>

        <div
          className="mt-5 w-full max-w-xs sm:max-w-sm"
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
          className="mt-3 text-[11px] leading-relaxed text-[var(--color-night-fg)]/40"
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
