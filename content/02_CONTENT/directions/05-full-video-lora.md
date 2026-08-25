# Full video — Kiola LoRA on RTX PRO 6000

SleepAlb 01 (coma false-lead) as a **15-second 9:16** video, generated on the same class of box the job is on.

Do not start motion until the job is **COMPLETED** and `layoverhq/kiola` has the new weights. Stills we already designed are the look-lock, not the shoot.

---

## Job (do not skip)

| Field | Value |
|---|---|
| Account | `layoverhq` |
| Hardware | `rtx-pro-6000` (96 GB, Blackwell) |
| Job | `6a8737129cd058584adc4094` |
| Dataset | `layoverhq/kiola-dataset` |
| LoRA out | `layoverhq/kiola` |
| Monitor | Jobs **Monitor** tab, job id prefilled |

**Already on the Hub (older card, 2026-08-20):**

- Base shown: `krea/Krea-2-Turbo` (trained RAW → infer Turbo)
- Trigger: `brnzbear`
- Rank / alpha: 32 / 32
- Diffusers: `Krea2Pipeline` + `pipe.load_lora_weights("layoverhq/kiola")`
- Turbo sample recipe: **8 steps, guidance 0.0**

When this job finishes, re-read the model card. If the trigger, rank, or base changed, rewrite the prompt pack below. Do not assume `brnzbear` if the new README says otherwise.

Gate:

1. Job stage = `COMPLETED` (not `ERROR` / `CANCELED`).
2. `pytorch_lora_weights.safetensors` on `layoverhq/kiola` is newer than the job start.
3. Identity lock (below) passes on **8 stills** before any I2V.

---

## What the video is

Same spine as [`03-worked-stories.md`](./03-worked-stories.md). Same PT room as [`04-next-post-pt-model.md`](./04-next-post-pt-model.md).

| Time | Beat | On-screen type (overlay, not baked) | Picture |
|---|---|---|---|
| 0:00–0:03 | Hook | sleeping can put you in a coma | `brnzbear` asleep, almost too still |
| 0:03–0:06 | Screw | I slept 11 hours and I still felt gone | same bed, slower breathe |
| 0:06–0:08 | Unsell | that is not what this is | lamp lifts a stop; she is still a sleeper, not a patient |
| 0:08–0:11 | Mix-up | "out cold" is language | lamp glass sharp, sleeper soft |
| 0:11–0:15 | Tonight | the hours are not a spell | window a hair lighter; hold |

Unsell must land by **0:06**. Type is **edit overlay** (Source Serif, `#F4F2EC`). Do not generate the rumor into the pixels — a screenshot of a raw frame must not be able to travel as a fact.

9:16. 24 fps. 1080×1920 finish. Generate at 720×1280 if VRAM or time is tight; upscale last.

---

## Pipeline on the same GPU

```
job COMPLETED
    → identity lock stills   (Krea-2-Turbo + layoverhq/kiola)
    → 5 keyframes            (same seed family)
    → 5 I2V clips            (Wan 2.2 / LTX, 96 GB is not the limit)
    → edit                   (cuts + type + room tone)
    → pin stills             (frame grabs = PT cards 1–4)
```

The LoRA is **text-to-image**, not a video adapter. Motion comes from image-to-video pointed at *her* keyframes. Do not train a second LoRA for this post.

**Why RTX PRO 6000 is the right box:** 96 GB holds Turbo + LoRA + a 14B I2V at 720p without block-swap drama. Keep training and infer as two jobs so the trainer can exit clean.

---

## Identity lock (do this first)

Generate **8 stills**, 3:4, same seed `60001`–`60008`, LoRA scale **0.85–1.0**.

Lock prompt (keep this block on every still and keyframe):

```
brnzbear, one character only, anthropomorphic brown-furred bear,
large almond amber eyes when open, small black nose,
three tiny bright blue dots on each side of the muzzle,
heavy navy velvet robe with thin gold piping on lapels and cuffs,
photoreal cinematic 3D, dusk bedroom, tufted dark navy headboard,
linen duvet, wood nightstand, warm gold glass lamp, amber window,
deep navy atmosphere #0B1B3A, no other people, no logo, no text
```

Negative (keep):

```
human, photoreal human skin, second character, isometric dollhouse,
wellness pastel, hospital, medical cross, coma patient, IV, cartoon
rubber, extra limbs, unreadable type, watermark, wave logo
```

**Pass / fail**

- Same face and robe as `public/brand/hero/kiola-evening.png` (site Kiola), not a bronze statue, not a paperweight. The old widget samples drift metallic / carved — **this post forbids that drift.** Prompt `anthropomorphic` + robe every time.
- One lamp. One bed. No new set.
- If 3 of 8 stills lose the blue muzzle dots or the gold piping, drop LoRA scale to 0.8 or wait for a later checkpoint from the job (`checkpoint-1000` vs head).

Only then generate the five keyframes.

---

## Keyframes (Krea-2-Turbo + LoRA)

