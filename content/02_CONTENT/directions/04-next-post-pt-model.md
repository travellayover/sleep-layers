# Next post + PT model (Pinterest)

**PT model** = the Pinterest illustrated-web grammar already locked in [`docs/pinterest-illustrated-web-plan.md`](../../../docs/pinterest-illustrated-web-plan.md).

One image earns the save. Text is a caption. The frame is a rounded card. The next pin is a **related scene**, not a new website.

**Next post** = SleepAlb 01, the coma false-lead. Story already written in [`03-worked-stories.md`](./03-worked-stories.md). This file is only how it looks and how the set is built.

Do not ship the cover pin alone. Related pins 2–4 are the unsell. The cover description must take the scare back.

---

## What we are making

| Asset | Ratio | Job |
|---|---|---|
| Cover pin | **4:5** (1000×1250) | Hook. Earn the tap / save. |
| Related pin 2 | 4:5 | Unsell. |
| Related pin 3 | 4:5 | Mix-up + real info. |
| Related pin 4 | 4:5 | Tonight + cannot promise. |
| Reel / Short | **9:16** (1080×1920) | Same four beats, timed. Crop from the 4:5 stills, do not redesign. |
| Debunk carousel | 4:5 × 9 | Optional after the Reel works. Slides already listed in the worked story. |

One evening. One room. One person (Kiola). Four cards that read as a board, not a brochure.

**Made stills** (3:4 stand-in for 4:5; 9:16 for the Reel cover):

| Card | File |
|---|---|
| 1 Cover | [`art/sleepalb-01-cover-coma.png`](./art/sleepalb-01-cover-coma.png) |
| 1 Reel cover | [`art/sleepalb-01-cover-coma-9x16.png`](./art/sleepalb-01-cover-coma-9x16.png) |
| 2 Unsell | [`art/sleepalb-01-unsell.png`](./art/sleepalb-01-unsell.png) |
| 3 Mix-up | [`art/sleepalb-01-mixup-lamp.png`](./art/sleepalb-01-mixup-lamp.png) |
| 4 Tonight | [`art/sleepalb-01-tonight-hours.png`](./art/sleepalb-01-tonight-hours.png) |

These are design stills, not a finished post. Pin description and Reel must still unsell. Do not run the cover alone.

---

## Copy lock (do not rewrite on the art)

| Card | On-image type (≤10 words) | Off-image (description / spoken) |
|---|---|---|
| 1 Cover | sleeping can put you in a coma | Sleeping cannot. Sleep is not a coma. Save the next pins. Not medical advice. |
| 2 Unsell | that is not what this is | Sleeping does not put you in a coma. Heavy sleep is still sleep. |
| 3 Mix-up | "out cold" is language | You can still be woken. Stages still run. A coma is a different state. |
| 4 Tonight | the hours are not a spell | Three lines in the morning for a week. This cannot promise a diagnosis. Not medical advice. |

Cover type is the rumor. No "myth:", no "wait for it", no smile in the type.

---

## PT design rules (from the live model)

Steal from Pinterest's own Home 3D, not from sleep-tips pins.

**Use**

- Photoreal linen, wood, lamp glass
- One subject, one action, one room
- Personality in motion (breath, lamp, fabric), not a mascot face
- Serif like a pin title; sans only for tiny UI / "not medical advice"
- Night navy field, gold used once (lamp), sleep indigo only as a thin wash
- 4:5 card, rounded ~20px if we ever put it on the site; on Pinterest the platform rounds it

**Do not use**

- Isometric dollhouse bedrooms, kawaii furniture, wellness pastel
- Checklist chrome on the cover
- Wave mark as a second brand on the pin
- "SleepAlb" wordmark on the public still
- Red medical-cross, hospital, or cartoon coma imagery
- A stamp that unsells the hook (`MYTH`, `FALSE`, `WAIT`)

Kiola is the same person as `/` (`kiola-evening.png`). Prelaunch site still uses the dusk-in-bed beat. This post uses **one new beat** from the already-planned sequence: work ending → lamp on → asleep. For the coma rumor, the beat is **asleep, almost too still** — lamp on, face turned away or half-lost in the pillow, room readable.

