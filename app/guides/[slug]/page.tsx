import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GUIDES,
  findGuideBySlug,
  loadGuideCitations,
  relatedGuides,
} from "@/lib/guides/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);
  if (!guide) return { title: "Guide not found — Sleep Layers" };
  return {
    title: `${guide.title} — Sleep Layers`,
    description: guide.twoSentenceAnswer,
  };
}

const AUDIENCE_LABEL: Record<string, string> = {
  FOCUS: "Busy Minds",
  CLARITY: "Restless or Unrefreshed",
  SHIFT: "Shift & Caregiving",
  FAMILY: "Family Evenings",
  ALL: "All audiences",
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);
  if (!guide) notFound();

  let citations: Awaited<ReturnType<typeof loadGuideCitations>> = [];
  try {
    citations = await loadGuideCitations(guide);
  } catch {
    // graceful degrade — guides render with a "sources unavailable" note
  }
  const related = relatedGuides(guide);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        Sleep Guide · {AUDIENCE_LABEL[guide.audience]}
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-2 text-[12px] text-muted-foreground">{guide.topic}</p>

      {/* Two-sentence answer */}
      <section className="mt-10 rounded-2xl border border-primary bg-card p-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          The short answer
        </h2>
        <p className="mt-3 font-serif text-lg leading-relaxed text-foreground">
          {guide.twoSentenceAnswer}
        </p>
      </section>

      {/* Why this may happen */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Why this may happen
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          {guide.whyThisMayHappen}
        </p>
      </section>

      {/* What to try tonight */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          What to try tonight
        </h2>
        <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {guide.whatToTryTonight.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-serif text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Real-life variations */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Real-life variations
        </h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {guide.realLifeVariations.map((v, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-serif text-primary">·</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What this cannot promise */}
      <section className="mt-12 rounded-2xl border border-border bg-card p-7">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          What this cannot promise
        </h2>
        <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-muted-foreground">
          {guide.whatThisCannotPromise.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span>·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ — Accordion for fast scannability without losing depth */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-5 w-full">
          {GUIDE_FAQ(guide).map((faq, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-[15px] text-foreground hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* When professional support is appropriate */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          When professional support may be appropriate
        </h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {guide.whenProfessionalSupport.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-serif text-primary">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] text-muted-foreground">
          See our{" "}
          <Link
            href="/medical-disclaimer"
            className="underline decoration-primary underline-offset-2 hover:text-primary"
          >
            Medical Disclaimer
          </Link>
          .
        </p>
      </section>

      {/* Sources */}
      {citations.length === 0 && (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Sources
          </h2>
          <p className="mt-3 text-[13px] text-muted-foreground">
            The underlying PMIDs for this guide are stored in our research
            corpus. If the database is unavailable, the citations are listed
            below without active links.
          </p>
          <ul className="mt-4 space-y-1 text-[12px] text-muted-foreground">
            {guide.paperIds.map((pmid) => (
              <li key={pmid}>PMID: {pmid}</li>
            ))}
          </ul>
        </section>
      )}
      {citations.length > 0 && (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Sources
          </h2>
          <ol className="mt-5 space-y-5">
            {citations.map((c) => (
              <li key={c.pmid} className="text-[13px] leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">{c.title}</p>
                <p className="mt-1 text-[12px]">{c.finding}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  PMID: {c.pmid} ·{" "}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary underline-offset-2 hover:text-primary"
                  >
                    View on PubMed
                  </a>
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Related guides + 7-night CTA */}
      {related.length > 0 && (
        <section className="mt-14 rounded-2xl border border-border bg-card p-7">
          <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">
            Related guides
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/guides/${r.slug}`}
                  className="text-[14px] text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="mt-6 rounded-full">
            <Link href="/seven-night-setup">Start the 7-Night Setup →</Link>
          </Button>
        </section>
      )}

      <p className="mt-12 text-center text-[11px] text-muted-foreground/70">
        Last reviewed:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </article>
  );
}

// Per-guide FAQ block — generated from the existing guide structure so
// every guide ships with answers to the questions readers ask in DMs.
function GUIDE_FAQ(g: ReturnType<typeof findGuideBySlug> extends infer T ? NonNullable<T> : never): Array<{ q: string; a: string }> {
  return [
    {
      q: "How long until I see a change?",
      a: `${g.whatToTryTonight[0] ?? "Pick one small change tonight."} Most readers notice a difference within one to two weeks of consistent nights. If you do not, the guide is still useful as a baseline — you have a clear record of what you tried and when.`,
    },
    {
      q: "What if this does not apply to my situation?",
      a: `${g.realLifeVariations[0] ?? "Real life is rarely a single routine."} Use the Real-life variations section as the "if-then" map for your household. If a step does not fit, skip it — the goal is consistency, not completeness.`,
    },
    {
      q: "Should I do this together with a Seven-Night Setup?",
      a: "Yes, in most cases. The Seven-Night Setup is a sequencing tool for one week; this guide is the deep-dive on a single lever. Doing both in parallel is how we measure what the sequencing actually achieved.",
    },
    {
      q: "Is this a substitute for a clinician?",
      a: "No. This guide is educational and does not diagnose a sleep disorder, prescribe a treatment, or replace advice from a qualified clinician. The 'When professional support may be appropriate' section above names the situations where a clinician is the right next step.",
    },
  ];
}
