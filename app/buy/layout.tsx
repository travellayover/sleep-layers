import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 7-Day Sleep Reset — MySleepLabs",
  description:
    "One action per night. Ten minutes max. A sequenced PDF sleep reset — $9 at launch.",
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
