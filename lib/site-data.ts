export const services = [
  {
    name: "Recurring Home Refresh",
    basePrice: 159,
    description:
      "Ideal for busy homes that want a polished reset every week, every other week, or monthly.",
    features: ["Kitchen and bathroom detailing", "Dusting and floor care", "Tidy finishing touches"],
  },
  {
    name: "Signature Deep Clean",
    basePrice: 249,
    description:
      "A more detailed top-to-bottom service for first-time visits, seasonal resets, and heavily used homes.",
    features: ["Base cleaning plus detail work", "High-touch surfaces", "Extra attention in problem areas"],
  },
  {
    name: "Move In / Move Out Clean",
    basePrice: 329,
    description:
      "Designed for transitions when you need the home fresh, photo-ready, and ready for its next chapter.",
    features: ["Cabinet exteriors and fixtures", "Detailed bathroom restoration", "Vacant-home finishing pass"],
  },
] as const;

export const trustPoints = [
  {
    title: "Flat-rate estimates",
    description: "See your price before checkout with no phone tag required.",
  },
  {
    title: "Secure online payment",
    description: "Full service payment handled through Stripe Checkout.",
  },
  {
    title: "Phoenix-aware service",
    description: "Built for Valley dust, busy schedules, and move-heavy neighborhoods.",
  },
] as const;

export const serviceAreas = [
  "Phoenix",
  "Scottsdale",
  "Tempe",
  "Mesa",
  "Chandler",
  "Gilbert",
  "Glendale",
  "Peoria",
  "Paradise Valley",
  "Ahwatukee",
] as const;
