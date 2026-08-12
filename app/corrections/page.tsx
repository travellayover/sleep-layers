import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "Corrections Policy — Sleep Layers",
  description:
    "How Sleep Layers handles errors, fabrications, and outdated claims.",
};

export default function CorrectionsPage() {
  return (
    <PolicyPage
      title="Corrections Policy"
      description="How Sleep Layers handles errors, fabrications, and outdated claims."
      intro="If a guide or product review is wrong, we publish a correction with a date. Corrections are not silent edits."
      sections={[
        {
          heading: "What we correct",
          body: [
            "Fabricated or misattributed citations.",
            "Claims that turn out to be inaccurate or out of date.",
            "Missing limitations, missing safety notes, missing affiliate disclosures.",
          ],
        },
        {
          heading: "How we correct",
          body: [
            "The original article is updated with a dated correction note near the affected section.",
            "A running list of corrections is published below when the corrections page is built out.",
            "Severe errors trigger a top-of-page note that does not require scrolling to see.",
          ],
        },
        {
          heading: "How to report an error",
          body: "If you spot a citation that does not exist, a claim that does not match the linked study, or a missing safety note, please contact us so we can verify and correct.",
        },
      ]}
    />
  );
}
