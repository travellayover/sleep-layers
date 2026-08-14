"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm({
  source = "home",
  ctaLabel = "Subscribe",
  variant = "default",
}: {
  source?: string;
  ctaLabel?: string;
  /** `onDark` for night/pre-landing surfaces */
  variant?: "default" | "onDark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const onDark = variant === "onDark";

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
        toast.error(data?.error ?? "Something went wrong. Try again.");
        setStatus("idle");
        return;
      }
      setEmail("");
      setStatus("done");
      if (data.status === "already_subscribed") {
        toast.success("You’re already on the list.");
      } else {
        toast.success("You’re on the list. We’ll write when we open.");
      }
    } catch {
      toast.error("Network error. Please try again.");
      setStatus("idle");
    }
  }

  async function shareInvite() {
    const url =
      typeof window !== "undefined" ? window.location.origin : "https://mysleeplabs.co";
    const text = "Practical sleep for the night you actually have. MySleepLabs is opening soon.";
    try {
      if (navigator.share) {
        await navigator.share({ title: "MySleepLabs", text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied. Share with a friend.");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied. Share with a friend.");
      } catch {
        toast.error("Couldn’t share. Copy mysleeplabs.co from the address bar.");
      }
    }
  }

  if (status === "done" && onDark) {
    return (
      <div className="flex w-full flex-col items-center gap-3" role="status">
        <p className="rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-[14px] leading-snug text-[var(--color-night-fg)]/85">
          You’re on the list. See you soon.
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={shareInvite}
          className="cta-press h-11 w-full rounded-full border-white/20 bg-transparent text-[14px] text-[var(--color-night-fg)] hover:bg-white/5 hover:text-[var(--color-night-fg)]"
        >
          Share with a friend
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        onDark
          ? "flex w-full flex-col gap-3"
          : "flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center"
      }
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email for launch updates"
        autoComplete="email"
        disabled={status === "loading"}
        className={
          onDark
            ? "h-12 w-full rounded-full border-white/18 bg-white/[0.08] px-5 text-[15px] text-[var(--color-night-fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] placeholder:text-white/38 transition-[border-color,box-shadow,background-color] duration-200 focus-visible:border-[#F2B84B]/70 focus-visible:bg-white/[0.12] focus-visible:ring-[#F2B84B]/25"
            : "h-12 w-full max-w-xs rounded-full border-border bg-background px-5 text-[14px] transition-[border-color,box-shadow] duration-200 focus-visible:border-sleep focus-visible:ring-sleep/30 sm:mx-auto sm:w-auto"
        }
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        size="lg"
        className={
          onDark
            ? "cta-press h-12 w-full rounded-full bg-[#F2B84B] px-7 text-[15px] font-semibold text-[#0B1B3A] shadow-[0_12px_32px_-14px_rgba(242,184,75,0.65)] hover:bg-[#F2B84B]/92"
            : "cta-press shrink-0 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/92"
        }
      >
        {status === "loading" ? "Saving…" : ctaLabel}
      </Button>
    </form>
  );
}
