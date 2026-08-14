# Coming-soon inspiration research — MySleepLabs

_Research date: 2026-08-11. Goal: evolve [mysleeplabs.co](https://mysleeplabs.co) prelaunch with motion + conversion patterns that fit sleep / IG bio traffic._

## Filter (what “fit” means for us)

- One job: email waitlist  
- Mobile-first (Instagram bio)  
- Calm / premium (Loftie–Oura–Healthline), not neon SaaS  
- Motion with purpose (sleep, fabric, lamp) — no particle soup  
- Brand: navy `#0B1B3A`, sleep `#5B67E8`, gold `#F2B84B`

---

## Pool of 50 inspirations (scanned)

### Framer / template family (animated waitlist)

1. Orbit Launch — 3D scroll-reactive bg, email hero  
2. Sonna — sunrise shader, minimal hero + waitlist  
3. Vela Waitlist — multi-layout, avatar stack + counter  
4. WaitlistKit — light/dark, animated bg + image reveal  
5. Waity (Hue Supply) — simple waitlist + CMS FAQ + video  
6. Wait (Framer marketplace family) — early-access framing  
7. WaitlyStar — animated waitlist for creators  
8. Pre-Launch (Framer pack) — multiple email-collection variants  
9. Wuizt — signup-focused launch template  
10. Sooon — app-hardware subtle motion waitlist  

### Live product / brand waitlists & prelaunch

11. Arc Browser — sparse curiosity, bold visual, low copy  
12. Superlist — cursor-reactive + scroll reveals, CTA top  
13. Framer’s own prelaunch — page *is* the product demo  
14. Cron / Notion Calendar — interaction-as-proof in hero  
15. Beehiiv waitlist era — longer pitch when premium  
16. Linear early pages — quiet typography + one CTA  
17. Raycast early waitlist — power-user density, still one action  
18. Robinhood classic waitlist — clarity + referral engine  
19. Steam Deck — product video + wishlist CTA  
20. getZen Health — sleep-adjacent waitlist + counter  

### Sleep / wellness / lifestyle atmosphere

21. Loftie (byloftie.com) — bedroom realism, warm lamp, routine  
22. Oura — day-in-life sequencing, premium navy/beige  
23. Eight Sleep — scroll product storytelling (Product Lab later)  
24. Headspace — needs routing (ops ref, not visual)  
25. Bearaby — tactile product-in-home  
26. Huckleberry — family warmth + content (post-launch)  
27. Calm marketing surfaces — quiet full-bleed night  
28. Nesswell — wellness beta CTA + social proof  

### Motion / craft studios (ceiling for animation quality)

29. Lusion — award interactive 3D web  
30. Awwwards “Coming Soon / New Codes” — 3D + typography  
31. Why Zero origami waitlist — playful 3D form delight  
32. Godly.website waitlist features (e.g. Freedrw) — curated craft  
33. Codrops interactive experiments — technique library  

### Conversion-focused roundups (named patterns)

34. Before Sunset AI — Request Access everywhere + roadmap tease  
35. TakeProfit — extreme graphic + private beta CTA  
36. Superthread — interactive product demo then CTA  
37. Coco — funnel scroll, waitlist at end (avoid for IG)  
38. Lazy — illustration-dense + bottom waitlist  
39. Threads (workspace) — CTA → proof → CTA sandwich  
40. Tana — interactive hero + bottom early access  
41. Runway Financial — voice-led Request Access  
42. Relay — early-access above fold + explain below  
43. Manor DAO — mystery imagery + membership form  
44. Adored Vintage / Suta — VIP early-access popup framing  
45. Carrd minimal waitlists — one screen, zero chrome  

### Teaser / share formats (IG-adjacent)

46. PaneFlow coming-soon teaser — short pane sequence + email  
47. Kwami waitlist — fullscreen non-scroll, ambient 3D, email  
48. AIGC Plan waitlist (OSS) — particles/stars (anti-pattern for us)  
49. shadcn Hero Waitlist block — motion entry + form pattern  
50. Viral Loops / Waitlister catalog patterns — referral after signup  

---

## Best 10 (chosen for MySleepLabs)

| Rank | Inspiration | Steal | Do **not** steal |
|------|-------------|-------|------------------|
| 1 | **Arc** | Sparse curiosity; brand + visual dominate; almost no chrome | Ambiguous CTA wording |
| 2 | **Sonna** | One atmospheric motion system behind calm type + form | Loud WebGL for its own sake |
| 3 | **Kwami waitlist** | True one-viewport; ambient motion; email is the only job | Random 3D blob language |
| 4 | **WaitlistKit** | Image reveal as the hero moment + animated atmosphere | Multi-theme distraction |
| 5 | **Superlist** | Motion that proves craft (cursor/scroll-worthy, not spam) | Feature-section sprawl on IG bio |
| 6 | **Loftie** | Bedroom truth: lamp, linen, nightstand realism | Hard e-comm / doomscroll copy |
| 7 | **Vela** | Soft social proof (avatars/counter) without looking “under construction” | Fake inflated counters |
| 8 | **Waity** | Optional short teaser (loop) + dead-simple FAQ later | CMS bloat on day-one |
| 9 | **Linear / early Raycast calm** | Typography hierarchy; one gold CTA; quiet confidence | Dev-tool aesthetic |
| 10 | **Robinhood referral pattern** | Post-submit “share to move up” (after we persist waitlist) | Hype finance vibe |

### Synthesis thesis for MySleepLabs

> **Quiet night confidence:** one viewport, illustrated sleeper as the living hero, lamp-keyed atmosphere, brand lockup, one line of promise, email + Notify me. Motion = intro dissolve → illustration reveal → fabric water-drift → form settle. Share/proof only after signup is real.

---

## Implementation plan (phased)

### Phase A — now (motion + craft, no new infra)
1. **Image reveal** (WaitlistKit/Arc): clip-path or mask open on sleeper after intro  
2. **Stronger authored entrance** (Superlist/Sonna): lockup → scene → type → form stagger with blur→clear  
3. **Atmosphere** (Sonna/Kwami): soft sleep-wash drift + lamp pulse already present — tune so they read as one system  
4. **Post-submit delight** (Vela/Robinhood-lite): success state + “Share with a friend” (copy link / native share) without fake queue numbers  
5. **Mobile optical polish**: keep one viewport; reduce footer weight further if it causes scroll  

### Phase B — next (conversion)
6. Persist waitlist (KV) + welcome email  
7. Real proof only: “From Instagram” / follower count if true, or omit  
8. Optional 4–6s silent loop of sleeper (Waity) once we have a short clip  

### Phase C — unlock full site
9. Flip `PRELAUNCH` / `NEXT_PUBLIC_SITE_MODE=live`  
10. Borrow Eight Sleep motion only inside Product Lab  

---

## Anti-patterns (from the 50)

- Countdown timers without a real date  
- Fake “12,847 on the waitlist”  
- Multi-section SaaS landing on IG bio traffic  
- Particle / starfield / custom cursor fleets  
- Feature dumps before email  
