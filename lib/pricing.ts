export const pricingServices = [
  {
    id: "standard",
    name: "Recurring Home Refresh",
    basePrice: 159,
  },
  {
    id: "deep",
    name: "Signature Deep Clean",
    basePrice: 249,
  },
  {
    id: "move",
    name: "Move In / Move Out Clean",
    basePrice: 329,
  },
] as const;

export const extraOptions = [
  { id: "inside-fridge", label: "Inside fridge", price: 25 },
  { id: "inside-oven", label: "Inside oven", price: 30 },
  { id: "interior-windows", label: "Interior windows", price: 45 },
  { id: "laundry-fold", label: "Laundry fold service", price: 35 },
  { id: "baseboards", label: "Detailed baseboards", price: 40 },
] as const;

export type BookingInput = {
  customerName: string;
  email: string;
  address: string;
  city: string;
  serviceId: string;
  frequency: "one-time" | "weekly" | "biweekly" | "monthly";
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  extras: string[];
  notes: string;
};

const frequencyDiscounts: Record<BookingInput["frequency"], number> = {
  "one-time": 1,
  weekly: 0.85,
  biweekly: 0.9,
  monthly: 0.95,
};

export function getServiceById(serviceId: string) {
  return pricingServices.find((service) => service.id === serviceId);
}

export function calculateBookingEstimate(input: BookingInput) {
  const service = getServiceById(input.serviceId) ?? pricingServices[0];
  const base = service.basePrice;
  const bedroomCharge = Math.max(0, input.bedrooms - 2) * 18;
  const bathroomCharge = Math.max(0, input.bathrooms - 1) * 22;
  const sizeCharge = Math.max(0, input.squareFootage - 1200) * 0.06;
  const extrasTotal = input.extras.reduce((sum, extraId) => {
    const option = extraOptions.find((extra) => extra.id === extraId);
    return sum + (option?.price ?? 0);
  }, 0);
  const subtotal = base + bedroomCharge + bathroomCharge + sizeCharge + extrasTotal;
  const total = Math.round(subtotal * frequencyDiscounts[input.frequency] * 100);

  return {
    total,
    summary: `${service.name} for a ${input.bedrooms} bed / ${input.bathrooms} bath home in ${input.city}.`,
  };
}
