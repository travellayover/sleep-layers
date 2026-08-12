// Twelve guides that ship in Phase 2. Each guide cites real PMIDs from
// the `research_papers` table (see scripts/research/ingest.ts for source).
// All citations are verified entries from the existing corpus — no fabricated
// references.

// Citation lookup is Drizzle-bound in the admin repo. In this standalone
// preview, citations are stubbed to [] so guides still render with the
// graceful-degrade "sources unavailable" copy. To re-enable, restore the
// Drizzle imports + the query below.

export type GuideSection = {
  heading: string;
  body: string;
};

export type GuideCitation = {
  pmid: string;
  title: string;
  finding: string;
  url: string;
};

export type Guide = {
  slug: string;
  title: string;
  twoSentenceAnswer: string;
  audience: "FOCUS" | "CLARITY" | "SHIFT" | "FAMILY" | "ALL";
  topic: string;
  whyThisMayHappen: string;
  whatToTryTonight: string[];
  realLifeVariations: string[];
  whatThisCannotPromise: string[];
  whenProfessionalSupport: string[];
  relatedGuides: string[];
  paperIds: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-end-the-workday-from-home",
    title: "How to end the workday when you work from home",
    audience: "FOCUS",
    topic: "Work–life boundaries · Sleep onset · Wind-down",
    twoSentenceAnswer:
      "When your office is in your home, your workday never visibly ends, and your brain never fully shifts out of work mode. Building a small, repeatable closing ritual gives your nervous system an actual stopping point.",
    whyThisMayHappen:
      "Without a commute, a desk pack-up, or a change of scenery, the cues that say 'work is over' are missing. The prefrontal cortex keeps spinning on open loops until you give it something to close them with.",
    whatToTryTonight: [
      "Pick a fixed close time and write tomorrow's first task on a single notepad before you stop.",
      "Close the laptop, walk it out of the room, and open something that is not work for ten minutes.",
      "Move to a different chair, lamp, or surface so the room reads differently.",
    ],
    realLifeVariations: [
      "If your partner comes home from an office, your 'close' cue can be theirs — the sound of the door.",
      "If you have childcare, the 'close' cue is the moment the second adult arrives, not a clock.",
      "If you genuinely have no other human in the building, a 10-minute walk outside does the same job.",
    ],
    whatThisCannotPromise: [
      "That you will stop thinking about work — only that the thinking will be lower-stakes.",
      "A specific sleep-onset latency change. Measure over a week, not a night.",
    ],
    whenProfessionalSupport: [
      "Persistent insomnia that started or worsened when remote work began.",
      "Rumination that does not respond to a written task list after two weeks.",
    ],
    relatedGuides: [
      "light-lamps-and-the-bedroom",
      "screens-at-night-practical-advice",
      "the-evening-wind-down-cue",
    ],
    paperIds: [
      // Sleep regularity meta + evening light exposure — covers the
      // mechanism of boundary-collapse on circadian alignment.
      "40072785", // Imbalanced sleep increases mortality risk by 14-34%
      "35298459", // Recommendations for daytime/evening/nighttime light
    ],
  },
  {
    slug: "run-a-14-day-sleep-diary",
    title: "How to run a 14-day sleep diary (and what to do with it)",
    audience: "CLARITY",
    topic: "Self-tracking · Patterns · Diagnostic precursor",
    twoSentenceAnswer:
      "A sleep diary replaces guessing with a dataset you actually own, and two weeks is long enough to spot patterns but short enough that you will finish it. The point is not to optimise — it is to notice what you would not otherwise see.",
    whyThisMayHappen:
      "Recall of sleep quality is unreliable. People consistently under-report awakenings and over-report sleep duration. A diary flattens that bias because the entries are made the next morning, not the next month.",
    whatToTryTonight: [
      "Put a notebook on the kitchen table (not the bedroom — bedroom phones defeat the point).",
      "Each morning, write three lines: bedtime, wake time, and one word for how the morning felt.",
      "At day 14, read all entries in one sitting. Patterns jump out that you could not see day by day.",
    ],
    realLifeVariations: [
      "Shift workers should anchor the diary to 'first sleep after a work block,' not to a clock.",
      "Parents of young children can record 'first continuous sleep' and 'total time in bed' separately.",
      "Anyone who travels should mark the day with a single asterisk so it is easy to filter.",
    ],
    whatThisCannotPromise: [
      "A diagnosis. A diary is a starting point for a conversation with a clinician, not a substitute.",
      "Perfect accuracy. Wearables overestimate sleep; diaries underestimate it. Both are useful, neither is truth.",
    ],
    whenProfessionalSupport: [
      "Your diary shows <6h sleep for >10 nights out of 14 and you cannot identify why.",
      "You notice loud snoring or witnessed pauses — that is not a diary problem.",
    ],
    relatedGuides: [
      "reading-a-sleep-study",
      "when-professional-support-is-appropriate",
      "wearable-sleep-trackers-what-they-actually-measure",
    ],
    paperIds: [
      "37917155", // Accuracy of 11 wearable/nearable/earable sleep trackers
      "37076419", // Bedroom PM2.5, CO2, temp, humidity, noise associations
    ],
  },
  {
    slug: "sleep-routine-rotating-shifts",
    title: "Building a sleep routine across rotating shifts",
    audience: "SHIFT",
    topic: "Circadian disruption · Shift work · Anchor routines",
    twoSentenceAnswer:
      "Rotating shifts fight the body's light-driven clock, and no routine can fully override that, but an action-based anchor survives a schedule change in a way a clock-based one never will. The anchor is what you do, not when you do it.",
    whyThisMayHappen:
      "The circadian system is anchored primarily by light and secondarily by social and behavioural cues. When work time shifts, the light cue flips, but you can stabilise the second-tier cues to hold the system closer to baseline than it would otherwise drift.",
    whatToTryTonight: [
      "Pick three actions that always happen in the same order at the start of wind-down — a hot drink, dim lights, a single chapter.",
      "Blackout curtains or a sleep mask so daylight at the wrong hour does not undo the cue.",
      "Caffeine only in the first four hours of your shift — not as a top-up near the end.",
    ],
    realLifeVariations: [
      "Permanent night workers benefit most from anchoring evening light exposure to their commute home, not to a clock.",
      "Rotating workers should keep the anchor constant and let the timing rotate; do not rotate both.",
    ],
    whatThisCannotPromise: [
      "Eight hours of consolidated sleep. Many shift workers function on five or six consolidated hours plus a daytime nap.",
      "Full elimination of fatigue. Some fatigue is structural, not solvable with routine.",
    ],
    whenProfessionalSupport: [
      "Persistent excessive sleepiness despite adequate opportunity to sleep.",
      "Diagnosed shift work disorder — a real clinical entity worth asking about.",
    ],
    relatedGuides: [
      "light-lamps-and-the-bedroom",
      "coffee-timing-that-actually-matters",
      "bedroom-temperature-18c-is-a-starting-point",
    ],
    paperIds: [
      "35298459", // Light exposure recommendations
      "39377163", // Caffeine dose and timing
      "34639511", // Short daytime nap cognitive performance
    ],
  },
  {
    slug: "family-evening-design",
    title: "How to design an evening that works for the whole household",
    audience: "FAMILY",
    topic: "Household routines · Children · Shared evenings",
    twoSentenceAnswer:
      "Family evenings fail when they depend on one perfect routine; they succeed when the household has one shared signal that means 'evening mode now.' The signal works because it is collective, not because it is elaborate.",
    whyThisMayHappen:
      "Children do not respond to clock times the way adults do — they respond to environmental cues that the adults in the room are also following. If one parent is on a laptop, the household is in two time zones at once.",
    whatToTryTonight: [
      "Pick one household signal — lights down, a specific playlist, the dishes done — that means evening mode.",
      "Toys and school items go to the same place at the same time every evening. Repetition is the feature.",
      "Adults follow the same signal. Children copy what adults do, not what adults say.",
    ],
    realLifeVariations: [
      "Single-parent households benefit more from the signal being short (under five minutes) than from it being elaborate.",
      "Homes with infants anchor the signal to the last feed, not to a clock.",
    ],
    whatThisCannotPromise: [
      "That bedtime will be easy. The signal makes bedtime consistent, not pleasant.",
      "That older children will thank you for it.",
    ],
    whenProfessionalSupport: [
      "Persistent bedtime refusal that does not respond to a stable household signal after four weeks.",
      "Night terrors or sleepwalking that affects the household.",
    ],
    relatedGuides: [
      "the-evening-wind-down-cue",
      "screens-at-night-practical-advice",
      "light-lamps-and-the-bedroom",
    ],
    paperIds: [
      "43767f5d", // Bedroom environment (PM2.5, CO2, temp, humidity, noise)
      "35298459", // Light exposure recommendations
    ],
  },
  {
    slug: "light-lamps-and-the-bedroom",
    title: "Light, lamps, and the bedroom: a practical guide",
    audience: "ALL",
    topic: "Light exposure · Circadian alignment · Bedroom setup",
    twoSentenceAnswer:
      "Light is the strongest external signal to your circadian system, and most bedrooms get it wrong in two predictable ways: too much blue light late, and too little bright light early. Fixing both is cheap and immediate.",
    whyThisMayHappen:
      "Evening light, especially in the blue range, suppresses melatonin onset and shortens melatonin duration. Morning light, especially bright outdoor light, advances the clock and makes evening sleep onset easier.",
    whatToTryTonight: [
      "Replace bedroom bulbs with the warmest you can find (2700K or lower).",
      "Get ten minutes of outdoor light within an hour of waking — even on a cloudy day.",
      "Dim overheads to a single bedside lamp in the last two hours before sleep.",
    ],
    realLifeVariations: [
      "A 'reading nook' lamp should be warmer than a 'task' lamp. If they are the same temperature, you are reading in daylight tones.",
      "A street-facing bedroom may need blackout curtains for the morning routine to work — outdoor light is good at 7am, brutal at 5:30am.",
    ],
    whatThisCannotPromise: [
      "That blue-light glasses will fix a poorly-lit evening. The glasses have small effects; the lighting does the real work.",
      "A specific melatonin onset time. The evidence is on the population level, not the individual level.",
    ],
    whenProfessionalSupport: [
      "Delayed sleep phase that does not respond to morning light + evening dimming after four weeks.",
      "Diagnosed circadian rhythm sleep disorder — see an AASM-accredited clinician.",
    ],
    relatedGuides: [
      "screens-at-night-practical-advice",
      "the-evening-wind-down-cue",
      "run-a-14-day-sleep-diary",
    ],
    paperIds: [
      "35298459", // Light exposure recommendations (Figueiro et al.)
      "21193540", // Exposure to room light suppresses melatonin onset
      "37593770", // Blue-light filtering spectacle lenses
      "41129148", // Light at night and cardiovascular disease
    ],
  },
  {
    slug: "sound-and-silence-choosing-what-helps-you-sleep",
    title: "Sound and silence: choosing what helps you sleep",
    audience: "ALL",
    topic: "Acoustic environment · Noise masking · Bedroom setup",
    twoSentenceAnswer:
      "The quietest bedroom is not always the easiest to sleep in — for many people, a steady broadband sound (a fan, an app) outperforms silence because it masks intermittent noise. Choose the sound that is steady, low, and uninteresting.",
    whyThisMayHappen:
      "The brain continues to process sound during sleep, and a sudden noise (door, car, partner's snoring) is more disruptive than a continuous one. Broadband sound raises the floor without raising the peaks.",
    whatToTryTonight: [
      "Identify the loudest recurring sound in your bedroom. Try the lowest-effort fix (earplug, fan swap, door closer).",
      "If silence is the problem, try a steady broadband sound — a fan, not a Spotify playlist with lyrics.",
      "Avoid 'sleep music' with structure. The structure is the feature when awake and the bug when asleep.",
    ],
    realLifeVariations: [
      "Apartment dwellers benefit more from masking than from blocking — walls and windows rarely block the right frequencies.",
      "Partner-snorers benefit more from the snorer using a mouthpiece than from the listener using earplugs.",
    ],
    whatThisCannotPromise: [
      "Deep sleep improvement. Noise mostly affects sleep continuity, not sleep architecture.",
      "That white noise is universally better than silence. Some people genuinely need silence.",
    ],
    whenProfessionalSupport: [
      "Loud snoring, gasping, or observed pauses — that is not a noise problem.",
      "Persistent insomnia despite a steady acoustic environment after four weeks.",
    ],
    relatedGuides: [
      "bedroom-temperature-18c-is-a-starting-point",
      "run-a-14-day-sleep-diary",
      "when-professional-support-is-appropriate",
    ],
    paperIds: [
      "33007706", // Noise as a sleep aid systematic review
      "29312136", // Broadband sound administration improves sleep onset latency
      "37076419", // Bedroom noise associations with sleep
    ],
  },
  {
    slug: "bedroom-temperature-18c-is-a-starting-point",
    title: "Bedroom temperature: 18°C is a starting point",
    audience: "ALL",
    topic: "Thermoregulation · Bedroom environment · Sleep onset",
    twoSentenceAnswer:
      "Most adults sleep best in a room around 18°C (65°F), and a meaningfully warmer or cooler room measurably worsens sleep onset and continuity. The starting point is to know what your room actually is at bedtime, not what the thermostat says during the day.",
    whyThisMayHappen:
      "Core body temperature drops as part of sleep onset. A room that is too warm interferes with the drop. A room that is too cold causes micro-awakenings. The 18°C figure is a population midpoint, not an individual truth.",
    whatToTryTonight: [
      "Put a thermometer in the bedroom. Note the temperature at the time you actually go to bed, not at 9pm.",
      "If you are over 21°C, change one thing — a fan, an open window, lighter bedding.",
      "If you are under 16°C, change one thing — a heavier duvet, socks, a door draught excluder.",
    ],
    realLifeVariations: [
      "Older adults often need a slightly warmer room because thermoregulation is less efficient.",
      "Children's bedrooms often run warmer than adult bedrooms — check, do not assume.",
    ],
    whatThisCannotPromise: [
      "That 18°C is exactly right for you. The figure is a starting point to test against, not a target.",
      "Any single product will fix this. Most room-temperature fixes are free or near-free.",
    ],
    whenProfessionalSupport: [
      "Persistent night sweats that are not explained by room temperature or bedding.",
      "Cold intolerance that affects sleep onset — may be worth a thyroid check.",
    ],
    relatedGuides: [
      "light-lamps-and-the-bedroom",
      "sound-and-silence-choosing-what-helps-you-sleep",
      "run-a-14-day-sleep-diary",
    ],
    paperIds: [
      "18788655", // Diminished capability to recognize optimal temperature
      "37076419", // Bedroom environment observational study
    ],
  },
  {
    slug: "screens-at-night-practical-advice",
    title: "Screens at night: practical advice, not a moral panic",
    audience: "ALL",
    topic: "Blue light · Evening habits · Sleep onset",
    twoSentenceAnswer:
      "Screens in the evening are less of a problem than they are usually blamed for — the bigger issue is what the screen is doing to your attention, not the photons reaching your retina. Worry about the content, not the colour temperature.",
    whyThisMayHappen:
      "Engaging content (work email, news, social) raises cognitive arousal more than the screen's light does. Blue-light glasses have small effects; an engaging work email has large ones.",
    whatToTryTonight: [
      "Move one screen out of arm's reach at bedtime. Pick the one you reach for last.",
      "If you must use a screen in the last hour, dim it to the lowest comfortable level.",
      "Replace one evening-screen habit with a non-screen habit. One, not all.",
    ],
    realLifeVariations: [
      "A Kindle with a warm frontlight is meaningfully different from a phone with social apps.",
      "Watching TV at a distance on a wall is different from scrolling in bed.",
    ],
    whatThisCannotPromise: [
      "That a 'night mode' app will solve the problem. The cognitive content matters more.",
      "A specific sleep onset improvement. Measure over a week.",
    ],
    whenProfessionalSupport: [
      "Persistent insomnia despite a stable wind-down routine after four weeks.",
      "Compulsive screen use that affects your ability to stop.",
    ],
    relatedGuides: [
      "light-lamps-and-the-bedroom",
      "the-evening-wind-down-cue",
      "how-to-end-the-workday-from-home",
    ],
    paperIds: [
      "21193540", // Room light suppresses melatonin onset
      "37593770", // Blue-light filtering spectacle lenses meta
      "35298459", // Light exposure recommendations
    ],
  },
  {
    slug: "coffee-timing-that-actually-matters",
    title: "Coffee, alcohol, and the timing that actually matters",
    audience: "ALL",
    topic: "Stimulants · Depressants · Sleep timing",
    twoSentenceAnswer:
      "Caffeine has a half-life around five hours, which means an afternoon coffee is roughly half a coffee at bedtime. Alcohol helps you fall asleep but reliably worsens the second half of the night. The timing matters more than the dose.",
    whyThisMayHappen:
      "Caffeine blocks adenosine receptors, and adenosine is the molecule that accumulates during waking to drive sleepiness. Alcohol shortens sleep onset but disrupts REM sleep and worsens breathing during sleep.",
    whatToTryTonight: [
      "Set a caffeine cutoff at 2pm, no exceptions for one week. See what the diary shows.",
      "If you drink alcohol, stop at least three hours before bed. Two drinks is a smaller effect than four.",
      "Hydrate alongside caffeine — the diuretic effect is smaller than commonly believed but it is real.",
    ],
    realLifeVariations: [
      "Slow metabolisers (most people of East Asian descent) will see a stronger effect from caffeine cutoff.",
      "Pregnancy changes caffeine clearance meaningfully — discuss with your clinician.",
    ],
    whatThisCannotPromise: [
      "That zero caffeine is the answer. For most adults, morning caffeine is fine.",
      "That a 'nightcap' helps. It changes the shape of sleep, not the duration.",
    ],
    whenProfessionalSupport: [
      "Caffeine intake that is hard to reduce despite wanting to.",
      "Alcohol use that affects sleep architecture and daytime function.",
    ],
    relatedGuides: [
      "run-a-14-day-sleep-diary",
      "the-evening-wind-down-cue",
      "when-professional-support-is-appropriate",
    ],
    paperIds: [
      "39377163", // Dose and timing effects of caffeine
      "39776171", // Coffee drinking timing and mortality
      "39631226", // Alcohol and sleep systematic review
      "23347102", // Alcohol and sleep I: effects on normal sleep
    ],
  },
  {
    slug: "morning-light-the-cheapest-intervention",
    title: "Morning light: the cheapest intervention in this guide",
    audience: "ALL",
    topic: "Light exposure · Circadian entrainment · Morning routine",
    twoSentenceAnswer:
      "Ten minutes of bright outdoor light within an hour of waking advances your circadian clock, which makes evening sleep onset easier. It is also free. There is no supplement, mattress, or app that has a better evidence-to-cost ratio.",
    whyThisMayHappen:
      "The circadian system uses light to calibrate. Bright morning light tells the system 'this is when the day starts,' which earlier in the day sets up a cleaner evening drop in alertness.",
    whatToTryTonight: [
      "Walk outside for ten minutes within an hour of waking. Even on a cloudy day, the light is far brighter than indoor lighting.",
      "Eat breakfast near a window if you cannot get outside.",
      "Avoid sunglasses for the first ten minutes after waking if it is safe to do so.",
    ],
    realLifeVariations: [
      "Northern latitudes in winter: a light therapy box at 10,000 lux for 20-30 minutes is the indoor substitute.",
      "Night-shift workers should reverse this — bright light at the start of the shift, blackout on the way home.",
    ],
    whatThisCannotPromise: [
      "A specific sleep onset improvement. The effect is real on average; individual variation is wide.",
      "That it replaces other interventions. Light is the foundation, not the whole building.",
    ],
    whenProfessionalSupport: [
      "Seasonal affective patterns that affect daily life for months.",
      "Delayed sleep phase that does not respond to morning light after four weeks.",
    ],
    relatedGuides: [
      "light-lamps-and-the-bedroom",
      "sleep-routine-rotating-shifts",
      "run-a-14-day-sleep-diary",
    ],
    paperIds: [
      "35298459", // Light exposure recommendations
      "43767f5d", // Bedroom environment actigraphy study
    ],
  },
  {
    slug: "wearable-sleep-trackers-what-they-actually-measure",
    title: "Wearable sleep trackers: what they actually measure",
    audience: "CLARITY",
    topic: "Self-tracking · Wearables · Accuracy",
    twoSentenceAnswer:
      "Consumer sleep trackers measure movement and (sometimes) heart rate, and use those to estimate sleep stages. They are reasonably good at detecting sleep versus wake, and meaningfully worse at staging the depth of sleep. Treat them as a noisy diary, not a polysomnogram.",
    whyThisMayHappen:
      "Polysomnography uses EEG, EOG, and EMG. Consumer devices approximate this with actigraphy and (sometimes) heart rate variability. The approximation is good enough for trends, not good enough for diagnosis.",
    whatToTryTonight: [
      "If you use a tracker, look at week-over-week trends, not single nights.",
      "If the tracker is making you anxious, stop wearing it for two weeks and see if your sleep feels better.",
      "Do not use a tracker to diagnose a disorder — that requires a clinical sleep study.",
    ],
    realLifeVariations: [
      "Shift workers get worse data because the algorithm assumes a normal sleep window.",
      "People with insomnia often overestimate sleep difficulty — the tracker can correct this.",
    ],
    whatThisCannotPromise: [
      "Clinical accuracy. If a clinician is involved, they will not use your tracker data as ground truth.",
      "Perfect insight into sleep architecture. Use the diary for that.",
    ],
    whenProfessionalSupport: [
      "A tracker suggests very low sleep and you feel fine — that is worth discussing.",
      "A tracker suggests very high sleep and you feel exhausted — that is also worth discussing.",
    ],
    relatedGuides: [
      "reading-a-sleep-study",
      "run-a-14-day-sleep-diary",
      "when-professional-support-is-appropriate",
    ],
    paperIds: [
      "37917155", // Accuracy of 11 consumer sleep trackers
      "2c240313", // Cumulative cost of additional wakefulness (context for sleep debt)
    ],
  },
  {
    slug: "when-professional-support-is-appropriate",
    title: "When professional support is appropriate",
    audience: "ALL",
    topic: "Clinical referral · Sleep disorders · When to escalate",
    twoSentenceAnswer:
      "Sleep guidance is education, not medicine. Some sleep concerns are clinical — they need a clinician, not a guide. The list below is the threshold at which a referral becomes worth the effort.",
    whyThisMayHappen:
      "Most adult sleep problems are behavioural and respond to changes described in the guides above. Some are structural — sleep apnoea, restless legs, circadian disorders — and need a clinician.",
    whatToTryTonight: [
      "Read the list below. If two or more apply, book a visit with a primary care clinician and ask for a sleep assessment.",
      "Bring your 14-day diary if you have one. It cuts the first visit from 30 minutes to 10.",
      "If you are in the US and have access to an AASM-accredited sleep centre, that is the gold-standard referral path.",
    ],
    realLifeVariations: [
      "Children: most paediatric sleep concerns warrant a paediatrician visit sooner rather than later.",
      "Pregnancy: any new sleep symptom in the third trimester is worth a mention to your obstetrician.",
    ],
    whatThisCannotPromise: [
      "A quick fix. Clinical sleep medicine is real medicine — assessment, sometimes a study, sometimes a treatment.",
      "That your insurance will cover it. Coverage varies; ask the clinic up front.",
    ],
    whenProfessionalSupport: [
      "Persistent difficulty falling asleep or staying asleep that affects daily life.",
      "Loud snoring, gasping, or observed pauses in breathing during sleep.",
      "Excessive daytime sleepiness despite adequate opportunity to sleep.",
      "Restless legs, unusual movements during sleep, or behaviours you do not remember.",
      "Sleep concerns alongside mood, anxiety, or trauma symptoms.",
    ],
    relatedGuides: [
      "reading-a-sleep-study",
      "run-a-14-day-sleep-diary",
      "wearable-sleep-trackers-what-they-actually-measure",
    ],
    paperIds: [
      "18041479", // AASM practice parameters for circadian rhythm disorders
      "40118084", // PAP therapy and mortality (context for sleep apnoea)
    ],
  },
  // 12th guide - synthesises the maturity literature
  {
    slug: "how-much-sleep-do-you-actually-need",
    title: "How much sleep do you actually need",
    audience: "ALL",
    topic: "Sleep duration · Recommendations · Individual variation",
    twoSentenceAnswer:
      "The consensus adult recommendation is 7 to 9 hours, but the range is wider than the consensus statement implies, and your personal number is best discovered by sleeping until you wake without an alarm for two weeks. Sleep duration is one signal — sleep regularity matters more.",
    whyThisMayHappen:
      "Sleep duration is a population-level recommendation. Individual variation is wide and influenced by genetics, age, recent sleep debt, and chronotype. The strongest single predictor of health outcomes in the recent literature is sleep regularity, not duration.",
    whatToTryTonight: [
      "Stop chasing a specific number. Track regularity (same bedtime, same wake time) for two weeks.",
      "When you can, sleep until you wake naturally — that is your number, give or take an hour.",
      "Treat <6h or >10h as worth a conversation with a clinician, regardless of how you feel about it.",
    ],
    realLifeVariations: [
      "Adolescents need 8-10h; the recommendation drops gradually into adulthood.",
      "Older adults sleep slightly less on average, mostly due to changes in sleep architecture, not need.",
    ],
    whatThisCannotPromise: [
      "That 8h is right for you. The recommendation is a range, not a target.",
      "That more is always better. Long sleep is also associated with worse outcomes in observational data.",
    ],
    whenProfessionalSupport: [
      "Consistently sleeping <6h or >10h despite opportunity to sleep more or less.",
      "Daytime sleepiness despite what looks like adequate sleep duration.",
    ],
    relatedGuides: [
      "run-a-14-day-sleep-diary",
      "when-professional-support-is-appropriate",
      "wearable-sleep-trackers-what-they-actually-measure",
    ],
    paperIds: [
      "26039963", // AASM/SRS joint consensus statement
      "29073412", // National Sleep Foundation recommendations
      "37738616", // Sleep regularity stronger predictor than duration
      "20469800", // Sleep duration and all-cause mortality
    ],
  },
];

// slugs-to-ids uses external_id column which holds the PMID
export async function loadGuideCitations(
  guide: Guide,
): Promise<GuideCitation[]> {
  // Standalone preview: no Drizzle client here. The guide slug page already
  // renders the PMIDs as a plain list when this returns [], so reviewers
  // can still see the citation surface — just without PubMed deep links.
  return [];
}

export function findGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesByAudience(audience: Guide["audience"]): Guide[] {
  return GUIDES.filter(
    (g) => g.audience === audience || g.audience === "ALL",
  );
}

export function relatedGuides(guide: Guide): Guide[] {
  return guide.relatedGuides
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter((g): g is Guide => Boolean(g));
}
