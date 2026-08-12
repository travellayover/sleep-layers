// Standalone preview build of the public API catch-all.
//
//   POST /api/public?action=newsletter              — acknowledge subscribe
//   POST /api/public?action=affiliate-click         — acknowledge outbound click
//   POST /api/public?action=checkout-reset          — mint a stub order, redirect to /buy/success
//   POST /api/public?action=checkout-mock-pay       — flip a stub order to paid (preview-only)
//   GET  /api/public?action=order-status&id=<id>    — fetch order state
//   GET  /api/public?action=corrections             — empty list
//   GET  /api/public?action=newsletter-issues        — empty list
//
// In the admin repo this route persists to Drizzle; here we run without
// a DB and respond with safe defaults so the public site works in preview.

import { NextResponse } from "next/server";
import {
  CHECKOUT_PRODUCTS,
  createOrder,
  getOrder,
  markCanceled,
  markPaid,
  pickCheckoutVersion,
  type ProductSlug,
} from "@/lib/checkout/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_SLUGS: ProductSlug[] = ["seven-day-sleep-reset"];

async function handleNewsletter(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!email || !email.includes("@") || email.length > 320) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, status: "subscribed" });
}

async function handleAffiliateClick(req: Request) {
  const body = await req.json().catch(() => null);
  const productSlug = String(body?.productSlug ?? "").trim();
  const destinationUrl = String(body?.destinationUrl ?? "").trim();

  if (!productSlug || !destinationUrl) {
    return NextResponse.json(
      { error: "productSlug and destinationUrl required" },
      { status: 400 },
    );
  }
  if (!/^https?:\/\//i.test(destinationUrl)) {
    return NextResponse.json(
      { error: "destinationUrl must be http(s)" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function handleCheckoutReset(req: Request) {
  const body = await req.json().catch(() => null);
  const productSlug = String(body?.productSlug ?? "").trim() as ProductSlug;
  const email = body?.email
    ? String(body.email).trim().toLowerCase()
    : null;

  if (!VALID_SLUGS.includes(productSlug)) {
    return NextResponse.json(
      { error: "Unknown product." },
      { status: 400 },
    );
  }
  if (email && (!email.includes("@") || email.length > 320)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  // Tier-1 preview: launch price is always-on (Tier 3 will flip this
  // by reading real order counts from KV/Drizzle).
  const version = pickCheckoutVersion({ totalPaidSoFar: 0 });

  // Preview semantics: mint a `paid` order so the success page can render
  // a thank-you state immediately. Tier 3 will replace this with a Stripe
  // Checkout session that redirects to a real Stripe URL and only flips
  // status to `paid` when the webhook fires.
  const order = createOrder({ productSlug, version, customerEmail: email });
  markPaid(order.id);

  const successUrl = new URL("/buy/success", baseUrlFromReq(req));
  successUrl.searchParams.set("session", order.id);

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    productSlug: order.productSlug,
    productName: CHECKOUT_PRODUCTS[order.productSlug].name,
    amountCents: order.amountCents,
    currency: order.currency,
    version,
    redirectUrl: successUrl.toString(),
  });
}

async function handleCheckoutMockPay(req: Request) {
  const body = await req.json().catch(() => null);
  const session = String(body?.session ?? "").trim();

  if (!session) {
    return NextResponse.json(
      { error: "session required" },
      { status: 400 },
    );
  }

  const updated = markPaid(session);
  if (!updated) {
    return NextResponse.json({ error: "order not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, order: updated });
}

async function handleOrderStatus(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const order = getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "order not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, order });
}

function baseUrlFromReq(req: Request): string {
  const env = process.env.NEXT_PUBLIC_BASE_URL;
  if (env) return env;
  // Fall back to the request's own origin header.
  try {
    return new URL(req.url).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "";
  try {
    switch (action) {
      case "newsletter":
        return await handleNewsletter(req);
      case "affiliate-click":
        return await handleAffiliateClick(req);
      case "checkout-reset":
        return await handleCheckoutReset(req);
      case "checkout-mock-pay":
        return await handleCheckoutMockPay(req);
      default:
        return NextResponse.json(
          { error: "unknown action" },
          { status: 400 },
        );
    }
  } catch (err) {
    console.error(`[public/${action}] failed`, err);
    if (action === "affiliate-click") {
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "";
  try {
    switch (action) {
      case "corrections":
        return NextResponse.json({ corrections: [] });
      case "newsletter-issues":
        return NextResponse.json({ issues: [] });
      case "order-status": {
        return await handleOrderStatus(req);
      }
      case "cancel-order": {
        const id = url.searchParams.get("id") ?? "";
        const o = markCanceled(id);
        return NextResponse.json({ ok: !!o, order: o });
      }
      default:
        return NextResponse.json(
          { error: "unknown action" },
          { status: 400 },
        );
    }
  } catch (err) {
    console.error(`[public/${action}] failed`, err);
    return NextResponse.json({ corrections: [] });
  }
}
