import Link from "next/link";
import type { Metadata } from "next";
import { ProductLabIndex } from "@/components/public/product-lab-index";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  PRICE_RANGES,
  RESEARCH_STATUSES,
} from "@/lib/products/content";

export const metadata: Metadata = {
  title: "Product Lab — Sleep Layers",
  description:
    "Understand what a product does before deciding if it fits your life.",
};

export default function ProductLabIndexPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    useCase?: string;
    price?: string;
    status?: string;
  }>;
}) {
  return (
    <ProductLabIndex
      products={PRODUCTS}
      categories={PRODUCT_CATEGORIES}
      priceRanges={PRICE_RANGES}
      researchStatuses={RESEARCH_STATUSES}
      searchParams={searchParams}
    />
  );
}
