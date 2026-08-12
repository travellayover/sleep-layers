// Checkout stubs for the Sleep Layers consumer preview.
//
// Order model:
//   - Each checkout is a pending order keyed by `session` (a UUID).
//   - In production (Tier 3+), `/api/public?action=checkout-reset`
//     returns a Stripe Checkout URL; the webhook (`/api/stripe/webhook`)
//     marks the order `paid` and emails a one-time download link.
//   - In this preview, `checkout-reset` mints a session id, marks
//     the order `pending`, then immediately marks it `paid` and
//     redirects to `/buy/success?session=<id>`. The success page
//     reads order status via `order-status` and prints a download
//     link placeholder.
//
// Persistence is in-memory; restart wipes orders. This is intentional
// for the preview — the real database is Vercel KV or Drizzle/Turso,
// which lands in Tier 3.

import { randomUUID } from "node:crypto";

export type ProductSlug = "seven-day-sleep-reset";

export type OrderStatus = "pending" | "paid" | "canceled";

export type Order = {
  id: string;
  productSlug: ProductSlug;
  productName: string;
  amountCents: number;
  currency: "USD";
  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
  customerEmail: string | null;
};

// Phase-aware product catalog for the checkout surface.
// Pricing follows the operator's plan:
// - Launch (first 10 sales): $9
// - After 10 sales: $19
// - Bundle/month-3: $29
//
// `version` lets the success page print a sourced "you paid $9 during launch"
// copy without re-reading the pricing function.
type ProductVersion = "launch" | "standard" | "bundle";

export const CHECKOUT_PRODUCTS: Record<
  ProductSlug,
  {
    name: string;
    longName: string;
    summary: string;
    description: string;
    pricingByVersion: Record<ProductVersion, { amountCents: number; label: string }>;
    features: string[];
    faq: Array<{ q: string; a: string }>;
    whatYouGet: string[];
    disclaimer: string;
  }
> = {
  "seven-day-sleep-reset": {
    name: "The 7-Day Sleep Reset",
    longName: "The 7-Day Sleep Reset — sequenced, not stacked",
    summary: "One action per night for a week. No supplements, no mattress.",
    description:
      "A PDF that turns what would otherwise be a list of tips into a sequence. One small setup decision each evening, with a tracker and a 12-question bedroom audit you can keep using.",
    pricingByVersion: {
      launch: { amountCents: 900, label: "$9 — launch price" },
      standard: { amountCents: 1900, label: "$19 — standard" },
      bundle: { amountCents: 2900, label: "$29 — bundle" },
    },
    features: [
      "7 sequenced actions, from wake-time anchoring to the 90-minute wind-down",
      "The 12-question bedroom audit (re-usable)",
      "Your personal caffeine cutoff calculator (half-life table)",
      "The 2-week printable sleep tracker",
      "The under-$50 upgrade checklist (affiliate-ready)",
    ],
    whatYouGet: [
      "An 11-section, ~18-page PDF (covers the wake-time anchor, the audit, the cutoff, the 90-minute wind-down, the 4-dial room reset, the morning stack, the day-7 audit, the tracker, the disclaimer)",
      "Two printable pages — the caffeine cutoff table and the 14-day tracker",
      "The 12-question audit, formatted for re-use after your first week",
      "An under-$50 checklist with each line ready for affiliate disclosure in month 2+",
    ],
    faq: [
      {
        q: "How long until I see a change?",
        a: "Most readers notice a difference within one to two weeks of consistent nights. If you do not, you still have a clear record of what you tried and when — that is the second half of why this exists.",
      },
      {
        q: "What if it does not apply to my situation?",
        a: "The actions are sequenced but not load-bearing. Skip the ones that do not fit. The point is consistency, not completeness.",
      },
      {
        q: "Is this a substitute for a clinician?",
        a: "No. The Reset is educational and does not diagnose a sleep disorder, prescribe a treatment, or replace advice from a qualified clinician. The 'When professional support may be appropriate' section names the situations where a clinician is the right next step.",
      },
      {
        q: "What format is the file?",
        a: "A PDF, made in Canva at 1080×1920 preview pages plus A4 export. Optimised for a phone reader and a tablet, in that order.",
      },
      {
        q: "Can I get a refund?",
        a: "If you read the whole guide, run nights 1-3, and still do not find it useful, reply to the confirmation email and we will refund you — no questions, no friction.",
      },
    ],
    disclaimer:
      "This guide is for education only and is not medical advice. Consult a physician for sleep or health concerns.",
  },
};

// In-memory order store (Tier 3 will swap for Vercel KV or Drizzle).
const orders: Map<string, Order> = new Map();

export function listOrders(): Order[] {
  return Array.from(orders.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function createOrder(opts: {
  productSlug: ProductSlug;
  version: ProductVersion;
  customerEmail: string | null;
}): Order {
  const product = CHECKOUT_PRODUCTS[opts.productSlug];
  const price = product.pricingByVersion[opts.version];
  const id = randomUUID();
  const order: Order = {
    id,
    productSlug: opts.productSlug,
    productName: product.name,
    amountCents: price.amountCents,
    currency: "USD",
    status: "pending",
    createdAt: new Date().toISOString(),
    paidAt: null,
    customerEmail: opts.customerEmail,
  };
  orders.set(id, order);
  return order;
}

export function markPaid(id: string): Order | undefined {
  const o = orders.get(id);
  if (!o) return undefined;
  const updated: Order = {
    ...o,
    status: "paid",
    paidAt: new Date().toISOString(),
  };
  orders.set(id, updated);
  return updated;
}

export function markCanceled(id: string): Order | undefined {
  const o = orders.get(id);
  if (!o) return undefined;
  const updated: Order = { ...o, status: "canceled" };
  orders.set(id, updated);
  return updated;
}

// Pricing-policy helper. Used by /buy page to decide the version label.
export function pickCheckoutVersion(args: {
  totalPaidSoFar: number;
}): ProductVersion {
  return args.totalPaidSoFar < 10 ? "launch" : "standard";
}
