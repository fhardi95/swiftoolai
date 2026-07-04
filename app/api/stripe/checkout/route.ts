// app/api/stripe/checkout/route.ts
// Creates a Stripe Checkout session for the Pro plan

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Two prices set up in the Stripe dashboard — monthly and annual.
const PRICE_IDS: Record<"month" | "year", string | undefined> = {
  month: process.env.STRIPE_PRICE_MONTHLY,
  year: process.env.STRIPE_PRICE_YEARLY,
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let interval: "month" | "year" = "month";
  try {
    const body = await req.json();
    if (body?.interval === "year") interval = "year";
  } catch {
    // no body / not JSON — default to monthly
  }

  const priceId = PRICE_IDS[interval];
  if (!priceId) {
    return NextResponse.json(
      { error: `Missing STRIPE_PRICE_${interval.toUpperCase()}LY env var` },
      { status: 500 }
    );
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        billingInterval: interval,
      },
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?cancelled=true`,
      subscription_data: {
        metadata: {
          userId: session.user.id,
          billingInterval: interval,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
