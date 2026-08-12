# AGENTS.md — Sleep Layers (consumer preview)

> Picked up this repo to keep working on the consumer section? Read this.
> **Read it end-to-end before running `npm install`.**

## TL;DR

You are continuing work on the **Sleep Layers public consumer site** at `/Users/gm/mysleeplabs-web/`. This is the **preview deployment** of the consumer section — a separate Next.js 15 project from the admin back-office. **It is intentionally minimal: no auth, no Drizzle, no Resend, no Stripe.** Keep it that way unless the task you're picking up requires otherwise — and even then, prefer stubs over new infrastructure.

Live URL: **https://mysleeplabs-web.vercel.app**
Admin repo: `/Users/gm/mysleeplabs-admin/` — has the **same** content but with Drizzle/Resend/Stripe/Auth. Coordinate, don't merge.

---

## Required reading order

1. **`CONTRIBUTING.md`** — the seam contract. Has the priority list, the tool cheatsheet, and the rule "edit both repos."
2. **`STATUS.md`** — the live-state + owed-work list. Pick an item from **Tier 1**.
3. **`app/layout.tsx`** + **`app/globals.css`** — the design system. Do not modify the shadcn bridge section in globals.css unless you know what you're doing.
4. **`lib/guides/content.ts`** and **`lib/products/content.ts`** — data shape, contract for new types (additions should keep same shape).

---

## Workflow before any commit

```bash
cd /Users/gm/mysleeplabs-web
npx tsc --noEmit          # must be 0 errors
npm run build            # must complete, show 24+ routes
npm run dev              # if user-visible change, smoke at :3000
npx shadcn@latest add X  # when adding a primitive — never copy-paste
git add -p
git commit -m "feat(<surface>): <what> — refs #<issue>"
git push origin master   # Vercel auto-deploys
```

Treat pushes as deploys. Don't push without `npx tsc --noEmit` clean.

## After pushing — verify it shipped

```bash
curl -s "https://mysleeplabs-web.vercel.app/<new-path>" | head -100
```

If the curl shows an empty body or a Vercel 5xx, you broke something. Roll back with `vercel rollback <deployment-id>`.

---

## Things you can trust

- The shadcn primitives are at their current versions as of August 2026; `radix-ui` is installed as a unified package, not `@radix-ui/react-*`. Don't downgrade.
- `components.json` is committed and configured for `new-york` style. `npx shadcn@latest add <name>` will work without further setup.
- Vercel Authentication is **not enabled** on this project. You should never see `vercel.com/sso-api` redirects on this URL. If you do, something changed.
- The repo deploys on every push. There is no staging environment and no PR review. (Add them when the consumer side graduates out of "preview.")
- All routes are pre-rendered (`generateStaticParams`) except the API route. Static + dynamic aren't tangled.

## Things that will trip you

- **Drizzle is not installed** in this repo. Don't add `@/lib/db/client.ts` or `drizzle-orm` imports. If the admin repo has those, they're the source of truth there.
- **`next-themes` is not installed.** The Sonner toaster uses `theme="dark"` hardcoded because the Lab Notebook design is dark-only. Don't add a theme switcher.
- **`react-hook-form` is not installed.** Forms are plain `useState` + a `<form>` tag. Keep it that way until an actual form-validation problem appears.
- **No analytics, no error monitoring.** Stub those, or use Vercel's built-in Analytics only — anything heavier is overkill at the preview stage.
- **`outputFileTracingRoot` is unset on purpose.** The admin repo has a parent-directory lockfile (`/Users/gm/pnpm-lock.yaml`) that triggered a Next.js workspace-root warning there. This repo doesn't have that issue. **Do not add `outputFileTracingRoot`** unless you find a lockfile conflict — adding it when not needed breaks the build (`path.join(import.meta.dirname, "..")` resolves to a directory Vercel can't traverse).

## Stakeholders and owners

| Concern | Owner |
|---|---|
| Brand voice / Lab Notebook design tokens | The MySleepLabs admin (do not edit without coordination) |
| Content accuracy (guide/prod copy) | Marketing content lives in `/Users/gm/mysleeplabs/`; sync via `npm run content:pull` in the admin repo |
| Payments | Stripe webhook side will live here once Tier 3 lands; webhook secret is a Vercel env var |
| Email | Resend for transactional + newsletter; API key is a Vercel env var |
| Database | None on the preview. Tier 3 will add Drizzle + Turso once Tier 1+2 are stable |

## When you're not sure

1. Check `STATUS.md` for whether the item is owed.
2. Check `CONTRIBUTING.md` for how to do it.
3. Check the **admin repo** at `/Users/gm/mysleeplabs-admin/` for the same file — the canonical implementation lives there. Read both before editing.

If a piece of work is owed but unclear, prefer **stubs over infrastructure**. The next agent prefers stubs; the agent after that prefers stubs. The version after *that* can integrate Stripe.
