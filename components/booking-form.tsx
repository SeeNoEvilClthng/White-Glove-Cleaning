"use client";

import { FormEvent, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
  calculateBookingEstimate,
  extraOptions,
  pricingServices,
  type BookingInput,
} from "@/lib/pricing";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

const initialBooking: BookingInput = {
  customerName: "",
  email: "",
  address: "",
  city: "Phoenix",
  serviceId: pricingServices[0].id,
  frequency: "one-time",
  bedrooms: 3,
  bathrooms: 2,
  squareFootage: 1800,
  extras: [],
  notes: "",
};

export function BookingForm() {
  const [booking, setBooking] = useState<BookingInput>(initialBooking);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimate = useMemo(() => calculateBookingEstimate(booking), [booking]);

  const updateField = <K extends keyof BookingInput>(key: K, value: BookingInput[K]) => {
    setBooking((current) => ({ ...current, [key]: value }));
  };

  const toggleExtra = (id: string) => {
    setBooking((current) => {
      const extras = current.extras.includes(id)
        ? current.extras.filter((item) => item !== id)
        : [...current.extras, id];

      return { ...current, extras };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const payload = (await response.json()) as {
        error?: string;
        sessionId?: string;
      };

      if (!response.ok || !payload.sessionId) {
        throw new Error(payload.error ?? "Unable to start checkout.");
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error(
          "Stripe publishable key is missing. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.",
        );
      }

      const result = await stripe.redirectToCheckout({
        sessionId: payload.sessionId,
      });

      if (result.error?.message) {
        throw new Error(result.error.message);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while starting checkout.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form className="booking-card" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label>
          Full name
          <input
            required
            value={booking.customerName}
            onChange={(event) => updateField("customerName", event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={booking.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
        <label className="span-2">
          Service address
          <input
            required
            value={booking.address}
            onChange={(event) => updateField("address", event.target.value)}
          />
        </label>
        <label>
          City
          <select
            value={booking.city}
            onChange={(event) => updateField("city", event.target.value)}
          >
            {["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Gilbert", "Glendale", "Peoria"].map(
              (city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ),
            )}
          </select>
        </label>
        <label>
          Cleaning type
          <select
            value={booking.serviceId}
            onChange={(event) => updateField("serviceId", event.target.value)}
          >
            {pricingServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Frequency
          <select
            value={booking.frequency}
            onChange={(event) =>
              updateField(
                "frequency",
                event.target.value as BookingInput["frequency"],
              )
            }
          >
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          Bedrooms
          <input
            min={1}
            max={8}
            type="number"
            value={booking.bedrooms}
            onChange={(event) => updateField("bedrooms", Number(event.target.value))}
          />
        </label>
        <label>
          Bathrooms
          <input
            min={1}
            max={8}
            type="number"
            value={booking.bathrooms}
            onChange={(event) => updateField("bathrooms", Number(event.target.value))}
          />
        </label>
        <label>
          Square footage
          <input
            min={500}
            max={6000}
            step={100}
            type="number"
            value={booking.squareFootage}
            onChange={(event) =>
              updateField("squareFootage", Number(event.target.value))
            }
          />
        </label>
        <label className="span-2">
          Special notes
          <textarea
            rows={4}
            value={booking.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Gate code, pets, focus areas, or move-out timing"
          />
        </label>
      </div>

      <fieldset className="extras-fieldset">
        <legend>Add-on details</legend>
        <div className="extras-grid">
          {extraOptions.map((extra) => (
            <label className="extra-option" key={extra.id}>
              <input
                checked={booking.extras.includes(extra.id)}
                type="checkbox"
                onChange={() => toggleExtra(extra.id)}
              />
              <span>{extra.label}</span>
              <small>+${extra.price}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="estimate-panel">
        <div>
          <p className="card-label">Estimated total</p>
          <h3>${(estimate.total / 100).toFixed(2)}</h3>
          <p>{estimate.summary}</p>
        </div>
        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Redirecting to Stripe..." : "Continue to secure payment"}
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}
    </form>
  );
}
