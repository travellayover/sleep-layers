import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProductBySlug, PRODUCTS } from "@/lib/products/content";

type Props = {
  params: Promise<{ pair: string }>;
};

function parsePair(pair: string): [string, string] | null {
  const parts = pair.split("-vs-");
  if (parts.length !== 2) return null;
  return [parts[0]!, parts[1]!];
}

export async function generateStaticParams() {
  const seen = new Set<string>();
  const out: { pair: string }[] = [];
  for (const p of PRODUCTS) {
    if (!p.comparePair) continue;
    for (const otherSlug of p.comparePair) {
      const a = p.slug;
      const b = otherSlug;
      if (a === b) continue;
      const key = [a, b].sort().join("-vs-");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ pair: key });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return { title: "Comparison — MySleepLabs Product Lab" };
  const [a, b] = parsed;
  const pa = findProductBySlug(a);
  const pb = findProductBySlug(b);
  if (!pa || !pb) return { title: "Comparison — MySleepLabs Product Lab" };
  return {
    title: `${pa.name} vs ${pb.name} — MySleepLabs Product Lab`,
    description: `Side-by-side comparison of ${pa.name} and ${pb.name}.`,
  };
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  const [aSlug, bSlug] = parsed;
  const a = findProductBySlug(aSlug);
  const b = findProductBySlug(bSlug);
  if (!a || !b) notFound();

  const specRows = Array.from(
    new Set([...a.specs.map((s) => s.label), ...b.specs.map((s) => s.label)]),
  ).map((label) => ({
    label,
    a: a.specs.find((s) => s.label === label)?.value ?? "—",
    b: b.specs.find((s) => s.label === label)?.value ?? "—",
  }));

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Product Lab · Side by side
      </p>
      <h1 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
        {a.name} vs {b.name}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        A side-by-side comparison grounded in the specifications and editorial
        notes on each product&apos;s page. Limitations are listed on both sides —
        there is no winner, only a better fit for your situation.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <CompareCard product={a} />
        <CompareCard product={b} />
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Specifications side by side
        </h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-paper-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Spec</th>
                <th className="px-4 py-3 font-semibold">{a.name}</th>
                <th className="px-4 py-3 font-semibold">{b.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {specRows.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 font-medium text-muted-foreground">{row.label}</td>
                  <td className="px-4 py-3 text-foreground">{row.a}</td>
                  <td className="px-4 py-3 text-foreground">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <CompareNotes
          title={`${a.name} — who it may fit`}
          items={a.whoItMayFit}
        />
        <CompareNotes
          title={`${b.name} — who it may fit`}
          items={b.whoItMayFit}
        />
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <CompareNotes title={`${a.name} — limitations`} items={a.limitations} />
        <CompareNotes title={`${b.name} — limitations`} items={b.limitations} />
      </section>

      <p className="mt-14 text-center text-[12px] text-muted-foreground">
        See each product&apos;s full review:{" "}
        <Link
          href={`/product-lab/${a.slug}`}
          className="text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
        >
          {a.name}
        </Link>
        {" · "}
        <Link
          href={`/product-lab/${b.slug}`}
          className="text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
        >
          {b.name}
        </Link>
      </p>
    </article>
  );
}

function CompareCard({
  product,
}: {
  product: NonNullable<ReturnType<typeof findProductBySlug>>;
}) {
  return (
    <Link
      href={`/product-lab/${product.slug}`}
      className="block rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-sleep/40"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-sleep">
        {product.category}
      </p>
      <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
        {product.name}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        {product.oneLine}
      </p>
      <p className="mt-4 text-[12px] font-medium text-muted-foreground/80">
        {product.priceRange} · {product.researchStatus}
      </p>
    </Link>
  );
}

function CompareNotes({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-serif text-lg font-medium text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
        {items.map((i, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="font-serif text-sleep">·</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
