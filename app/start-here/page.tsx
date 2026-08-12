import Link from "next/link";
import type { Metadata } from "next";
import { SceneFrame } from "@/components/public/scene-frame";

export const metadata: Metadata = {
  title: "Start Here — MySleepLabs",
  description:
    "A four-question router that picks the MySleepLabs path closest to your situation.",
};

const PATHS = [
  {
    title: "Busy Minds",
    href: "/start-here/busy-minds",
    body: "Work follows you home. Build a clear stopping point so your evening actually ends.",
  },
  {
    title: "Restless or Unrefreshed",
    href: "/start-here/restless",
    body: "Start by noticing patterns before buying another solution.",
  },
  {
    title: "Shift & Caregiving",
    href: "/start-here/shift",
    body: "A routine can stay consistent even when the clock keeps changing.",
  },
  {
    title: "Family Evenings",
    href: "/start-here/family",
    body: "Better evenings are built around the household, not one perfect routine.",
  },
];

const QUESTIONS = [
  "What most affects your evenings?",
  "Is your schedule mostly regular or changing?",
  "Are you planning for yourself or a household?",
  "What would you like help with first?",
];

export default function StartHerePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sleep">
        Start Here
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
        Four short questions. No diagnosis.
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        A lifestyle router for real evenings — not a clinical assessment. Answer
        for yourself. We will point you to the path closest to your situation.
      </p>

      <SceneFrame
        className="mt-10"
        scene="Sit on the edge of the bed. Choose one evening path — not a label."
        environment="Ordinary home · calm decision · no clinical framing"
        tone="day"
        caption={null}
      />

      <section className="mt-12 space-y-3">
        {QUESTIONS.map((q, i) => (
          <div
            key={i}
            className="border-b border-border py-5 first:border-t"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sleep">
              Question {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-serif text-lg text-foreground">{q}</p>
            <p className="mt-2 text-[12px] text-muted-foreground">
              Short-form answers coming soon — for now, jump to the path that
              fits:
            </p>
          </div>
        ))}
      </section>

      <section id="paths" className="mt-16">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Or pick a path directly.
        </h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {PATHS.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="path-row group flex gap-4 py-5 pl-3 sm:pl-4">
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg font-medium text-foreground transition-colors group-hover:text-sleep">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </span>
                </span>
                <span className="path-arrow shrink-0 pt-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="mt-16 rounded-xl border border-border bg-paper-2 p-6">
        <h3 className="font-serif text-base font-medium text-foreground">
          This router will never tell you:
        </h3>
        <ul className="mt-3 space-y-1 text-[13px] text-muted-foreground">
          <li>· That you have a sleep disorder</li>
          <li>· Your sleep age or clinical risk rating</li>
          <li>· A treatment recommendation</li>
          <li>· That any product will fix what you are experiencing</li>
        </ul>
        <p className="mt-4 text-[12px] text-muted-foreground">
          See our{" "}
          <Link href="/medical-disclaimer" className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep">
            Medical Disclaimer
          </Link>{" "}
          and{" "}
          <Link href="/editorial-method" className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep">
            Editorial Method
          </Link>
          .
        </p>
      </aside>
    </article>
  );
}
