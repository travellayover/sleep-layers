// Product Lab catalog. Phase 2 ships with six entries covering the
// five categories documented in the operator's plan. Each entry has the
// full disclosure schema: what it is, problem addressed, who it may fit,
// specs, comfort/usability notes, limitations, price range, research
// status, affiliate disclosure, last-checked date.
//
// Pricing in USD ranges; "research status" matches the editorial labels
// from the Affiliate Disclosure page.

export type ResearchStatus =
  | "Desk researched"
  | "Specification checked"
  | "Editorial comparison"
  | "Not independently tested";

export type Category =
  | "Light"
  | "Sound"
  | "Temperature"
  | "Bedding"
  | "Tracker"
  | "App";

export type PriceRange = "<$50" | "$50–$150" | "$150–$400" | "$400+";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  useCase: string[];
  oneLine: string;
  whatItIs: string;
  problemAddressed: string;
  whoItMayFit: string[];
  specs: { label: string; value: string }[];
  comfortUsability: string[];
  limitations: string[];
  priceRange: PriceRange;
  affiliate: boolean;
  researchStatus: ResearchStatus;
  lastChecked: string; // ISO date
  comparePair?: string[]; // slugs of products to compare against
};

export const PRODUCTS: Product[] = [
  {
    slug: "hatch-restore-2",
    name: "Hatch Restore 2",
    category: "Light",
    useCase: ["Wind-down routine", "Sunrise alarm"],
    oneLine: "A bedside sunrise alarm with a programmable wind-down light.",
    whatItIs:
      "A bedside device with a warm LED panel, a sound library, and a phone-companion app that schedules wake and wind-down routines.",
    problemAddressed:
      "Replacing the morning phone alarm (and its blue-light jolt) with a gradual light cue, and replacing a forgotten wind-down with a programmed one.",
    whoItMayFit: [
      "Anyone who wants a phone-out-of-bedroom wind-down cue.",
      "Light sleepers whose morning alarm wakes a partner.",
      "Anyone whose schedule is stable enough that a fixed wake time makes sense.",
    ],
    specs: [
      { label: "Light temperature", value: "Warm to soft amber (no daylight tones)" },
      { label: "Sound library", value: "White, brown, pink noise plus nature sounds" },
      { label: "Connectivity", value: "Wi-Fi 2.4 GHz, app required for setup" },
      { label: "Power", value: "USB-C, 6 ft cable, no battery" },
    ],
    comfortUsability: [
      "Tap surface is simple — physical buttons on top for alarm off and light on.",
      "Companion app is required for the first setup but the device itself does not require the phone daily.",
    ],
    limitations: [
      "Does not measure sleep. Sunrise alarm is a wake cue, not a sleep tracker.",
      "Sound quality is functional, not high fidelity — fine for masking, not for music.",
      "Wi-Fi dependency means it is occasionally unavailable during router restarts.",
    ],
    priceRange: "$150–$400",
    affiliate: true,
    researchStatus: "Specification checked",
    lastChecked: "2026-08-08",
    comparePair: ["hatch-restore-2", "casper-glow"],
  },
  {
    slug: "casper-glow",
    name: "Casper Glow",
    category: "Light",
    useCase: ["Bedside reading light", "Nightlight"],
    oneLine: "A portable warm bedside lamp designed to be carried around the bedroom.",
    whatItIs:
      "A small, warm-tone LED lamp with a magnetic charging base. Designed to be picked up and carried — useful for reading or as a nightlight.",
    problemAddressed:
      "Replacing a bright overhead with a warm, contained light for the last hour before sleep, and providing a gentle nightlight for middle-of-night trips.",
    whoItMayFit: [
      "Anyone who reads in bed and wants a warm light that does not wake a partner.",
      "Older adults who want a portable nightlight.",
      "Anyone whose bedroom overhead is too bright at night.",
    ],
    specs: [
      { label: "Light temperature", value: "Warm, fixed (~2700K)" },
      { label: "Battery", value: "Built-in, charges on magnetic base" },
      { label: "Brightness", value: "Dimmable via gesture or button" },
    ],
    comfortUsability: [
      "Light weight, easy to pick up and carry without turning on overheads.",
      "No app required.",
    ],
    limitations: [
      "No sunrise alarm — purely a light source.",
      "No sound library.",
      "Price is high for a single-purpose device.",
    ],
    priceRange: "$150–$400",
    affiliate: true,
    researchStatus: "Desk researched",
    lastChecked: "2026-08-08",
    comparePair: ["casper-glow", "hatch-restore-2"],
  },
  {
    slug: "lectrofan-2",
    name: "LectroFan EVO",
    category: "Sound",
    useCase: ["Noise masking", "Partner-snorer"],
    oneLine: "A non-looping white/brown/pink noise machine with no app.",
    whatItIs:
      "A bedside sound machine that produces ten fan-based and ten noise-based tones, all digitally generated so they do not loop audibly.",
    problemAddressed:
      "Masking intermittent noise (street, partner, plumbing) with a steady broadband sound that the brain can tune out.",
    whoItMayFit: [
      "Anyone whose bedroom has intermittent noise.",
      "Light sleepers who find silence too quiet.",
      "Apartment dwellers where walls block less than windows.",
    ],
    specs: [
      { label: "Sounds", value: "10 fan + 10 noise tones, no loops" },
      { label: "Volume", value: "Precise digital, no clicks" },
      { label: "Power", value: "USB or AC, no battery" },
    ],
    comfortUsability: [
      "No app, no Wi-Fi — set it once.",
      "Volume is precise and click-free, important for light sleepers.",
    ],
    limitations: [
      "Not a Bluetooth speaker — it does not play your own audio.",
      "No light component.",
    ],
    priceRange: "<$50",
    affiliate: true,
    researchStatus: "Specification checked",
    lastChecked: "2026-08-08",
    comparePair: ["lectrofan-2", "yogasleep-dohm"],
  },
  {
    slug: "yogasleep-dohm",
    name: "YogaSleep Dohm",
    category: "Sound",
    useCase: ["Noise masking", "All-night steady sound"],
    oneLine: "A mechanical fan-based white noise machine with a real motor inside.",
    whatItIs:
      "A bedside device with an actual fan inside a chamber, with two speed settings. The sound is mechanical and slightly varied — closer to a 'real' sound than a digital loop.",
    problemAddressed:
      "Masking intermittent noise with a steady, naturally varying broadband sound.",
    whoItMayFit: [
      "Anyone who finds digitally generated noise too sterile.",
      "Light sleepers who prefer a mechanical, slightly imperfect sound.",
    ],
    specs: [
      { label: "Sounds", value: "Mechanical fan, two speed settings" },
      { label: "Power", value: "AC adapter, no battery" },
      { label: "Material", value: "Plastic shell, marble-look" },
    ],
    comfortUsability: [
      "No app, no Wi-Fi — turn the dial, that is it.",
      "Mechanical sound has more variation than a digital loop.",
    ],
    limitations: [
      "Bulkier than digital alternatives.",
      "Sound is less precise to tune.",
    ],
    priceRange: "<$50",
    affiliate: true,
    researchStatus: "Desk researched",
    lastChecked: "2026-08-08",
    comparePair: ["yogasleep-dohm", "lectrofan-2"],
  },
  {
    slug: "chilipad-sleep-system",
    name: "ChiliPad Sleep System",
    category: "Temperature",
    useCase: ["Hot sleeper", "Partner with different temperature preference"],
    oneLine: "A mattress topper with circulating temperature-controlled water.",
    whatItIs:
      "A mattress topper with internal channels for water circulation, connected to a control unit that heats or cools the water to a set temperature.",
    problemAddressed:
      "Bedroom temperature that is too warm, or a partner with a different temperature preference.",
    whoItMayFit: [
      "Hot sleepers who cannot cool the bedroom enough.",
      "Couples with different temperature preferences.",
      "Anyone with menopause-related night sweats.",
    ],
    specs: [
      { label: "Temperature range", value: "55–115°F (13–46°C)" },
      { label: "Compatibility", value: "Fits most mattresses; sizes twin through split king" },
      { label: "Noise", value: "Control unit is the loudest part — fan-based" },
    ],
    comfortUsability: [
      "Effective at changing sleep-surface temperature noticeably.",
      "Split-king option lets each partner set their own temperature.",
    ],
    limitations: [
      "Control unit noise can be an issue for sensitive sleepers.",
      "Initial setup requires filling the unit with water and running it overnight before first use.",
      "Price is at the higher end of the category.",
    ],
    priceRange: "$400+",
    affiliate: true,
    researchStatus: "Editorial comparison",
    lastChecked: "2026-08-08",
    comparePair: ["chilipad-sleep-system", "eight-sleep-pod"],
  },
  {
    slug: "oura-ring-gen4",
    name: "Oura Ring (Generation 4)",
    category: "Tracker",
    useCase: ["Trend tracking", "Sleep diary supplement"],
    oneLine: "A ring-form sleep and readiness tracker with a multi-day battery.",
    whatItIs:
      "A wearable ring that measures heart rate, heart rate variability, body temperature, and motion, and uses those to estimate sleep stages and a daily readiness score.",
    problemAddressed:
      "Replacing a wrist wearable for sleep tracking, where the device-on-wrist is itself a sleep disruption for some people.",
    whoItMayFit: [
      "Anyone who finds wrist wearables uncomfortable in bed.",
      "People who want a tracker that does not need daily charging.",
    ],
    specs: [
      { label: "Sensors", value: "Heart rate, HRV, body temperature, motion" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Subscription", value: "Monthly subscription required for full insights" },
    ],
    comfortUsability: [
      "Worn on the finger, generally well-tolerated.",
      "Long battery life relative to wrist wearables.",
    ],
    limitations: [
      "Sleep staging accuracy is reasonable, not clinical-grade.",
      "Subscription model — the hardware is a partial product.",
      "Not appropriate for diagnosis.",
    ],
    priceRange: "$400+",
    affiliate: true,
    researchStatus: "Specification checked",
    lastChecked: "2026-08-08",
    comparePair: ["oura-ring-gen4"],
  },
];

export const PRODUCT_CATEGORIES: Category[] = [
  "Light",
  "Sound",
  "Temperature",
  "Bedding",
  "Tracker",
  "App",
];

export const PRICE_RANGES: PriceRange[] = [
  "<$50",
  "$50–$150",
  "$150–$400",
  "$400+",
];

export const RESEARCH_STATUSES: ResearchStatus[] = [
  "Desk researched",
  "Specification checked",
  "Editorial comparison",
  "Not independently tested",
];

export function findProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function filterProducts(opts: {
  category?: Category;
  useCase?: string;
  priceRange?: PriceRange;
  researchStatus?: ResearchStatus;
}): Product[] {
  return PRODUCTS.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.priceRange && p.priceRange !== opts.priceRange) return false;
    if (
      opts.researchStatus &&
      p.researchStatus !== opts.researchStatus
    )
      return false;
    if (
      opts.useCase &&
      !p.useCase.some((u) => u.toLowerCase().includes(opts.useCase!.toLowerCase()))
    )
      return false;
    return true;
  });
}

export function relatedProducts(p: Product): Product[] {
  return PRODUCTS.filter((q) => p.comparePair?.includes(q.slug) && q.slug !== p.slug);
}
