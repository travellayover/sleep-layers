"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SleepLayersWordmark } from "./sleep-layers-wordmark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { label: "Start Here", href: "/start-here" },
  { label: "Sleep Guides", href: "/guides" },
  { label: "Product Lab", href: "/product-lab" },
  { label: "About", href: "/about" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <Link href="/" aria-label="Sleep Layers home">
          <SleepLayersWordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium tracking-wide transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Search
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/buy">Get the 7-Day Sleep Reset</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card text-card-foreground">
              <SheetHeader>
                <SheetTitle className="font-serif text-lg">Sleep Layers</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="text-[14px] font-medium text-muted-foreground"
                >
                  Search (⌘K)
                </Link>
                <Link
                  href="/newsletter"
                  onClick={() => setOpen(false)}
                  className="text-[14px] font-medium text-muted-foreground"
                >
                  Newsletter
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
