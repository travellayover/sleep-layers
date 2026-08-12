import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed — MySleepLabs",
  description: "Your 7-Day Sleep Reset order is ready.",
};

export default function BuySuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
