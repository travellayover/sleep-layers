"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SceneFrame } from "@/components/public/scene-frame";
import { toast } from "sonner";

// Type stub: the source of truth for product data lives in
// lib/checkout/content.ts (server-side). This file mirrors the relevant
// shape so the buy page can be a client component without round-tripping
// for every render.
type ProductSlug = "seven-day-sleep-reset";

type CheckoutResponse = {
  ok: true;
  orderId: string;
  productSlug: ProductSlug;
  productName: string;
  amountCents: number;
  currency: "USD";
  version: "launch" | "standard" | "bundle";
  redirectUrl: string;
};

type ErrorResponse = { error: string };

const FEATURES = [
  "7 sequenced actions, from wake-time anchoring to the 90-minute wind-down",
  "The 12-question bedroom audit (re-usable)",
  "Your personal caffeine cutoff calculator",
  "The 2-week printable sleep tracker",
  "The under-$50 upgrade checklist (affiliate-ready)",
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How long until I see a change?",
    a: "Most readers notice a difference within one to two weeks of consistent nights. If you do not, you still have a clear record of what you tried and when — that is the second half of why this exists.",
  },
  {
    q: "What if it does not apply to my situation?",
    a: "The actions are sequenced but not load-bearing. Skip the ones that do not fit. The point is consistency, not completeness.",
  },
  {
    q: "Is this a substitute for a clinician?",
    a: "No. The Reset is educational and does not diagnose a sleep disorder, prescribe a treatment, or replace advice from a qualified clinician. The 'When professional support may be appropriate' section names the situations where a clinician is the right next step.",
  },
  {
    q: "What format is the file?",
    a: "A PDF, made in Canva at 1080×1920 preview pages plus A4 export. Optimised for a phone reader and a tablet, in that order.",
  },
  {
    q: "Can I get a refund?",
    a: "If you read the whole guide, run nights 1-3, and still do not find it useful, reply to the confirmation email and we will refund you — no questions, no friction.",
  },
];

const DISCLAIMER =
  "This guide is for education only and is not medical advice. Consult a physician for sleep or health concerns.";

export default function BuyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/public?action=checkout-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: "seven-day-sleep-reset",
          email: email.trim() || null,
        }),
      });
      const data = (await r.json()) as CheckoutResponse | ErrorResponse;
      if (!r.ok || !("ok" in data) || !data.ok) {
        const message =
          "error" in data ? data.error : "Could not start checkout.";
        setError(message);
        toast.error(message);
        setSubmitting(false);
        return;
      }
      toast.success("Order created. Redirecting…");
      router.push(data.redirectUrl);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        The 7-Day Sleep Reset
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        One action per night. Ten minutes max. No supplements required.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        A PDF that turns what would otherwise be another list of sleep tips into
        a sequence. One small setup decision each evening, with a tracker and a
        12-question bedroom audit you can keep using.
      </p>

      <SceneFrame
        className="mt-10"
        scene="A printed checklist sits beside a warm lamp — Night 1 circled."
        environment="Paper programme · bedside · one clear next step"
        tone="day"
      />

      <div className="mt-12 rounded-2xl border border-border bg-card p-7 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-xl font-medium text-foreground">
            Today&apos;s price
          </h2>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sleep">
            Launch
          </span>
        </div>
        <p className="mt-4 font-serif text-5xl font-medium tracking-tight text-foreground">
          $9
          <span className="ml-2 text-base font-normal text-muted-foreground">
            (was $19 after launch)
          </span>
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          Instant PDF download. Email delivery optional — works for any reader.
        </p>
        <Separator className="my-5 bg-border" />
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="buy-email" className="sr-only">
            Email for delivery (optional)
          </label>
          <Input
            id="buy-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email for delivery (optional)"
            className="h-12 flex-1 rounded-full border-border bg-background px-5 text-[14px]"
          />
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {submitting ? "Starting checkout…" : "Buy for $9"}
          </Button>
        </form>
        {error ? (
          <p className="mt-3 text-[12px] text-destructive-foreground" role="alert">
            {error}
          </p>
        ) : null}
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          This preview repo does not yet wire a real payment provider — the
          button mints a no-charge order and routes you to a faux checkout
          success page so you can see the full flow. Tier 3 of STATUS.md swaps
          the stub for Stripe.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          What&apos;s inside
        </h2>
        <ul className="mt-5 space-y-3">
          {FEATURES.map((f) => (
            <li
              key={f}
              className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
            >
              <span className="font-serif text-accent" aria-hidden>
                ·
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-5 w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger className="text-[15px] text-foreground hover:text-sleep">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-paper-2 p-7">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
          Disclaimer
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          {DISCLAIMER} See our{" "}
          <Link
            href="/medical-disclaimer"
            className="text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Medical Disclaimer
          </Link>{" "}
          and{" "}
          <Link
            href="/editorial-method"
            className="text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Editorial Method
          </Link>
          .
        </p>
      </section>

      <section className="mt-14 text-center">
        <Link
          href="/seven-night-setup"
          className="text-[13px] font-medium text-foreground underline decoration-sleep/40 decoration-1 underline-offset-4 hover:text-sleep"
        >
          Prefer the free 7-Night Setup first →
        </Link>
      </section>
    </article>
  );
}
