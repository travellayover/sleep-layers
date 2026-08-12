import type { Metadata } from "next";
import { AudienceLandingPage } from "@/components/public/audience-landing";

export const metadata: Metadata = {
  title: "Family Evenings — MySleepLabs",
  description:
    "Guides and tools for households where bedtime is a team sport, not a solo project.",
};

export default function FamilyLandingPage() {
  return (
    <AudienceLandingPage
      audience="FAMILY"
      kicker="Path · Family Evenings"
      title="For households where one routine has to work for everyone."
      intro="If bedtime is a team sport, the right signal is the one that everyone in the room can see. These guides assume children, partners, and shared spaces — and they work from household signals, not individual ones."
      scene="A parent dims the hallway light while a child picks a book from the nightstand."
      environment="Shared home · household signal · warm evening light"
    />
  );
}
