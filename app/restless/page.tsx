import type { Metadata } from "next";
import { AudienceLandingPage } from "@/components/public/audience-landing";

export const metadata: Metadata = {
  title: "Restless or Unrefreshed — Sleep Layers",
  description:
    "Guides and tools for people who wake up unrefreshed and want to notice patterns before buying another solution.",
};

export default function RestlessLandingPage() {
  return (
    <AudienceLandingPage
      audience="CLARITY"
      kicker="Path · Restless or Unrefreshed"
      title="For the nights that end but the mornings still feel wrong."
      intro="If you are sleeping but not feeling restored, the first move is to look at your own patterns before you look at a product. These guides assume you have a dataset problem, not a treatment problem — a sleep diary, a tracker comparison, and a reading list for when it might be clinical."
    />
  );
}
