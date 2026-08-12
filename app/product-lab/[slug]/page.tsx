import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  findProductBySlug,
  relatedProducts,
} from "@/lib/products/content";
import { TrackedAffiliateLink } from "@/components/public/tracked-affiliate-link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return { title: "Product not found — Sleep Layers" };
  return {
    title: `${product.name} — Sleep Layers Product Lab`,
    description: product.oneLine,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
        Product Lab · {product.category}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-navy md:text-5xl">
        {product.name}
      </h1>
      <p className="mt-3 font-serif text-lg leading-relaxed text-ink-2">
        {product.oneLine}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px]">
        <span className="rounded-full border border-navy/20 bg-navy/5 px-3 py-1 font-semibold uppercase tracking-wider text-navy">
          {product.researchStatus}
        </span>
        <span className="rounded-full border border-hairline bg-paper-2 px-3 py-1 font-semibold uppercase tracking-wider text-ink-2">
          {product.priceRange}
        </span>
        {product.affiliate && (
          <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-semibold uppercase tracking-wider text-amber">
            Affiliate link
          </span>
        )}
        <span className="text-ink-3">Last checked {product.lastChecked}</span>
      </div>

      {product.affiliate && (
        <div className="mt-8 rounded-2xl border border-amber/40 bg-amber/5 p-5">
          <p className="text-[12px] text-ink-2">
            We earn a small commission at no cost to you. Affiliate
            relationships do not change how we evaluate a product.
          </p>
          <TrackedAffiliateLink
            productSlug={product.slug}
            destinationUrl={`https://www.google.com/search?q=${encodeURIComponent(product.name + " buy")}`}
            retailer="search"
            className="mt-3 inline-block rounded-full bg-navy px-5 py-2.5 text-[13px] font-medium text-paper transition-colors hover:bg-amber hover:text-navy"
          >
            Search for {product.name} →
          </TrackedAffiliateLink>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          What it is
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          {product.whatItIs}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          What problem it is designed to address
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          {product.problemAddressed}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          Who it may fit
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-2">
          {product.whoItMayFit.map((w, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-serif text-amber">·</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          Important specifications
        </h2>
        <dl className="mt-4 divide-y divide-hairline rounded-2xl border border-hairline bg-paper-2">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 px-5 py-3">
              <dt className="text-[12px] font-semibold uppercase tracking-wider text-ink-2">
                {s.label}
              </dt>
              <dd className="text-right text-[13px] text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          Comfort and usability considerations
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-2">
          {product.comfortUsability.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-serif text-amber">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-hairline bg-paper-2 p-7">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-navy">
          Limitations
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink-2">
          {product.limitations.map((l, i) => (
            <li key={i} className="flex gap-3">
              <span>·</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <p className="text-[12px] text-ink-2">
          Research status: <strong className="text-navy">{product.researchStatus}</strong>.
          See our{" "}
          <Link
            href="/affiliate-disclosure"
            className="underline decoration-amber underline-offset-2 hover:text-navy"
          >
            Affiliate Disclosure
          </Link>{" "}
          for what each label means.
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-14 rounded-2xl border border-hairline bg-paper p-7">
          <h2 className="font-serif text-xl font-medium tracking-tight text-navy">
            Compare against
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/product-lab/compare/${product.slug}-vs-${r.slug}`}
                  className="text-[14px] text-navy underline decoration-amber underline-offset-2 hover:text-amber"
                >
                  {product.name} vs {r.name} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
