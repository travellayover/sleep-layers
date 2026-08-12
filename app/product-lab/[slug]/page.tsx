import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  findProductBySlug,
  relatedProducts,
} from "@/lib/products/content";
import { TrackedAffiliateLink } from "@/components/public/tracked-affiliate-link";
import { ProductStoryScroll } from "@/components/public/product-story-scroll";
import { SceneFrame } from "@/components/public/scene-frame";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return { title: "Product not found — MySleepLabs" };
  return {
    title: `${product.name} — MySleepLabs Product Lab`,
    description: product.oneLine,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const storyLayers = [
    {
      label: "What it is",
      title: product.name,
      body: product.whatItIs,
    },
    {
      label: "Problem",
      title: "What it is designed to address",
      body: product.problemAddressed,
    },
    {
      label: "Fit",
      title: "Who it may fit",
      body: product.whoItMayFit.slice(0, 2).join(" "),
    },
    {
      label: "Limits",
      title: "What it cannot promise",
      body: product.limitations.slice(0, 2).join(" "),
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Product Lab · {product.category}
      </p>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        {product.name}
      </h1>
      <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
        {product.oneLine}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px]">
        <span className="rounded-full border border-navy/15 bg-navy/5 px-3 py-1 font-semibold uppercase tracking-wider text-navy">
          {product.researchStatus}
        </span>
        <span className="rounded-full border border-border bg-paper-2 px-3 py-1 font-semibold uppercase tracking-wider text-muted-foreground">
          {product.priceRange}
        </span>
        {product.affiliate && (
          <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-semibold uppercase tracking-wider text-foreground">
            Affiliate link
          </span>
        )}
        <span className="text-muted-foreground">Last checked {product.lastChecked}</span>
      </div>

      <SceneFrame
        className="mt-10 max-w-3xl"
        scene={`A ${product.category.toLowerCase()} on a nightstand — one clear role in an ordinary evening.`}
        environment="Believable bedroom · product in context · no storefront collage"
        tone="day"
      />

      <ProductStoryScroll
        productName={product.name}
        category={product.category}
        layers={storyLayers}
      />

      {product.affiliate && (
        <div className="mt-12 max-w-3xl rounded-2xl border border-accent/35 bg-accent-soft/60 p-5">
          <p className="text-[12px] text-muted-foreground">
            We earn a small commission at no cost to you. Affiliate
            relationships do not change how we evaluate a product.
          </p>
          <TrackedAffiliateLink
            productSlug={product.slug}
            destinationUrl={`https://www.google.com/search?q=${encodeURIComponent(product.name + " buy")}`}
            retailer="search"
            className="mt-3 inline-block rounded-full bg-navy px-5 py-2.5 text-[13px] font-medium text-paper transition-colors hover:bg-sleep"
          >
            Search for {product.name} →
          </TrackedAffiliateLink>
        </div>
      )}

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Important specifications
        </h2>
        <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 px-5 py-3">
              <dt className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dt>
              <dd className="text-right text-[13px] text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Comfort and usability considerations
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          {product.comfortUsability.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-serif text-sleep">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 max-w-3xl rounded-2xl border border-border bg-card p-7">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Limitations
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted-foreground">
          {product.limitations.map((l, i) => (
            <li key={i} className="flex gap-3">
              <span>·</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <p className="text-[12px] text-muted-foreground">
          Research status: <strong className="text-foreground">{product.researchStatus}</strong>.
          See our{" "}
          <Link
            href="/affiliate-disclosure"
            className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
          >
            Affiliate Disclosure
          </Link>{" "}
          for what each label means.
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-14 max-w-3xl rounded-2xl border border-border bg-card p-7">
          <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">
            Compare against
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/product-lab/compare/${product.slug}-vs-${r.slug}`}
                  className="text-[14px] text-foreground underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
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
