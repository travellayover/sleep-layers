"use client";

import Link from "next/link";
import { use } from "react";
import type {
  Product,
  Category,
  PriceRange,
  ResearchStatus,
} from "@/lib/products/content";

type Props = {
  products: Product[];
  categories: Category[];
  priceRanges: PriceRange[];
  researchStatuses: ResearchStatus[];
  searchParams: Promise<{
    category?: string;
    useCase?: string;
    price?: string;
    status?: string;
  }>;
};

export function ProductLabIndex({
  products,
  categories,
  priceRanges,
  researchStatuses,
  searchParams,
}: Props) {
  const params = use(searchParams);
  const activeCategory = params.category ?? "";
  const activeUseCase = params.useCase ?? "";
  const activePrice = params.price ?? "";
  const activeStatus = params.status ?? "";

  const filtered = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activePrice && p.priceRange !== activePrice) return false;
    if (activeStatus && p.researchStatus !== activeStatus) return false;
    if (
      activeUseCase &&
      !p.useCase.some((u) =>
        u.toLowerCase().includes(activeUseCase.toLowerCase()),
      )
    )
      return false;
    return true;
  });

  const useCases = Array.from(
    new Set(products.flatMap((p) => p.useCase)),
  ).sort();

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-sleep">
        Product Lab
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
        Understand what a product does before deciding if it fits.
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        A buyer&apos;s guide, not a store. Every entry lists the problem it is
        designed to address, who it may fit, important specifications, comfort
        and usability notes, and limitations — before price.
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <Filter label="Category">
            <select
              defaultValue={activeCategory}
              onChange={(e) => applyFilter("category", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-sleep focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Filter>

          <Filter label="Use case">
            <select
              defaultValue={activeUseCase}
              onChange={(e) => applyFilter("useCase", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-sleep focus:outline-none"
            >
              <option value="">All use cases</option>
              {useCases.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </Filter>

          <Filter label="Price range">
            <select
              defaultValue={activePrice}
              onChange={(e) => applyFilter("price", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-sleep focus:outline-none"
            >
              <option value="">All prices</option>
              {priceRanges.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Filter>

          <Filter label="Research status">
            <select
              defaultValue={activeStatus}
              onChange={(e) => applyFilter("status", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground focus:border-sleep focus:outline-none"
            >
              <option value="">Any status</option>
              {researchStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Filter>
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">
          {filtered.length} of {products.length} products match ·{" "}
          <button
            type="button"
            onClick={() => {
              const url = new URL(window.location.href);
              ["category", "useCase", "price", "status"].forEach((k) =>
                url.searchParams.delete(k),
              );
              window.location.href = url.toString();
            }}
            className="text-sleep underline decoration-sleep/40 underline-offset-2 hover:text-foreground"
          >
            Clear filters
          </button>
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/product-lab/${p.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border bg-card transition-colors duration-200 hover:border-sleep/35"
          >
            <div
              className="aspect-[4/5] w-full"
              style={{
                background:
                  "linear-gradient(155deg, #FFFcf8 0%, #E8E1D6 48%, #D4CDBF 100%)",
              }}
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sleep">
                  {p.category}
                </span>
                <ResearchStatusBadge status={p.researchStatus} />
              </div>
              <h2 className="mt-2 font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
                {p.name}
              </h2>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                {p.oneLine}
              </p>
              <p className="mt-3 text-[12px] font-medium text-muted-foreground/80">
                {p.priceRange} · {p.useCase[0]}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[13px] text-muted-foreground">
          No products match those filters. Try clearing one.
        </p>
      )}

      <p className="mt-12 text-center text-[12px] text-muted-foreground">
        <Link
          href="/affiliate-disclosure"
          className="underline decoration-sleep/40 underline-offset-2 hover:text-sleep"
        >
          How we label and disclose affiliate relationships →
        </Link>
      </p>
    </article>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ResearchStatusBadge({ status }: { status: ResearchStatus }) {
  const colour =
    status === "Not independently tested"
      ? "bg-background text-muted-foreground border-border"
      : status === "Editorial comparison"
        ? "bg-accent-soft text-foreground border-accent/40"
        : status === "Specification checked"
          ? "bg-sleep-soft text-sleep border-sleep/25"
          : "bg-paper-2 text-muted-foreground border-border";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${colour}`}
    >
      {status}
    </span>
  );
}

function applyFilter(key: string, value: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key === "price" ? "price" : key, value);
  } else {
    url.searchParams.delete(key === "price" ? "price" : key);
  }
  window.location.href = url.toString();
}
