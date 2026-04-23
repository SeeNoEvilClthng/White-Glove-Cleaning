import { readBookingRecords } from "@/lib/bookings";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await readBookingRecords();
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <main className="admin-page">
      <div className="shell">
        <div className="admin-header">
          <div>
            <p className="section-kicker">Admin</p>
            <h1>Paid bookings</h1>
            <p>
              This view is populated by Stripe webhook events after successful
              checkout.
            </p>
          </div>
          <div className="admin-chip-group">
            <div className="admin-chip">
              <strong>{bookings.length}</strong>
              <span>Total captured bookings</span>
            </div>
            <div className="admin-chip">
              <strong>{formatCurrency(totalRevenue)}</strong>
              <span>Total tracked revenue</span>
            </div>
          </div>
        </div>

        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Location</th>
                <th>Total</th>
                <th>Status</th>
                <th>Paid at</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.customerName}</strong>
                      <span>{booking.customerEmail}</span>
                    </td>
                    <td>
                      <strong>{booking.service}</strong>
                      <span>
                        {booking.frequency} • {booking.bedrooms} bed /{" "}
                        {booking.bathrooms} bath
                      </span>
                    </td>
                    <td>
                      <strong>{booking.city}</strong>
                      <span>{booking.address}</span>
                    </td>
                    <td>{formatCurrency(booking.totalAmount)}</td>
                    <td>
                      <span className="status-pill">{booking.paymentStatus}</span>
                    </td>
                    <td>{formatDate(booking.paidAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    No paid bookings yet. Complete a live Stripe checkout and the
                    webhook will add it here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
