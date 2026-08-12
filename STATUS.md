# Sleep Layers — Status & Owed Work

_Last updated: 2026-08-12 by the session that published this repo._

## What is live right now

Visit [https://mysleeplabs-web.vercel.app](https://mysleeplabs-web.vercel.app). All 24 routes render. No auth gate. Catch-all API at `/api/public` is stubbed (returns safe defaults, persists nothing).

Routes shipped:
- `/` (home)
- `/about`, `/editorial-method`, `/corrections`, `/corrections-log`, `/newsletter`
- `/medical-disclaimer`, `/affiliate-disclosure`, `/privacy-terms`
- `/search`
- `/seven-night-setup`
- `/start-here`, `/start-here/{family,busy-minds,restless,shift}`
- `/{family,busy-minds,restless,shift}` (persona landings)
- `/guides`, `/guides/[slug]`
- `/product-lab`, `/product-lab/[slug]`, `/product-lab/compare/[pair]`

API shipped (single endpoint):
- `POST /api/public?action=newsletter` — acknowledges subscribe, no persistence
- `POST /api/public?action=affiliate-click` — acknowledges click, no persistence
- `GET  /api/public?action=corrections` — returns `{ corrections: [] }`
- `GET  /api/public?action=newsletter-issues` — returns `{ issues: [] }`

Components shipped:
- `components/ui/` — 19 shadcn primitives (button, card, accordion, dialog, dropdown-menu, navigation-menu, sheet, command, input, label, badge, sonner, separator, select, skeleton, switch, textarea, tooltip, avatar)
- `components/public/` — 11 components: PublicNav, PublicFooter, SearchTrigger, SiteSearch, NewsletterForm, AudienceLandingPage, AudiencePathTemplate, ProductLabIndex, TrackedAffiliateLink, PolicyPage, SleepLayersWordmark

## Owed work (in priority order — pick from #1 first)

### Tier 1 — minimum viable consumer flow

These three items together turn this from "showcase" into "it transacts."

1. **`/buy` page for "The 7-Day Sleep Reset" PDF** ($9 → $19 after 10 sales, per `/Users/gm/mysleeplabs/04_PRODUCT/7-day-sleep-reset/pricing-funnel.md`).
   - Has the full PDF copy from `/Users/gm/mysleeplabs/04_PRODUCT/7-day-sleep-reset/copy-draft.md` (already known; not duplicated here).
   - Includes the sale UI: "What's inside" feature list, FAQ, disclaimer footer.
   - Plugs a checkout adapter at `/api/public?action=checkout-reset` that:
     - **Initially:** returns a mock success URL like `/buy/success?session=mock-abc123` and verifies no real payment provider is wired yet. The success page should print the order id and show "Download PDF" placeholder.
     - **Phase 2:** slot in `lib/stripe/checkout.ts` (not yet created) and `app/api/stripe/webhook/route.ts` (not yet created).
   - `STATUS` of this task: **next agent should do this first.**

2. **`/buy/success` and `/buy/cancel` pages** rendering the order confirmation (success) or a "no payment was taken" warm re-pitch (cancel).
   - README/spec: After a `checkout-reset` action returns a redirect URL, the customer is sent there by the action handler. The success page reads `?session=<id>` and calls `/api/public?action=order-status&id=<id>` to look up the order. For the stub, this returns `{ status: 'paid', productName: 'The 7-Day Sleep Reset' }`. Real Stripe webhook integration comes later.

3. **Newsletter form on `/` should persist.**
   - Option A (stub): `/api/public?action=newsletter` becomes `/api/public?action=newsletter` and the next agent adds a Vercel KV `subscribe` row + a `RESEND_API_KEY`-triggered welcome email via the existing `sendWelcomeEmail` shape.
   - Option B (real): the same as A but write to a hosted Drizzle/Turso DB. Lighter lift if you skip the admin repo entirely and just use Vercel KV.
   - Recommendation: Option A. Vercel KV is free-tier sufficient for the launch.

### Tier 2 — SEO & trust (before scaling traffic)

4. **Sitemap + robots.txt** via Next.js 15 conventions:
   - `app/sitemap.ts` — derives urls from `lib/guides/content.ts` (12) + `lib/products/content.ts` (6 + 3 comparisons) + the static 13 routes.
   - `app/robots.ts` — open-for-indexing.
   - Add `metadata` `alternates.canonical` to every page.

5. **JSON-LD structured data** on guide (`Article`), product (`Product`), and persona landing pages (`WebPage`).

6. **OG images** via `app/opengraph-image.tsx` for each page type. The Lab Notebook design tokens + isometric illustration placeholders are enough.

7. **Per-page metadata enrichment** with `twitter`, `verification` tags. The `layout.tsx` `metadata` is the seed; each `page.tsx` already exports its own `metadata`.

### Tier 3 — monetization phases

8. **Stripe Checkout integration.** Requires `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_IDS`. `lib/stripe/checkout.ts` reads `lib/products.ts` (extension of `lib/products/content.ts`) to map product slugs → Stripe Price IDs. `app/api/stripe/checkout/route.ts` and `app/api/stripe/webhook/route.ts`. Webhook handler writes to Drizzle/Turso; the preview repo does **not** have Drizzle yet, so add `lib/db/client.ts` and the relevant table schemas.

9. **Email delivery (Resend)** for transactional emails: order confirmation, weekly newsletter. `lib/email/templates/*.ts`. Render via `@react-email/components` or hand-written MJML.

10. **Affiliate linking** — currently `components/public/tracked-affiliate-link.tsx` exists but no retailer URLs are wired. Add `lib/affiliates/retailers.ts` keyed by product slug. Each retailer URL is fetched from the admin's `affiliate_clicks` table or hardcoded at first.

### Tier 4 — content & blog

11. **MDX-driven blog/cms.** The 12 carousels in `/Users/gm/mysleeplabs/02_CONTENT/carousels/` are the natural seed: convert them to long-form posts under `content/blog/<slug>.mdx`. `app/blog/[slug]/page.tsx` is the consumer page; uses `@next/mdx` + `remark-gfm`. Without this, the IG→web retention loop is incomplete.

12. **Comparison pages are static (`/product-lab/compare/[pair]`)** but the `comparePair` field on each product only references one or two others. Add a stable algorithm to derive pairs that maximizes user "I want to compare these" intent (Huckleberry-style).

### Tier 5 — observability & polish

13. **Privacy/consent banner** before any analytics. Vercel Analytics + cookie-less mode is acceptable; axe-core for accessibility.
14. **Lighthouse ≥ 90 perf / ≥ 95 a11y** on the home page and one guide + one product page.
15. **Custom domain**: `sleep.mysleeplabs.com` (or apex + subdomain). Requires `mysleeplabs-web.vercel.app` to be promoted.

## What does **not** need doing

- Replicating admin auth (NextAuth), Cast (image generation), Ollama, Resend transactional, Supabase storage — those are admin concerns.
- Re-creating the L0 critic engine from scratch — copy `/Users/gm/mysleeplabs-admin/scripts/critic-test.ts` + `lib/critic/engine.ts` and call it from this repo's `.claude/AGENTS.md` workflow.
