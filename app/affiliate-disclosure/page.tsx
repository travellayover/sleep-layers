import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Sleep Layers",
  description: "How Sleep Layers discloses affiliate relationships.",
};

export default function AffiliateDisclosurePage() {
  return (
    <PolicyPage
      title="Affiliate Disclosure"
      description="How Sleep Layers discloses affiliate relationships."
      intro="Some links in our guides and product reviews are affiliate links. If you buy through one of those links, we may earn a small commission at no cost to you. We disclose affiliate relationships on every page where they appear."
      sections={[
        {
          heading: "What does not change",
          body: [
            "Affiliate relationships do not change how we evaluate a product.",
            "Limitations are listed before benefits on every product card.",
            "We never imply hands-on testing if we have not tested the product.",
          ],
        },
        {
          heading: "How we label reviews",
          body: [
            "Desk researched — reviewed against specifications and documentation only.",
            "Specification checked — at least one independent specification cross-checked.",
            "Editorial comparison — compared against named alternatives in the same category.",
            "Not independently tested — has not been physically tested by MySleepLabs.",
          ],
        },
        {
          heading: "How commissions work",
          body: "Commissions come from the retailer, not from you. They never influence which products we cover, the order of comparison, or the limitations we list.",
        },
      ]}
    />
  );
}
