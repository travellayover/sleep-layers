"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm({
  source = "home",
  ctaLabel = "Subscribe",
}: {
  source?: string;
  ctaLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const r = await fetch("/api/public?action=newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        toast.error(data?.error ?? "Something went wrong.");
        setStatus("idle");
        return;
      }
      if (data.status === "already_subscribed") {
        toast.success("You are already subscribed. Thank you.");
      } else if (data.status === "resubscribed") {
        toast.success("Welcome back.");
      } else {
        toast.success("Subscribed. Check your inbox for a welcome note.");
      }
      setEmail("");
      setStatus("idle");
    } catch {
      toast.error("Network error. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center"
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email for the weekly sleep note"
        className="h-12 max-w-xs rounded-full border-border bg-background px-5 text-[14px]"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        size="lg"
        className="rounded-full px-6"
      >
        {status === "loading" ? "…" : ctaLabel}
      </Button>
    </form>
  );
}
