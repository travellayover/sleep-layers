import Link from "next/link";
import type { Metadata } from "next";
import { SceneFrame } from "@/components/public/scene-frame";

export const metadata: Metadata = {
  title: "The 7-Night Setup — MySleepLabs",
  description:
    "One small setup decision each evening. No mattress, no overhaul, no miracle routine.",
};

const NIGHTS = [
  {
    n: 1,
    theme: "Light",
    title: "Pick the warmest lamp you already own.",
    body: "Move it to your bedside. Replace the bulb if it is cool blue or daylight. Goal: a warm pool of light you can actually wind down in.",
  },
  {
    n: 2,
    theme: "Sound",
    title: "Identify the loudest recurring sound in your bedroom.",
    body: "It might be a street, a fridge, a partner, a fan. Choose one and try the lowest-effort mitigation (earplug, fan swap, door closer).",
  },
  {
    n: 3,
    theme: "Temperature",
    title: "Check the room temperature at the time you actually go to bed.",
    body: "Most adults sleep best around 18°C. If your room is meaningfully warmer or cooler, change one thing — a fan, a window, a heavier duvet.",
  },
  {
    n: 4,
    theme: "Screen",
    title: "Move one screen out of arm's reach at bedtime.",
    body: "Pick the one you reach for last. It can live in another room. Charge it there.",
  },
  {
    n: 5,
    theme: "Cue",
    title: "Pick a wind-down cue that is not a screen.",
    body: "A book, a podcast, ten minutes of stretching, a hot drink — anything that signals 'evening mode.' Same cue for the rest of the week.",
  },
  {
    n: 6,
    theme: "Wind-down",
    title: "Try a fixed wind-down length.",
    body: "30 minutes is a reasonable starting point. Same length every night. Note what you actually do with the time.",
  },
  {
    n: 7,
    theme: "Reset",
    title: "Look back at the diary you kept.",
    body: "Which nights felt different? Which change was easiest to keep? That is your next month's setup, not this week's.",
  },
];

export default function SevenNightSetupPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        The 7-Night Setup
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        One small setup decision each evening.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        Seven evenings. Seven small changes to one corner of your bedroom. No
        mattress, no overhaul, no miracle routine. After night seven, look back
        at your notes — that is what your next month should be built on.
      </p>

      <SceneFrame
        className="mt-10"
        scene="A warm bedside lamp is moved six inches closer — one setup decision for tonight."
        environment="Loftie-nightstand mood · ordinary room · one change"
        tone="night"
      />

      <section className="mt-14 space-y-6">
        {NIGHTS.map((night) => (
          <article
            key={night.n}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-3xl font-medium text-accent">
                {String(night.n).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Night {night.n} · {night.theme}
                </p>
                <h2 className="mt-1 font-serif text-xl font-medium leading-snug text-foreground md:text-2xl">
                  {night.title}
                </h2>
              </div>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              {night.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-paper-2 p-7">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          What this setup will not do.
        </h2>
        <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
          <li>· Diagnose a sleep disorder</li>
          <li>· Replace advice from a qualified clinician</li>
          <li>· Promise a specific amount of sleep</li>
          <li>· Make any single product necessary</li>
        </ul>
        <p className="mt-5 text-[12px] text-muted-foreground">
          See our{" "}
          <Link
            href="/medical-disclaimer"
            className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Medical Disclaimer
          </Link>
          .
        </p>
      </section>

      <section className="mt-14 text-center">
        <Link
          href="/guides"
          className="text-[13px] font-medium text-foreground underline decoration-sleep/40 decoration-1 underline-offset-4 hover:text-sleep"
        >
          Continue to Sleep Guides →
        </Link>
      </section>
    </article>
  );
}
