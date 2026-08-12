import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides/content";

export const metadata: Metadata = {
  title: "Sleep Guides — Sleep Layers",
  description:
    "Practical, source-checked sleep guides. Every guide cites the underlying research.",
};

export default function GuidesIndexPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
        Sleep Guides
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-navy md:text-5xl">
        Practical, source-checked sleep guides.
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
        Every guide follows the same structure: human headline, two-sentence
        answer, why this may happen, what to try tonight, real-life variations,
        what this cannot promise, when professional support may be appropriate,
        sources with PMIDs, last reviewed date.
      </p>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group block rounded-2xl border border-hairline bg-paper p-6 transition-all hover:border-amber hover:shadow-[0_4px_24px_-12px_rgba(244,160,44,0.25)]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber">
              {g.topic.split(" · ")[0]}
            </p>
            <h2 className="mt-2 font-serif text-xl font-medium leading-snug text-navy">
              {g.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-ink-2">
              {g.twoSentenceAnswer}
            </p>
            <p className="mt-4 text-[12px] font-medium text-amber opacity-0 transition-opacity group-hover:opacity-100">
              Read the guide →
            </p>
          </Link>
        ))}
      </section>

      <p className="mt-12 text-center text-[13px] text-ink-2">
        Want a weekly note when new guides publish?{" "}
        <Link
          href="/#newsletter"
          className="font-medium text-navy underline decoration-amber underline-offset-2 hover:text-amber"
        >
          Subscribe to the weekly note
        </Link>
        .
      </p>
    </article>
  );
}
