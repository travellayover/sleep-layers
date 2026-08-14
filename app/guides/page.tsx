import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides/content";
import { RelatedPins } from "@/components/public/related-pins";
import { SceneFrame } from "@/components/public/scene-frame";

export const metadata: Metadata = {
  title: "Sleep Guides — MySleepLabs",
  description:
    "Practical, source-checked sleep guides. Every guide cites the underlying research.",
};

export default function GuidesIndexPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Sleep Guides
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        Practical, source-checked sleep guides.
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        Every guide follows the same structure: human headline, two-sentence
        answer, why this may happen, what to try tonight, real-life variations,
        what this cannot promise, when professional support may be appropriate,
        sources with PMIDs, last reviewed date.
      </p>

      <SceneFrame
        className="mt-10"
        scene="Someone opens a notebook on the bed and writes one observation before lights out."
        environment="Calm bedroom · one decision · editorial lifestyle"
        tone="day"
      />

      <section className="mt-12">
        <RelatedPins
          items={GUIDES.map((g) => ({
            href: `/guides/${g.slug}`,
            kicker: g.topic.split(" · ")[0],
            title: g.title,
            body: g.twoSentenceAnswer,
          }))}
        />
      </section>

      <p className="mt-12 text-center text-[13px] text-muted-foreground">
        Want a weekly note when new guides publish?{" "}
        <Link
          href="/#waitlist"
          className="font-medium text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
        >
          Subscribe to the weekly note
        </Link>
        .
      </p>
    </article>
  );
}
