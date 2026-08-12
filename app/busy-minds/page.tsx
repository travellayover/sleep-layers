import type { Metadata } from "next";
import { AudienceLandingPage } from "@/components/public/audience-landing";

export const metadata: Metadata = {
  title: "Busy Minds — MySleepLabs",
  description:
    "Guides and tools for work-heavy evenings and the people who never feel quite off the clock.",
};

export default function BusyMindsLandingPage() {
  return (
    <AudienceLandingPage
      audience="FOCUS"
      kicker="Path · Busy Minds"
      title="For the evenings that never quite end."
      intro="If your work follows you home, the right guide is one that makes the stopping point real — not aspirational, not moralising. These guides work from the assumption that your laptop is in the same room as your bed, and that you need a small, repeatable closing ritual to make the day actually end."
      scene="Someone closes a laptop on the dresser and turns toward a warmer lamp."
      environment="Work-from-home bedroom · clear stopping point · ordinary evening"
    />
  );
}
