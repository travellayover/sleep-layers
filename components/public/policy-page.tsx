import Link from "next/link";

type PolicyProps = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string | string[] }[];
};

export function PolicyPage({ title, description, intro, sections }: PolicyProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Policy
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-[14px] text-muted-foreground">{description}</p>

      <div className="mt-10 max-w-none space-y-8">
        <p className="font-serif text-lg leading-relaxed text-foreground">{intro}</p>

        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-serif text-xl font-medium text-foreground md:text-2xl">
              {s.heading}
            </h2>
            {Array.isArray(s.body) ? (
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted-foreground">
                {s.body.map((b, i) => (
                  <li key={i}>· {b}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            )}
          </section>
        ))}
      </div>

      <p className="mt-16 text-center text-[12px] text-muted-foreground">
        Last reviewed:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        ·{" "}
        <Link href="/" className="hover:text-sleep">
          Back to home
        </Link>
      </p>
    </article>
  );
}
