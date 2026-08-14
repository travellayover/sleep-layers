# Pinterest illustrated web — design plan

_OSINT only: public boards, published case studies, live brand sites. Harvest patterns, never pin assets._

MySleepLabs already lists Pinterest as OSINT source #3 in [`09_OSINT_PIPELINE/osint-workflow.md`](/Users/gm/mysleeplabs/09_OSINT_PIPELINE/osint-workflow.md). This plan uses that same loop for **visual language**, not just topic ideas.

---

## What “Pinterest illustrated web” actually is

Two public layers, both usable:

**A. Pinterest as a brand (how they illustrate Home / planning)**  
- [Media.Work × Pinterest brand assets (2024)](https://media.work/project/pinterest-brand-assets) — photoreal 3D of familiar rooms and objects, slight imaginative twist, character personality through *animation*, not cartoon anatomy. Focus buckets: Travel, Home, Fashion.  
- [Made Thought × Pinterest Predicts](https://www.madethought.com/work/pinterest-predicts) — one trend = one surreal but still-readable space. Invite the viewer *into* a room, then unpack meaning.  
- [Burn & Broad / Vicente García Morillo](https://burnandbroad.com/works/pinterest/) — discovery → planning → shopping as a visual journey, not a feature list.

**B. Pinterest as a search surface (what people save)**  
Public idea boards cluster around:

| Query / board | Pattern that shows up | Use for us? |
|---|---|---|
| [Coming soon website design](https://www.pinterest.com/ideas/coming-soon-website-design/948325528630/) | One hero, little chrome, email, night or gradient plane | Yes |
| [One page design layout](https://www.pinterest.com/ideas/one-page-design-layout/921767563016/) | Editorial serif + single column or 60/40 split | Yes (mobile: stack) |
| [Editorial style website](https://www.pinterest.com/ideas/editorial-style-website-design/894861493342/) | Magazine crop, caption, lots of air | Yes |
| [Interior design editorial layout](https://www.pinterest.com/ideas/interior-design-editorial-layout/958719379323/) | Room as the story, type as caption | Yes |
| [3D bedroom / isometric room](https://www.pinterest.com/ideas/3d-bedroom-design-interiors/916971535076/) | Dollhouse isometric, cute pastel rooms | **No** as main hero (too toy / Headspace-adjacent) |
| Sleep tips pins | Checklist + isometric bedroom stills | Content later, not prelaunch chrome |

**Pinterest web grammar (the pin, not the feed):** one image earns the save; text is a caption; the frame is a rounded card; the next pin is a *related scene*, not a new website.

---

## Translation for MySleepLabs

Keep the locked product facts:

- Prelaunch one-pager, waitlist only  
- Kiola as the illustrated character (already on `/` via `kiola-evening.png`)  
- Navy / sleep / gold, educational not medical  
- IG bio + Pinterest pin traffic (both are *image-first*)

Treat the coming-soon as **a pin that became a page**:

```
[ rounded illustrated scene ]     ← the pin
Coming soon                       ← board label
Headline (serif, ≤14 words)       ← pin title
One supporting line               ← description
Email + Notify me                 ← save / follow
```

Not: a SaaS landing, a masonry blog, an isometric dollhouse, or a long manifesto scroll.

### Illustration system (Pinterest Home + Healthline discipline)

Steal from Pinterest’s *own* 3D Home work:

- Photoreal materials (linen, wood, lamp glass) with one imaginative twist  
- One subject, one action, one room  
- Personality in **motion** (breath, lamp, fabric), not mascot faces  

Keep Healthline rules from the original brief: diverse, readable, supports the headline. Keep Loftie for nightstand / warm practical light.

Do **not** steal from popular isometric-bedroom pins: cute furniture catalogs, kawaii rooms, Sims-like dollhouses, bright wellness pastels.

**Kiola role:** she is the recurring illustrated person in the pin — same character, different evening beats later (work ending → lamp on → asleep). Prelaunch uses **one** beat: dusk bedroom, `kiola-evening.png`.

### Layout (editorial pin, not Pinterest grid)

Prelaunch stays **one viewport**. The “illustrated web” idea is the **card**, not a masonry feed.

| Zone | Spec |
|---|---|
| Atmosphere | Full-bleed night (already). Scene lives *inside* the pin card, not as a second logo. |
| Pin card | 4:5 on mobile (Pinterest native), 16:10 only if it still fills the card with Kiola + bed. Current 16:10 crops the story; Pinterest saves 4:5. |
| Caption stack | Lockup small or omitted in hero (logo already in intro). “Coming soon” as board kicker. Serif H1. One line. Form. |
| Type | Serif display like a pin title; sans for UI. Measure ~28–36ch. |
| Chrome | About + legal only (already). |

When the full site unlocks, Pinterest grammar becomes **related pins**: path scenes, guide covers, Product Lab stills — a quiet masonry *index*, never the coming-soon.

### Motion (Pinterest 3D, not Framer shader soup)

One system, already half-built:

1. Intro wipe (wave mark)  
2. Pin reveal (clip-path open on Kiola card)  
3. Sleep loop: lamp pulse + 1–2px scene breathe  
4. Optional: fabric wash *inside the duvet only* (not a page-wide shader)

No custom cursor, particles, or masonry hover zoo on prelaunch.

---

## OSINT harvest loop (weekly, 15 min visual)

Add a visual row under existing Pinterest collect:

| Harvest | Question | Output |
|---|---|---|
| Top saved “coming soon landing” pins | One image or a form? | Keep one-image rule |
| Sleep / bedroom 3D pins | Photoreal room vs isometric toy? | Prefer room; reject toy |
| Editorial website pins | Type over image or beside? | Caption-below for mobile |
| Pinterest Predicts / brand 3D reels | How much play vs realism? | One twist max |

Cite board URL + date in this file when a pin changes the spec. Do not download or reproduce pin artwork.

---

## Gap vs live `/` (what to change)

Shipped 2026-08-14:

| Change | Status |
|---|---|
| Hero crop **4:5** on phone, 16:10 from `sm` | `KiolaHero` |
| Lockup omitted on prelaunch hero (intro + nav still carry the mark) | `app/page.tsx` |
| One supporting line | “Practical evening guidance. Leave your email — we open soon.” |
| Lighter navy grade on the card | texture-first overlay |
| Share-after-signup | `NewsletterForm` |
| Related-pin grid | `/guides` + Product Lab index (soft-locked until `PRELAUNCH` flips) |

Out of scope: masonry coming-soon, isometric room rebuild, fake waitlist counts, parchment/rust template palettes.

---

## Build sequence

1. **Spec lock** — done.  
2. **Card ratio + overlay** — done.  
3. **Caption trim** — done.  
4. **Motion pass** — reveal + lamp + breathe.  
5. **Pin test** — 4:5 card, ~236px thumb via screenshot.  
6. **Related pins** — `components/public/related-pins.tsx` on guides; Product Lab cards match the pin frame.

---

## Sources (public)

- https://media.work/project/pinterest-brand-assets  
- https://www.madethought.com/work/pinterest-predicts  
- https://burnandbroad.com/works/pinterest/  
- https://www.pinterest.com/ideas/coming-soon-website-design/948325528630/  
- https://www.pinterest.com/ideas/one-page-design-layout/921767563016/  
- https://www.pinterest.com/ideas/editorial-style-website-design/894861493342/  
- https://www.pinterest.com/ideas/interior-design-editorial-layout/958719379323/  
- https://www.pinterest.com/ideas/3d-bedroom-design-interiors/916971535076/ (anti-reference for isometric cute)  
- Internal: `09_OSINT_PIPELINE/osint-workflow.md` source #3  
- Prior motion pool: `docs/coming-soon-inspiration.md` (Arc, Sonna, Kwami, WaitlistKit, Loftie)  
