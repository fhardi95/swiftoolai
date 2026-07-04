// app/api/stripe/webhook/route.ts
// Handles Stripe events to keep subscription status in sync with Supabase

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Subscription created or updated ────────────────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        if (!userId) break;

        const isActive = sub.status === "active" || sub.status === "trialing";
        const periodEnd = new Date((sub as any).current_period_end * 1000).toISOString();
        const billingInterval = sub.metadata?.billingInterval ?? sub.items.data[0]?.price?.recurring?.interval ?? null;

        await supabaseAdmin.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: sub.customer as string,
          stripe_subscription_id: sub.id,
          plan: isActive ? "pro" : "free",
          status: sub.status,
          billing_interval: billingInterval,
          current_period_end: periodEnd,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

        console.log(`[webhook] Subscription ${sub.status} for user ${userId}`);
        break;
      }

      // ── Subscription cancelled ─────────────────────────────────────────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        if (!userId) break;

        await supabaseAdmin.from("subscriptions").upsert({
          user_id: userId,
          stripe_subscription_id: sub.id,
          plan: "free",
          status: "cancelled",
          current_period_end: null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

        console.log(`[webhook] Subscription cancelled for user ${userId}`);
        break;
      }

      // ── Payment failed ─────────────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as any).subscription as string | null;
        if (!subId) break;

        await supabaseAdmin
          .from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subId);

        console.log(`[webhook] Payment failed for subscription ${subId}`);
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    console.error("[webhook] Handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
