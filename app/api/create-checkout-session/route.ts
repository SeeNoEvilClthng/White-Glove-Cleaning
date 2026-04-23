import Stripe from "stripe";
import { NextResponse } from "next/server";

import {
  calculateBookingEstimate,
  getServiceById,
  type BookingInput,
} from "@/lib/pricing";

const secretKey = process.env.STRIPE_SECRET_KEY;

const stripe = secretKey
  ? new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
    })
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY first." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as BookingInput;
  const service = getServiceById(body.serviceId);

  if (!service) {
    return NextResponse.json({ error: "Invalid service selected." }, { status: 400 });
  }

  if (!body.customerName || !body.email || !body.address || !body.city) {
    return NextResponse.json(
      { error: "Missing customer details for checkout." },
      { status: 400 },
    );
  }

  const estimate = calculateBookingEstimate(body);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: crypto.randomUUID(),
      customer_email: body.email,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        customerName: body.customerName,
        customerEmail: body.email,
        service: service.name,
        serviceId: body.serviceId,
        frequency: body.frequency,
        address: body.address,
        city: body.city,
        bedrooms: String(body.bedrooms),
        bathrooms: String(body.bathrooms),
        squareFootage: String(body.squareFootage),
        extras: body.extras.join(", ") || "none",
        notes: body.notes || "none",
        estimatedTotal: String(estimate.total),
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: estimate.total,
            product_data: {
              name: `White Glove Cleaning - ${service.name}`,
              description: estimate.summary,
            },
          },
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
