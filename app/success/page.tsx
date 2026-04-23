import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="status-page">
      <div className="status-card">
        <p className="section-kicker">Booking confirmed</p>
        <h1>Thank you for choosing White Glove Cleaning.</h1>
        <p>
          Your payment was completed successfully. You should also receive a
          Stripe receipt by email, and our team can follow up to confirm any
          special access or home notes before the appointment.
        </p>
        <Link className="primary-button" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
