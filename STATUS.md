# MySleepLabs — Status & Owed Work

_Last updated: 2026-08-11 — Pinterest coming-soon polished (Impeccable)._

## Pre-launch one-pager mode (active)

**Public experience = Pinterest-style coming-soon at `/` only** — one viewport, brand, short line, email field. No long scroll, no path/story/trust sections until full launch. Nav is logo + About; footer is a thin legal strip. Guides, Product Lab, Buy, etc. stay soft-locked via middleware → `/#waitlist`.

### How to unlock the full site

Flip **one** of these:

1. In `lib/site-mode.ts`, set `PRELAUNCH = false`, **or**
2. Set env `NEXT_PUBLIC_SITE_MODE=live`

That restores full nav/footer, Cmd-K search, and stops middleware redirects.

### One-pager section map (`/`)

| Section | Anchor | Role |
|---|---|---|
| Brand intro loader | — | Wave mark + gold dot; once per session; then hero |
| Night hero | — | Brand, promise, waitlist + paths CTAs, scene |
| Brand story | `#story` | What this is / education frame |
| Path picker | `#paths` | Four paths → `#waitlist` (no separate destinations) |
| Waitlist | `#waitlist` | Primary conversion |
| 7-Night tease | `#setup` | Soft programme tease → waitlist |
| Trust | `#trust` | Education / method / no mattress pitch |
| Closing CTA | — | Navy band → waitlist |

### Motion

1. **PageLoader** (`components/public/page-loader.tsx`) — navy overlay, animated `BrandWaveMark` + wordmark, wipe up; skipped if `prefers-reduced-motion` or session already seen.
2. **Hero entrance** — waits for intro; lockup → type → CTAs → scene clip.
3. **Scroll** — story / paths / waitlist / setup / trust reveals (once); soft scene parallax.
4. **Feedback** — CTA press; path row accent + arrow.

---

## Impeccable / Framer pre-launch plan (Persuade · `/`)

**Mode:** Persuade for IG bio traffic on phones. Earn the waitlist; paths stay on-page until launch.

**Thesis:** Quiet bedroom confidence — Healthline clarity in the words, Loftie evening atmosphere in the hero plane, Oura lifestyle restraint in motion. Arrival should feel like a lamp warming up, not a dashboard assembling. Brand loader → authored hero entrance; everything else is quieter continuity or feedback.

**Composition**
1. **Full-bleed night hero** (edge-to-edge visual plane): brand lockup hero-level · one headline · one supporting line · waitlist + path CTAs · soft bedroom light layers (no particles, no glow soup). Trust line demoted out of the first read.
2. **Story + Paths** — one-job story; lean divided path list with crafted row hover (sleep accent + arrow), not cards.
3. **Waitlist** — primary conversion block with clearer human copy.
4. **7-Night Setup + trust + close** — soft tease; buy stays locked; trust strip; navy closing CTA.

**Motion budget (GSAP already in repo)**
- Focal: intro loader + hero entrance timeline with expo ease; content visible by default if JS fails.
- Continuity: soft scroll parallax on hero light layers; path/section reveals once (no reverse jank).
- Feedback: CTA press/hover micro; path row underline/arrow.
- Always honor `prefers-reduced-motion`.

**Copy direction**
- Desirable and specific to real evenings; educational; no invented medical claims.
- Waitlist = “useful note,” not “newsletter subscribe.”

**Out of scope this pass:** guide library UX, Product Lab sticky theater, Stripe, waitlist persistence, font family swap (Inter + Source Serif stay locked).

---

## Pre-launch public plan (IG-first)

Audience today: Instagram bio traffic on phones, early brand — **not** a mature multi-product content site.

### Need now (shipped or in progress)

| Need | Status |
|---|---|
| Brand-first one-pager (lockup, promise, CTA group, night scene) | **Shipped** on `/` |
| Brand loading / intro sequence | **Shipped** (`IntroProvider` / `PageLoader`) |
| Clear “what this is” + educational / not-medical trust | **Shipped** (story + trust + footer + disclaimer) |
| Primary conversion: email waitlist | **Shipped** (`/#waitlist` + nav CTA); API still acknowledge-only |
| In-page path picker (not separate destinations) | **Shipped** (`/#paths` → waitlist) |
| Soft-lock Guides / Product Lab / Buy / audience routes | **Shipped** (`lib/site-mode.ts` + `middleware.ts`) |
| Prelaunch-locked nav/footer | **Shipped** (anchors only; full chrome when `isPrelaunch = false`) |
| Affiliate + medical links in footer | Already present |
| Authored hero motion + reduced-motion | **Shipped** (intro → `useHeroEntrance`, soft parallax, once-only reveals) |

CTA hierarchy (matches `05_FUNNEL/bio-links.md` pre-launch rule: checklist/list first, product hidden until week 3):

1. **Join the waitlist** (email)
2. **Find your path** → `/#paths` (in-page)
3. Free **7-Night Setup** tease (`/#setup`) — surfaces unlock at launch
4. Paid **7-Day Sleep Reset** / `/buy` — soft-locked until launch

### Defer until launch week / later

