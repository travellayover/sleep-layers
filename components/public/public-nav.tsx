"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BrandLockup } from "./brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isPrelaunch } from "@/lib/site-mode";

const NAV_LIVE = [
  { label: "Start Here", href: "/start-here" },
  { label: "Sleep Guides", href: "/guides" },
  { label: "Product Lab", href: "/product-lab" },
  { label: "About", href: "/about" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* Pre-launch: About only — brand lives in the hero */
  if (isPrelaunch) {
    return (
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-5 py-5 sm:px-8">
          <Link
            href="/about"
            className="text-[12px] font-medium tracking-[0.04em] text-white/45 transition-colors duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B3A] rounded-sm"
          >
            About
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 lg:px-8">
        <Link
          href="/"
          aria-label="MySleepLabs home"
          className="transition-opacity duration-200 hover:opacity-80"
        >
          <BrandLockup size="sm" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LIVE.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-sleep after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100 ${
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="cta-press rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/buy">
              <span className="sm:hidden">Buy Reset</span>
              <span className="hidden sm:inline">Get the 7-Day Sleep Reset</span>
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-card text-card-foreground"
            >
              <SheetHeader>
                <SheetTitle className="font-sans text-lg">
                  <span className="text-foreground">My</span>
                  <span className="text-sleep">Sleep</span>
                  <span className="text-foreground">Labs</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
                {NAV_LIVE.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
