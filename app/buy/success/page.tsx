"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type OrderStatus = "pending" | "paid" | "canceled";

type Order = {
  id: string;
  productSlug: "seven-day-sleep-reset";
  productName: string;
  amountCents: number;
  currency: "USD";
  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
  customerEmail: string | null;
};

function dollars(cents: number, currency: "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function SuccessInner() {
  const params = useSearchParams();
  const session = params.get("session") ?? "";
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setError("No session id in URL — open the buy page and try again.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(
          `/api/public?action=order-status&id=${encodeURIComponent(session)}`,
          { cache: "no-store" },
        );
        const data = (await r.json()) as
          | { ok: true; order: Order }
          | { error: string };
        if (cancelled) return;
        if (!r.ok || !("ok" in data) || !data.ok) {
          const message =
            "error" in data && data.error
              ? data.error
              : "Could not load order.";
          setError(message);
          setLoading(false);
          return;
        }
        setOrder(data.order);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Network error. Please try again.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (loading) {
    return (
      <article className="mx-auto max-w-2xl px-4 py-20 lg:py-28">
        <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
          Order received
        </Badge>
        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          One moment — checking your order.
        </h1>
      </article>
    );
  }

  if (error || !order) {
    return (
      <article className="mx-auto max-w-2xl px-4 py-20 lg:py-28">
        <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
          Couldn&apos;t confirm
        </Badge>
        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          We could not load your order.
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          {error ?? "Unknown error."}
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/buy">Try again</Link>
        </Button>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 lg:py-24">
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        Order confirmed
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        Your {order.productName} is ready.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        Order {order.id.slice(0, 8)} · {dollars(order.amountCents, order.currency)} ·{" "}
        {order.status === "paid"
          ? `paid ${order.paidAt ? new Date(order.paidAt).toLocaleString() : ""}`
          : `status: ${order.status}`}
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          Download
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          Tier 3 of <code>STATUS.md</code> wires this to a real signed-URL
          download. In this preview, the &quot;download&quot; button below opens
          an MD5-style placeholder URL — the order itself is real, the file
          delivery is fake.
        </p>
        <Button asChild size="lg" className="mt-4 rounded-full px-6">
          <a
            href={`data:application/octet-stream;base64,${order.id.slice(0, 8)}-placeholder`}
            download={`${order.productSlug}.pdf.placeholder.txt`}
            aria-label={`Download ${order.productName} placeholder`}
          >
            Download PDF (placeholder)
          </a>
        </Button>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          What&apos;s next
        </h2>
        <ol className="mt-4 space-y-3 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Today:</span> start
            Night 1 — pick one fixed wake time.
          </li>
          <li>
            <span className="font-medium text-foreground">This week:</span>{" "}
            run the 12-question audit on Day 2.
          </li>
          <li>
            <span className="font-medium text-foreground">Next:</span> continue
            with the{" "}
            <Link
              href="/seven-night-setup"
              className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
            >
              full 7-night programme
            </Link>
            .
          </li>
        </ol>
      </section>

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        Questions?{" "}
        <Link
          href="/about"
          className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
        >
          Get in touch
        </Link>
        .
      </p>
    </article>
  );
}

function LoadingFallback() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-20 lg:py-28">
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        Order received
      </Badge>
      <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
        One moment — checking your order.
      </h1>
    </article>
  );
}

export default function BuySuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessInner />
    </Suspense>
  );
}
