import Link from "next/link";

export type RelatedPin = {
  href: string;
  kicker: string;
  title: string;
  body: string;
};

/**
 * Post-launch “related pins” — editorial cards, not a SaaS grid.
 * Used on guides / Product Lab when the full site unlocks.
 */
export function RelatedPins({
  items,
  columns = 3,
}: {
  items: RelatedPin[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={`grid gap-5 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border bg-card transition-colors duration-200 hover:border-sleep/35"
          >
            <div
              className="aspect-[4/5] w-full sm:aspect-[4/5]"
              style={{
                background:
                  "linear-gradient(155deg, #FFFcf8 0%, #E8E1D6 48%, #D4CDBF 100%)",
              }}
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-sleep">
                {item.kicker}
              </p>
              <h2 className="mt-1.5 font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
