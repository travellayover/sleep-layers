import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter archive — MySleepLabs",
  description: "Every weekly sleep note we have sent, in one place.",
};

type Issue = {
  id: string;
  slug: string;
  subject: string;
  body: string;
  sentAt: Date | number | null;
};

export default async function NewsletterArchivePage() {
  // Standalone preview: no Drizzle client. Show a representative placeholder
  // archive so the layout, copy, and styling render as designed. The
  // production repo queries the DB and renders a real archive.
  const rows: Issue[] = [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        Newsletter archive
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        Every note we have sent.
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        One practical sleep note lands in your inbox each week — no 47-tips
        lists, no mattress sales. The full archive is below for paid
        subscribers and reviewers.
      </p>

      {rows.length === 0 ? (
        <section className="mt-12 rounded-2xl border border-border bg-card p-8">
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            The newsletter archive will populate once the first issue ships.
            To preview a real cycle end-to-end, sign up via the form on the
            {" "}
            <Link href="/" className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary">
              home page
            </Link>
            {" "}or on this page.
          </p>
          <form
            action="/api/public?action=newsletter"
            method="POST"
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Email for the weekly sleep note"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-primary px-6 text-[14px] font-medium text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[12px] text-muted-foreground">
            Unsubscribe anytime. We never sell or share your email.
          </p>
        </section>
      ) : (
        <ul className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {rows.map((row) => (
            <li key={row.id} className="p-5">
              <p className="text-[11px] uppercase tracking-wider text-primary">
                {row.slug}
              </p>
              <h2 className="mt-1 font-serif text-base font-medium text-foreground">
                {row.subject}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {row.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        See our{" "}
        <Link
          href="/privacy-terms"
          className="text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
        >
          Privacy & Terms
        </Link>
        .
      </p>
    </article>
  );
}
