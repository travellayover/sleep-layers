import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/policy-page";

export const metadata: Metadata = {
  title: "Editorial Method — MySleepLabs",
  description:
    "How MySleepLabs researches, reviews, and corrects its work.",
};

export default function EditorialMethodPage() {
  return (
    <PolicyPage
      title="Editorial Method"
      description="How MySleepLabs researches, reviews, and corrects its work."
      intro="Our editorial method exists because sleep advice is full of confident claims and missing citations. Here is the process every guide goes through before it ships."
      sections={[
        {
          heading: "1. Research synthesis",
          body: "We start by reading the underlying studies (peer-reviewed where possible) and noting the strength of evidence. If the evidence is weak, the guide says so.",
        },
        {
          heading: "2. Drafting",
          body: "We draft against a fixed structure: human headline, two-sentence answer, why this may happen, what to try tonight, real-life variations, what this cannot promise, when professional support may be appropriate, sources, last reviewed date.",
        },
        {
          heading: "3. AI-assisted review",
          body: "AI is used to flag missing claims, weak citations, and unclear framings. It is not used to write the final draft without a human pass.",
        },
        {
          heading: "4. Limitations first",
          body: "Every guide lists what the approach cannot promise and when professional support may be appropriate. Limitations are written into the body, not buried in a footnote.",
        },
        {
          heading: "5. Corrections",
          body: "If a guide turns out to be wrong, we publish a correction with a date. We never silently edit a guide without noting the change.",
        },
      ]}
    />
  );
}
