import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here — Sleep Layers",
  description:
    "A four-question router that picks the Sleep Layers path closest to your situation.",
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
        Start Here
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-navy md:text-5xl">
        Four short questions. No diagnosis.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
        This is a lifestyle router, not a clinical assessment. Answer for
        yourself (not for a clinician). At the end, we will point you to the
        Sleep Layers path closest to your situation.
      </p>

      <section className="mt-12 space-y-4">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="rounded-xl border border-hairline bg-paper p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber">
              Question {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-serif text-lg text-navy">{q}</p>
            <p className="mt-2 text-[12px] text-ink-2">
              Short-form answer coming soon. For now, jump straight to the path
              that fits your answer:
            </p>
          </div>
        ))}
      </section>

      <section id="paths" className="mt-16">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy md:text-3xl">
          Or pick a path directly.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="block rounded-xl border border-hairline bg-paper p-5 transition-all hover:border-amber"
            >
              <h3 className="font-serif text-lg font-medium text-navy">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                {p.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <aside className="mt-16 rounded-xl border border-hairline bg-paper-2 p-6">
        <h3 className="font-serif text-base font-medium text-navy">
          This router will never tell you:
        </h3>
        <ul className="mt-3 space-y-1 text-[13px] text-ink-2">
          <li>· That you have a sleep disorder</li>
          <li>· Your sleep age or clinical risk rating</li>
          <li>· A treatment recommendation</li>
          <li>· That any product will fix what you are experiencing</li>
        </ul>
        <p className="mt-4 text-[12px] text-ink-2">
          See our{" "}
          <Link href="/medical-disclaimer" className="underline decoration-amber underline-offset-2 hover:text-navy">
            Medical Disclaimer
          </Link>{" "}
          and{" "}
          <Link href="/editorial-method" className="underline decoration-amber underline-offset-2 hover:text-navy">
            Editorial Method
          </Link>
          .
        </p>
      </aside>
    </article>
  );
}