- Hard-sell `/buy` + real Stripe checkout
- Product Lab scroll theater polish as a home feature
- Deep guide library UX / comparison algorithms
- Editorial Method block on home (still at `/editorial-method`)
- Sitemap / JSON-LD / OG SEO scale
- Newsletter persistence (Vercel KV + Resend)
- Dense full-site nav on the pre-launch landing

---

## What is live right now

Visit [https://mysleeplabs-web.vercel.app](https://mysleeplabs-web.vercel.app). Brand system locked to the official logo on **warm light paper** surfaces:

- **Palette:** `#00143C` navy · `#505AE6` sleep periwinkle · `#F8B840` gold (sparse CTAs) · paper `#F7F4EE` / raised `#FFFcf8`
- **Surfaces:** light / off-white paper sitewide; navy reserved for circular mark, night scene frames / full-bleed home hero, contrast CTAs
- **Mark:** circular wave logo in nav + footer + animated SVG lockup on home
- **Assets:** `public/brand/mysleeplabs-mark.jpg`, `mysleeplabs-lockup.jpg`
- **Home:** brand intro → full-bleed night hero → story → path picker → waitlist → setup tease → trust → closing CTA
- **Motion:** PageLoader (session once) + authored hero entrance + soft scene parallax; section reveals play once; reduced-motion respected; no particle field
- **Gate:** `lib/site-mode.ts` `isPrelaunch` (default true); middleware soft-locks secondary marketing routes

**Brand components:**
- `components/public/brand-logo.tsx` — BrandMark, BrandWaveMark, BrandWordmark, BrandLockup (`onLight` / `onDark`)
- `components/public/page-loader.tsx` — IntroProvider + brand loading overlay
- `components/public/scene-frame.tsx` — lifestyle scene placeholders (day/night) for interior pages
- `components/public/product-story-scroll.tsx` — sticky product + changing text layers
- `components/public/animated-background.tsx` — soft mesh wash (no particles) + wave dividers
- `app/globals.css` — light paper tokens + shadcn bridge; `--color-sleep`, `--color-navy`, `--color-night`

Routes shipped (unchanged set; home + nav emphasis changed for pre-launch):
- `/` (pre-launch IG landing)
- `/about`, `/editorial-method`, `/corrections`, `/corrections-log`, `/newsletter`
- `/medical-disclaimer`, `/affiliate-disclosure`, `/privacy-terms`
- `/search`
- `/seven-night-setup`
- `/start-here`, `/start-here/{family,busy-minds,restless,shift}`
- `/{family,busy-minds,restless,shift}` (persona landings)
- `/guides`, `/guides/[slug]`
- `/product-lab`, `/product-lab/[slug]`, `/product-lab/compare/[pair]`
- `/buy`, `/buy/success`, `/buy/cancel` (checkout stub — de-emphasized until product launch)

API shipped (single endpoint):
- `POST /api/public?action=newsletter` — acknowledges subscribe, no persistence
- `POST /api/public?action=affiliate-click` — acknowledges click, no persistence
- `GET  /api/public?action=corrections` — returns `{ corrections: [] }`
- `GET  /api/public?action=newsletter-issues` — returns `{ issues: [] }`

## Gaps left (visual / brand)

- Real editorial 3D art not yet produced (SceneFrame placeholders remain on interior pages; home uses full-bleed night wash + scene copy)
- Official PNG lockup assets may replace JPG when available
- Metadata titles + chrome use **MySleepLabs**; “Sleep Layers” kept only as deprecated wordmark alias

## Owed work (post pre-launch — pick when ready to transact)

### Tier 1 — minimum viable consumer flow

1. **Newsletter / waitlist persistence** (Vercel KV + Resend welcome) — still acknowledge-only; **priority for IG pre-launch**.
2. **`/buy` Stripe** for "The 7-Day Sleep Reset" PDF — wire when week-3 product launch hits (`07_LAUNCH` day-by-day).
3. **`/buy/success` and `/buy/cancel`** — Stripe session verification.

### Tier 2 — SEO & trust (before scaling traffic)

4. **Sitemap + robots.txt** via Next.js 15 conventions.
5. **JSON-LD** on guide / product / persona pages.
6. **OG images** via `app/opengraph-image.tsx`.
7. **Per-page metadata enrichment** (twitter, canonical).

### Tier 3 — monetization phases

8. **Stripe Checkout integration.**
9. **Email delivery (Resend).**
10. **Affiliate retailer URLs** in `lib/affiliates/retailers.ts`.

### Tier 4 — content & blog

11. **MDX-driven blog/cms** from IG carousels.
12. **Comparison pair algorithm** beyond static `comparePair`.

### Tier 5 — observability & polish

13. **Privacy/consent banner.**
14. **Lighthouse ≥ 90 perf / ≥ 95 a11y.**
15. **Custom domain.**
16. **Flip `isPrelaunch` / `NEXT_PUBLIC_SITE_MODE=live`** and restore denser public nav when the site is no longer a single-purpose bio landing.

## What does **not** need doing

- Replicating admin auth, Cast, Ollama, Resend transactional, Supabase storage — admin concerns.
- Re-creating the L0 critic engine from scratch — copy from admin repo when needed.
- Overbuilding Product Lab / guide library polish on `/` before the IG waitlist converts.
