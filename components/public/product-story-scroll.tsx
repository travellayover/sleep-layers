"use client";

import { useEffect, useRef, useState } from "react";

export type StoryLayer = {
  label: string;
  title: string;
  body: string;
};

/**
 * Eight Sleep–style sticky storytelling — Product Lab only.
 * Sticky visual plane + scroll-driven text layers. Restrained motion.
 */
export function ProductStoryScroll({
  productName,
  category,
  layers,
}: {
  productName: string;
  category: string;
  layers: StoryLayer[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const panels = root.querySelectorAll<HTMLElement>("[data-story-layer]");
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const idx = Number((top.target as HTMLElement).dataset.storyLayer);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      {
        root: null,
        threshold: [0.35, 0.55, 0.7],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, [layers.length]);

  const current = layers[active] ?? layers[0];

  return (
    <section
      ref={sectionRef}
      className="relative mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14"
      aria-label={`${productName} story`}
    >
      {/* Sticky product plane */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-border p-7 md:p-8"
          style={{
            background:
              "linear-gradient(160deg, #FFFcf8 0%, #F4F0E8 50%, #ECE7DE 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 65%, rgba(242,184,75,0.05) 0%, transparent 40%), radial-gradient(ellipse at 20% 20%, rgba(91,103,232,0.06) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sleep">
              {category}
            </p>
            <p className="mt-3 font-serif text-2xl font-medium leading-snug text-foreground md:text-3xl">
              {productName}
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Layer {String(active + 1).padStart(2, "0")} · {current?.label}
            </p>
            <p className="mt-2 font-serif text-lg font-medium text-foreground transition-opacity duration-300">
              {current?.title}
            </p>
            <div className="mt-5 flex gap-2">
              {layers.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i === active ? "bg-sleep" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling text layers */}
      <div className="space-y-6 pb-8 lg:space-y-10 lg:py-6">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            data-story-layer={i}
            className={`rounded-2xl border p-6 transition-colors duration-300 md:p-8 ${
              i === active
                ? "border-sleep/35 bg-card"
                : "border-border bg-card/60"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sleep">
              {layer.label}
            </p>
            <h3 className="mt-3 font-serif text-xl font-medium text-foreground md:text-2xl">
              {layer.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {layer.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
