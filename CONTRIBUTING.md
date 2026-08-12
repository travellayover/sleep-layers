# Contributing to Sleep Layers (consumer preview)

> **Live URL:** [https://mysleeplabs-web.vercel.app](https://mysleeplabs-web.vercel.app)
> **Repo:** `/Users/gm/mysleeplabs-web/`
> **Vercel project:** `travellayovers-projects/mysleeplabs-web`
> **Branch:** `master` (commits auto-deploy to a preview URL)
> **Last verified deploy:** see `STATUS.md`

This is the **public consumer site**. It is a separate Next.js project from the admin (`/Users/gm/mysleeplabs-admin/`). It does not import admin code. It does not have authentication. It is a static-rendered public site with a tiny JSON-API catch-all.

---

## The seam contract

### What this repo owns (the public site)

- All `app/(public)/**/page.tsx` files (24 routes)
- `app/api/public/route.ts` — consumer-facing endpoints (`newsletter`, `affiliate-click`, `corrections`, `newsletter-issues`)
- `app/globals.css` — design system
- `app/layout.tsx` — root layout (shell of every page)
- `components/public/**` — public-side React components
- `components/ui/**` — shadcn primitives (do not hand-edit; re-run `shadcn add <name>` to refresh)
- `lib/guides/content.ts` — 12 guide records
- `lib/products/content.ts` — 6 product records
- `lib/ui/cn.ts`, `lib/utils.ts` — design-system helpers

### What this repo does **not** own

- Anything under `/Users/gm/mysleeplabs-admin/` (admin back-office) — leave that alone
- Authoring of carousels, broadcast drops, IG captions — those live in `/Users/gm/mysleeplabs/` (the marketing content source). After editing there, run `cd /Users/gm/mysleeplabs-admin && npm run content:pull` to sync, then read from there. **For this preview repo, guide and product copy lives in this repo's `lib/` — copy once on edit.**
- Authentication, RBAC, env vars for Resend/Supabase/Ollama — none of these exist here. If you add a feature that needs them, prefer stubs that return safe defaults, not Drizzle/Resend/NextAuth code.

### What "shipping a feature" looks like in this repo

1. **Pick a surface** from `STATUS.md` (the owed-work list).
2. **Edit only this repo** (`/Users/gm/mysleeplabs-web/`). Run `npm run build` locally before committing — `npx tsc --noEmit` is also useful.
3. **Commit** with a message that names the surface: `feat(buy): add /buy and /buy/success pages` etc.
4. **Push** to `master`. Vercel deploys automatically. No PR review, no CI gate — this repo is a preview surface.
5. **Smoke** the live URL with `curl` (the public preview URL has no auth gate). Each new route should return 200 against the deployed URL.

### Coordinate with the admin repo

The admin repo (`mysleeplabs-admin`) has its **own** copy of every `(public)` page and a **Drizzle-backed** version of `/api/public/route.ts`. Changes to the consumer section should land in **both** repos until/unless a single-source-of-truth is set up. Concretely:

| Edit | Where to apply |
|---|---|
| New shadcn primitive used in (public) | Both repos — add to `components/ui/` |
| New page under `app/(public)/` | Both repos — same path. Update `index.ts`/`page.tsx` file paths |
| Edit existing page under `app/(public)/` | Both repos — keep the byte-identical copy |
| Edit `/api/public/route.ts` action | Both repos — admin uses Drizzle+Resend, preview uses stubs |
| Edit `lib/guides/content.ts` | Both repos |
| Edit `lib/products/content.ts` | Both repos |

A future cleanup is to extract these to a shared package. **Do not do that as a side effect of a feature commit** — open an issue and ship the consolidation on its own PR.

---

## Tooling

| Tool | Why |
|---|---|
| `npx tsc --noEmit` | Type check (the repo has zero external tests) |
| `npm run build` | Verifies the 24 routes prerender |
| `npm run dev` | Local server at `:3000` |
| `npx shadcn@latest add <name>` | Add a UI primitive. The repo's `components.json` is pre-configured. |
| `bash scripts/ci.sh` | **Run all three CI gates locally** (typecheck + L0 negation harness + production build). Same script GitHub Actions uses in `.github/workflows/ci.yml`. |
| `vercel deploy --yes` | Deploy. By default targets preview. Use `--prod` to promote. |
| `vercel ls` | List recent deploys and their state (Ready / Error). |
| `vercel curl <url>` | Bypass Vercel deployment protection for testing. Note this repo does **not** have deployment protection enabled. |

The L0 critic engine itself lives in `lib/critic/engine.ts` (TS port, byte-parity mirror of `mysleeplabs-admin/content/10_CRITIC_SYSTEM/scripts/critic_engine.py`). The harness CLI lives at `scripts/critic-test.ts`. Run `npx tsx scripts/critic-test.ts --test-negation` for the 10-string audit. To run L0 against a folder of content, copy the python engine from the admin repo or run:

```bash
python3 /Users/gm/mysleeplabs-admin/content/10_CRITIC_SYSTEM/scripts/critic_engine.py \
    /path/to/markdown/dir
```

## Continuous integration

GitHub repo: **https://github.com/travellayover/sleep-layers** (public, master branch).

Every push and every PR to master runs `.github/workflows/ci.yml`. The workflow runs the same three gates as `scripts/ci.sh`:

1. `tsc --noEmit` — typecheck
2. L0 negation harness (10-string audit, expects `ALL PASS (10/10)`)
3. `npm run build` — production build, must complete and prerender ≥ 27 routes

If a CI run fails, the relevant run is `Latest: <commit-sha> failed @ <url>` in the run list:

```bash
gh run list --repo travellayover/sleep-layers --limit 5
gh run view <run-id> --repo travellayover/sleep-layers --log-failed
```

---

## Design system reference

Lab Notebook design tokens live in `app/globals.css` at the top `@theme` block. shadcn tokens (the `--background`, `--primary`, etc.) are bridged to the Lab Notebook ones in the same file, lower down. Do **not** redefine `--background` in raw pages — use the canonical shadcn classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.) or the legacy aliases (`text-navy` ⇒ `text-foreground`, `bg-paper` ⇒ `bg-card`).

This repo intentionally allows **either** set of utility classes. New code uses shadcn tokens; old code from the migrated Phase 2 site uses legacy aliases. Do not churn old code unless you're upgrading it anyway.

---

## What "ready" looks like for this consumer section

When **all** the items in `STATUS.md` under "owed work" are done, this repo graduates from "preview" to "v1". Until then, treat every CTA that says "Get" / "Buy" / "Subscribe" as a placeholder — it routes somewhere safe, but does not transact, persist, or notify.
