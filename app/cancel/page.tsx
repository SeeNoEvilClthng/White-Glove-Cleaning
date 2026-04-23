import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="status-page">
      <div className="status-card">
        <p className="section-kicker">Checkout canceled</p>
        <h1>Your booking has not been paid yet.</h1>
        <p>
          No problem. You can return to the booking form, adjust your service
          details, and try again whenever you are ready.
        </p>
        <Link className="primary-button" href="/#booking">
          Return to booking
        </Link>
      </div>
    </main>
  );
}