If we do not have a new still yet, crop the existing evening frame tighter on the sleeper + lamp. Do not invent a second character.

---

## Visual system for this post only

**Canvas**

- Pin: 1000×1250, safe type inside 88×110–912×1140
- Reel: 1080×1920, keep the 4:5 scene in the middle third; letterbox with `#0B1B3A`, do not stretch

**Palette (site tokens)**

| Token | Hex | Use on this post |
|---|---|---|
| Night | `#0B1B3A` | Field, letterbox, type plate if needed |
| Night raised | `#132456` | Soft grade behind the bed |
| Night fg | `#F4F2EC` | Cover type |
| Gold | `#F2B84B` | Lamp only. Not the headline. |
| Sleep | `#5B67E8` | Optional 8% wash, never a block |
| Paper | `#F7F4EE` | Cards 2–4 type plates if the still goes too dark to read |

**Type**

- Cover H1: Source Serif, medium, ~54–64pt at 4:5, tracking −2%, measure ≤12 words, **one line if it fits, two if not**
- Supporting (cards 2–4): same serif, one step smaller
- Disclaimer: Inter 11pt, 50% night-fg, bottom edge — only on cards 2 and 4, never on the cover
- No all-caps except a tiny board kicker if we need one (`MySleepLabs` is not the kicker; skip it)

**Composition (every card)**

```
┌──────────── 4:5 ────────────┐
│  night field                │
│     ┌──── room ────┐        │
│     │ lamp          │       │
│     │ Kiola + bed   │       │
│     │               │       │
│     └───────────────┘       │
│                             │
│  serif line (low third)     │
│  [disclaimer only 2 + 4]    │
└─────────────────────────────┘
```

Room is the pin. Type is the caption sitting on the night, not a sticker on her face.

Card 1: type in the lower third, over empty duvet / floor, not over the eyes.
Card 2: same crop, lamp a little brighter (the room is still a room).
Card 3: tighter on the lamp glass — the "imaginative twist" is just that the lamp is the only awake thing.
Card 4: morning-adjacent, same room, curtain a hair lighter. Not a new set.

**Motion (Reel only)**

1. Pin reveal (clip open), already how `/` treats Kiola  
2. Cover type holds 2.5s  
3. Cut or fade to card 2 with unsell  
4. Lamp pulse under cards 2–3 (sine, slow)  
5. Card 4 holds on the diary line  
Honor `prefers-reduced-motion` if this art ever lands on the site.

---

## Pinterest vs Instagram (same art, different law)

**Pinterest cover**

- Pin title = hook (`sleeping can put you in a coma`)
- Description **must** unsell in the first sentence: `Sleeping cannot put you in a coma. Sleep is not a coma.` Then mix-up + tonight + not medical advice.
- Link: waitlist `/` or nothing until launch. Do not link a scare to `/buy`.
- Board: educational sleep / evening, not "horror" or "medical."

**Instagram / TikTok / Shorts**

- First frame = cover type. No "myth" label.
- Unsell by 0:06 as in the worked story.
- Caption = the draft in `03-worked-stories.md` (already unsells, has Save).
- Do not post the cover still to the grid without a carousel that includes cards 2–4.

**If only one still gets made this week**

Make the cover. Write the unsell into every caption and every Pin description. Do not run paid on a single still.

---

## Shot / make list

1. One 4:5 master still: Kiola asleep, lamp on, dusk window, linen readable.  
2. Three grades from that master (darker cover, lamp-forward card 3, slightly lifted card 4).  
3. Type locked as four overlays. Export pin PNG + reel crop.  
4. Pin description pasted from the copy lock.  
5. Reel cut to the 15s spine.  
6. Retire this hook from the bank. Next week is red eyes, same PT model, new still beat (bathroom / pillow, not a new brand).

Out of scope: new site page, masonry board on `/`, isometric room, a second illustrated person, SleepAlb as a logo.

---

## Why this is the next post

The album's week-1 slot is the coma rumor. It is the cleanest PT object: one room, one still person, one sentence that should not be true. The Pinterest model already knows how to hold a room. The false-lead model already knows when to take the sentence back. Together they are one pin that earns a save and three related pins that spend it honestly.
