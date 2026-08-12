import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout cancelled — MySleepLabs",
  description:
    "No payment was taken. Start the 7-Day Sleep Reset whenever you are ready.",
};

export default function BuyCancelPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-20 lg:px-8 lg:py-28">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Checkout cancelled
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        No payment was taken.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        The 7-Day Sleep Reset is $9 during launch. When you are ready, the buy
        page is one click away.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/buy">Back to the buy page</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-border bg-background px-6 hover:border-sleep hover:text-sleep"
        >
          <Link href="/seven-night-setup">See the 7-Night Setup</Link>
        </Button>
      </div>

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        Questions?{" "}
        <Link
          href="/about"
          className="text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
        >
          Get in touch
        </Link>
        .
      </p>
    </article>
  );
}
