import Stripe from "stripe";
import { NextResponse } from "next/server";

import {
  createBookingFromSession,
  ensureBookingDatabaseForRuntime,
  upsertBookingRecord,
} from "@/lib/bookings";
import { sendBookingNotifications } from "@/lib/notifications";

const secretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = secretKey
  ? new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
    })
  : null;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured yet." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header." },
      { status: 400 },
    );
  }

  const payload = await request.text();

  try {
    ensureBookingDatabaseForRuntime();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const booking = createBookingFromSession(session);

      await upsertBookingRecord(booking);
      await sendBookingNotifications(booking);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process webhook event.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
