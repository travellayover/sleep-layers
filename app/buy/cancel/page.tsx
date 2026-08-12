import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Checkout cancelled — Sleep Layers",
  description:
    "No payment was taken. Start the 7-Day Sleep Reset whenever you are ready.",
};

export default function BuyCancelPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-20 lg:py-28">
      <Badge variant="secondary" className="bg-accent/10 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
        Checkout cancelled
      </Badge>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        No payment was taken.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        The 7-Day Sleep Reset is $9 during launch. When you are ready, the
        buy page is one click away.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href="/buy">Back to the buy page</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-border px-6"
        >
          <Link href="/seven-night-setup">See the 7-Night Setup</Link>
        </Button>
      </div>

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
