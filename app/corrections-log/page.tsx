import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corrections Log — Sleep Layers",
  description:
    "A running log of corrections to Sleep Layers guides and product reviews.",
};

type Correction = {
  id: string;
  date: Date;
  severity: "minor" | "major" | "critical";
  page: string;
  whatChanged: string;
  why: string;
};

const SEVERITY_LABEL: Record<string, string> = {
  minor: "Minor",
  major: "Major",
  critical: "Critical",
};

const SEVERITY_CLASS: Record<string, string> = {
  minor: "bg-secondary text-secondary-foreground border-border",
  major: "bg-accent/20 text-accent-foreground border-accent/40",
  critical: "bg-destructive/15 text-destructive-foreground border-destructive/40",
};

export default async function CorrectionsLogPage() {
  // Standalone preview: no DB. Real log lives in the production repo.
  const rows: Correction[] = [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        Corrections log
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        Every correction, public.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        When a Sleep Layers guide, product review, or editorial claim is
        updated after publication, we add an entry here. The aim is to be
        fast, specific, and easy to read.
      </p>

      <section className="mt-12 space-y-6">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              The first entry will appear here once we have published and
              corrected a guide. The corrections policy is on the{" "}
              <Link
                href="/corrections"
                className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
              >
                Corrections Policy
              </Link>{" "}
              page.
            </p>
          </div>
        ) : (
          rows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-serif text-sm text-muted-foreground">
                  {row.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${SEVERITY_CLASS[row.severity]}`}
                >
                  {SEVERITY_LABEL[row.severity]}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-lg font-medium text-foreground">
                {row.page}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  What changed:
                </span>{" "}
                {row.whatChanged}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground/80">
                <span className="font-medium text-foreground">Why:</span>{" "}
                {row.why}
              </p>
            </article>
          ))
        )}
      </section>

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        See our{" "}
        <Link
          href="/editorial-method"
          className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
        >
          Editorial Method
        </Link>{" "}
        and{" "}
        <Link
          href="/medical-disclaimer"
          className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
        >
          Medical Disclaimer
        </Link>
        .
      </p>
    </article>
  );
}