Turbo: 8 steps, `guidance_scale=0.0`, bf16, LoRA weight **0.9**. Size 1152×1440 (3:4) or 720×1280 if going straight to I2V.

| # | File | Camera | Add to the lock prompt |
|---|---|---|---|
| K1 | `k1_asleep.png` | Medium, bed + lamp + window | asleep, face half in the navy pillow, almost too still, eyes closed |
| K2 | `k2_gone.png` | Same angle, 5% closer | still asleep, duvet risen a breath, lamp unchanged |
| K3 | `k3_unsell.png` | Same, lamp one stop brighter | asleep, room readable, not a medical bed |
| K4 | `k4_lamp.png` | Tight on lamp glass, sleeper bokeh left | lamp is the only awake thing, ribbed gold glass |
| K5 | `k5_dawn.png` | Same room, window cooler / lighter | just before stir, not sitting up, not a new day costume |

Reuse **one seed** for K1–K3 and K5 so the cut does not change houses. K4 may be a tighter crop of K3 if the lamp is already good.

Python sketch (same box, after the job):

```python
import torch
from diffusers import Krea2Pipeline

pipe = Krea2Pipeline.from_pretrained(
    "krea/Krea-2-Turbo", torch_dtype=torch.bfloat16
).to("cuda")
pipe.load_lora_weights("layoverhq/kiola")

image = pipe(
    LOCK + ", asleep, face half in the navy pillow, almost too still",
    num_inference_steps=8,
    guidance_scale=0.0,
    width=720,
    height=1280,
).images[0]
```

If `Krea2Pipeline` is missing in the installed diffusers, use the musubi `krea2_generate_image.py` path from the Krea-2 card: Turbo Dit, 8 steps, CFG off, `--lora_weight layoverhq/kiola`, `--lora_multiplier 0.9`.

---

## Motion (I2V on the same GPU)

Five clips, then cut. 24 fps. 3–4 seconds each (we will trim).

| Clip | Start frame | Motion (prompt the I2V, not a new story) | Seconds kept |
|---|---|---|---|
| V1 | K1 | tiny chest breathe, lamp flicker sine, duvet 1–2 px | 0:00–0:03 |
| V2 | K2 | slower breathe, almost no head move | 0:03–0:06 |
| V3 | K3 | lamp lifts, fabric drift, still asleep | 0:06–0:08 |
| V4 | K4 | glass highlight crawl, sleeper stays soft | 0:08–0:11 |
| V5 | K5 | window cools a hair, no sit-up | 0:11–0:15 |

I2V prompt pattern:

```
slow cinematic breathe, lamp glow pulsing gently, linen micro-motion,
locked camera, no zoom, no cut, brnzbear stays asleep,
quiet dusk bedroom, photoreal 3D
```

Hard no: zoom-to-face horror, eyes snapping open on the hook, hospital morph, second character, text in the generation.

**Box settings (96 GB):** Wan 2.2 14B or LTX-Video at 720×1280, 49–81 frames, cfg low (3–5), motion scale low. Do not enable tea-cache tricks that smear the muzzle dots. If identity slips, I2V *less* (24 frames) and live on the still.

---

## Edit (this is the unsell)

1. Timeline: V1–V5 hard cuts or 6-frame dissolves. No music sting on the hook.
2. Type: Source Serif, lower third, `#F4F2EC`. Cover line only on V1. Unsell line at 0:06, not earlier.
3. Tiny Inter “not medical advice” from 0:11, never on the first frame.
4. Room tone + one lamp tick. No mattress-ad score.
5. End hold 8 frames on K5 + “the hours are not a spell.”
6. Export 1080×1920 H.264, 15.0s exactly.

Pin stills = 3:4 crops of K1, K3, K4, K5. Replace the designed art in `art/` only if identity is closer to site Kiola than the current stills.

---

## Caption (ships with the file)

Use the coma caption in [`03-worked-stories.md`](./03-worked-stories.md). It already unsells. Save CTA. Not medical advice. Do not put the hook in the first line of the caption — the first line of the *video* is the hook; the caption is the truth.

Pinterest: title = hook. Description first sentence = `Sleeping cannot put you in a coma.`

---

## QA before upload

- [ ] Job `6a8737129cd058584adc4094` completed; weights on `layoverhq/kiola` match that run
- [ ] Trigger confirmed from the new card
- [ ] 8 lock stills look like site Kiola, not a statue
- [ ] Hook has no “myth” / “false” stamp
- [ ] Unsell is spoken or typed by 0:06
- [ ] No baked rumor on a textless frame that could screenshot
- [ ] No medical set dressing
- [ ] Disclaimer on the end card only
- [ ] Cover is not posted as a single still

If the job errors, do not generate on the August 20 widget samples. Fix the job, then lock identity again.

---

## After this post

Retire the coma hook. Next video is red eyes, **same LoRA, same room, new beat** (morning face / pillow). Do not train a new adapter per post.
