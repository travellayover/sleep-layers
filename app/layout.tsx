import { PublicNav } from "@/components/public/public-nav";
import { PublicFooter } from "@/components/public/public-footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SearchTrigger } from "@/components/public/search-trigger";
import { GUIDES } from "@/lib/guides/content";
import { PRODUCTS } from "@/lib/products/content";

export const metadata = {
  title: "Sleep Layers by MySleepLabs — Practical sleep guidance",
  description:
    "Source-checked sleep education and straightforward product guidance for busy minds, changing schedules, and shared homes.",
};

const PATHS = [
  { title: "Start Here", description: "Four-question router that picks the closest path.", href: "/start-here", section: "Audience path" },
  { title: "Busy Minds path", description: "Work-heavy evenings.", href: "/busy-minds", section: "Audience path" },
  { title: "Restless or Unrefreshed path", description: "Waking up unrefreshed — noticing patterns first.", href: "/restless", section: "Audience path" },
  { title: "Shift & Caregiving path", description: "Action-based anchors for changing schedules.", href: "/shift", section: "Audience path" },
  { title: "Family Evenings path", description: "Household signals for shared evenings.", href: "/family", section: "Audience path" },
  { title: "Seven-Night Setup", description: "One small setup decision each evening.", href: "/seven-night-setup", section: "Programme" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-screen flex-col bg-background">
        <PublicNav />
        <main className="flex-1">{children}</main>
        <PublicFooter />
        <SearchTrigger items={index} />
        <Toaster position="top-center" />
      </div>
    </TooltipProvider>
  );
}
