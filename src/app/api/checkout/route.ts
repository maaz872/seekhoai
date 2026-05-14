// MOCK — to enable real Stripe Checkout, do the following:
//
//   1. `npm i stripe` and add STRIPE_SECRET_KEY to env (.env.local + Vercel settings).
//   2. Replace this body with:
//
//        import Stripe from 'stripe';
//        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//
//        const session = await stripe.checkout.sessions.create({
//          mode: 'payment',
//          line_items: [{ price: 'price_xxx', quantity: 1 }], // your Stripe price ID
//          discounts: parsed.data.couponCode === 'AI20'
//            ? [{ coupon: 'AI20_COUPON_ID' }]  // pre-create this in Stripe dashboard
//            : undefined,
//          customer_email: parsed.data.email,
//          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?paid=1`,
//          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=1`,
//        });
//
//   3. Return { ok: true, url: session.url } and redirect client-side to session.url.
//   4. Replace the in-page modal flow with the redirect, OR keep the modal as an
//      "are you sure?" step that posts here and then window.location = url.

import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  couponCode: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 1000));

  const sessionId = `mock_${crypto.randomUUID()}`;
  // Visible in Vercel function logs.
  console.log("[MOCK checkout]", {
    email: parsed.data.email,
    couponCode: parsed.data.couponCode ?? null,
    sessionId,
  });

  return NextResponse.json({ ok: true, sessionId });
}
