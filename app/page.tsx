import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sleep Layers — Practical sleep guidance for the life you actually live",
  description:
    "Source-checked sleep education and straightforward product guidance for busy minds, changing schedules, and shared homes.",
};

const PATHS = [
  {
    title: "Busy Minds",
    sub: "FOCUS",
    body: "Work follows you home. Build a clear stopping point so your evening actually ends.",
    href: "/start-here/busy-minds",
  },
  {
    title: "Restless or Unrefreshed",
    sub: "CLARITY",
    body: "Start by noticing patterns before buying another solution. A simple sleep diary goes further than another gadget.",
    href: "/start-here/restless",
  },
  {
    title: "Shift & Caregiving",
    sub: "SHIFT",
    body: "A routine can stay consistent even when the clock keeps changing.",
    href: "/start-here/shift",
  },
  {
    title: "Family Evenings",
    sub: "FAMILY",
    body: "Better evenings are built around the household, not one perfect routine.",
    href: "/start-here/family",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Trust strip */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-3 text-center text-[11px] uppercase tracking-wider text-muted-foreground lg:px-8">
          Independent sleep education · Straightforward product guidance
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center lg:py-28">
        <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
          Calm, practical sleep education
        </Badge>
        <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Build a sleep setup that fits your real life.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Source-checked sleep education and straightforward product guidance for
          busy minds, changing schedules, and shared homes.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/buy">Buy the 7-Day Sleep Reset ($9)</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-background px-6 hover:bg-secondary">
            <Link href="/start-here#paths">Find Your Sleep Path</Link>
          </Button>
        </div>

        <p className="mt-6 text-[12px] text-muted-foreground">
          Free 7-Night Setup programme inside. AI-assisted educational
          content. Not medical advice or diagnosis.
        </p>

        {/* Hero illustration placeholder (Loftie-inspired: warm bedroom at 10:30pm, bedside lamp + warm light pool) */}
        <div
          className="mx-auto mt-14 flex aspect-[16/9] max-w-3xl items-center justify-center rounded-2xl border border-dashed border-border bg-card text-[12px] text-muted-foreground"
          role="img"
          aria-label="Loftie-style 3D illustration of an adult reading in a warm bedroom at night — illustration coming soon"
        >
          Loftie-style scene: warm bedroom at 10:30&nbsp;p.m.
          <span className="ml-2 text-muted-foreground/70">(illustration coming soon)</span>
        </div>
      </section>

      {/* Path selector */}
      <section id="paths" className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Your schedule changes what will work.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Pick the path closest to your situation. Each one routes to a
              starter guide, a practical action, and a Seven-Night Setup entry.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PATHS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-[0_4px_24px_-12px_rgba(244,160,44,0.25)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {p.title}
                  </h3>
                  <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                    {p.sub}
                  </Badge>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <p className="mt-5 text-[12px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore this path →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seven-Night Setup */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
            The 7-Night Setup
          </Badge>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            One small setup decision each evening.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            A week of small, practical changes to one corner of your bedroom. No
            overhaul, no new mattress, no miracle routine.
          </p>

          <div className="mt-10 grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-md border border-border bg-card p-2 text-center"
              >
                <div className="font-serif text-base font-medium text-foreground">
                  {i + 1}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">
                  {["Light", "Sound", "Temp", "Screen", "Cue", "Wind", "Reset"][i]}
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-10 rounded-full px-6">
            <Link href="/seven-night-setup">Start the free 7-Night Setup</Link>
          </Button>
        </div>
      </section>

      {/* Editorial method */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            How we research, review, and correct our work.
          </h2>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Source-checked",
                body: "Every guide cites the underlying research. We do not invent citations, and we publish corrections when a claim is wrong.",
              },
              {
                step: "02",
                title: "Editorially compared",
                body: "Products are reviewed against the problem they are designed to solve. Limitations are listed before benefits.",
              },
              {
                step: "03",
                title: "Clearly labeled",
                body: "Affiliate relationships, AI assistance, and editorial dates are disclosed on every page.",
              },
            ].map((s) => (
              <li key={s.step}>
                <div className="font-serif text-sm text-accent">{s.step}</div>
                <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link
              href="/editorial-method"
              className="text-[13px] font-medium text-foreground underline decoration-primary decoration-1 underline-offset-4 hover:text-primary"
            >
              Read the full Editorial Method →
            </Link>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl bg-border" />

      {/* Newsletter */}
      <section id="newsletter" className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            One practical sleep note each week.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            No 47-tips lists. No mattress sales. One note a week, written like a
            friend who happens to actually read the research.
          </p>
          <form className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <NewsletterForm source="home" />
          </form>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Unsubscribe anytime. We never sell or share your email.
          </p>
        </div>
      </section>
    </>
  );
}
