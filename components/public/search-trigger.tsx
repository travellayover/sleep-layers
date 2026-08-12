"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type IndexItem = {
  title: string;
  description: string;
  href: string;
  section: string;
};

export function SearchTrigger({ items }: { items: IndexItem[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search guides, products, paths…" />
      <CommandList>
        <CommandEmpty>No matches. Try a broader term.</CommandEmpty>
        <CommandGroup heading="MySleepLabs index">
          {items.map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.title} ${item.description} ${item.section}`}
              onSelect={() => {
                setOpen(false);
                router.push(item.href);
              }}
            >
              <span className="font-serif text-foreground">{item.title}</span>
              <span className="ml-2 text-[11px] text-muted-foreground">{item.section}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
