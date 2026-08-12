"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type IndexItem = {
  title: string;
  description: string;
  href: string;
  section: string;
};

export function SiteSearch({ items }: { items: IndexItem[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items
      .map((item) => {
        const haystack = `${item.title} ${item.description} ${item.section}`.toLowerCase();
        if (!haystack.includes(needle)) return null;
        let score = 0;
        if (item.title.toLowerCase().includes(needle)) score += 10;
        if (item.description.toLowerCase().includes(needle)) score += 3;
        if (item.section.toLowerCase().includes(needle)) score += 1;
        return { item, score };
      })
      .filter((r): r is { item: IndexItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
  }, [items, q]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Search
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
          Find a guide, product, or path.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Search across our guides, product reviews, and audience paths.
          Press <Kbd>⌘K</Kbd> for the command palette.
        </p>
      </header>

      <div className="relative">
        <Input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="blue light, mattress, shift work, kids…"
          aria-label="Search Sleep Layers"
          className="h-12 rounded-full border-border bg-card px-5 text-[15px] text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
        />
        <p className="mt-3 text-[12px] text-muted-foreground">
          {results.length} of {items.length} matches
        </p>
      </div>

      {results.length === 0 ? (
        <EmptyState query={q} />
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
          {results.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-5 py-4 transition-colors hover:bg-secondary"
              >
                <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                  {item.section}
                </Badge>
                <h2 className="mt-2 font-serif text-base font-medium text-foreground">
                  {item.title}
                </h2>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
      <p className="text-[13px] text-muted-foreground">
        Nothing matches "{query}". Try a broader term, or browse{" "}
        <Link href="/guides" className="font-medium text-foreground underline decoration-accent underline-offset-2 hover:text-accent">
          all guides
        </Link>
        .
      </p>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-secondary px-1.5 font-mono text-[10px] text-muted-foreground">
      {children}
    </kbd>
  );
}
