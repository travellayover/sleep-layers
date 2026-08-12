import type { Metadata } from "next";
import { SiteSearch } from "@/components/public/site-search";
import { GUIDES } from "@/lib/guides/content";
import { PRODUCTS } from "@/lib/products/content";

export const metadata: Metadata = {
  title: "Search — MySleepLabs",
  description: "Search MySleepLabs guides, products, and audience paths.",
};

const PATHS = [
  {
    title: "Start Here",
    description: "Four-question router that picks the closest path.",
    href: "/start-here",
    section: "Audience path",
  },
  {
    title: "Busy Minds path",
    description: "Work-heavy evenings and the people who never feel quite off the clock.",
    href: "/busy-minds",
    section: "Audience path",
  },
  {
    title: "Restless or Unrefreshed path",
    description: "Waking up unrefreshed — noticing patterns first.",
    href: "/restless",
    section: "Audience path",
  },
  {
    title: "Shift & Caregiving path",
    description: "Action-based anchors for changing schedules.",
    href: "/shift",
    section: "Audience path",
  },
  {
    title: "Family Evenings path",
    description: "Household signals for shared evenings.",
    href: "/family",
    section: "Audience path",
  },
  {
    title: "Seven-Night Setup",
    description: "One small setup decision each evening.",
    href: "/seven-night-setup",
    section: "Programme",
  },
];

export default function SearchPage() {
  // Build the index on the server, ship to the client
  const index = [
    ...GUIDES.map((g) => ({
      title: g.title,
      description: g.twoSentenceAnswer,
      href: `/guides/${g.slug}`,
      section: g.topic.split(" · ")[0] ?? "Guide",
    })),
    ...PRODUCTS.map((p) => ({
      title: p.name,
      description: p.oneLine,
      href: `/product-lab/${p.slug}`,
      section: `${p.category} · Product Lab`,
    })),
    ...PATHS,
  ];

  return <SiteSearch items={index} />;
}
