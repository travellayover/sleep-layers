import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "About | MySleepLabs",
  description:
    "An independent sleep-education and product-discovery publication that uses AI to assist research and content creation.",
};

export default function AboutPage() {
  return (
    <PolicyPage
      title="About MySleepLabs"
      description="An independent sleep-education and product-discovery publication."
      intro="MySleepLabs is an independent sleep-education brand, not a clinic. The method is notice, test one change, learn what fits. We use AI to assist research and content creation, but every guide is checked against the underlying sources, every product review lists limitations before benefits, and every affiliate relationship is disclosed."
      sections={[
        {
          heading: "What we publish",
          body: [
            "Practical sleep education designed around real schedules and households.",
            "Product reviews that explain fit and limitations, not miracle outcomes.",
            "Editorial comparisons grounded in desk research and specification checks.",
          ],
        },
        {
          heading: "What we do not do",
          body: [
            "We do not provide medical advice, diagnosis, or treatment.",
            "We do not claim hands-on testing where we have not tested the product.",
            "We do not let affiliate relationships change the evaluation method.",
            "We do not promise a sleep age, a clinical score, or a magic routine.",
          ],
        },
        {
          heading: "How AI is used here",
          body: "AI is used to assist research synthesis, draft outlines, and check for gaps in coverage. A human editor reviews every piece before publication. AI assistance is disclosed on every guide.",
        },
      ]}
    />
  );
}
