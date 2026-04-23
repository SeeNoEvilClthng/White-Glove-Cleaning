import type { BookingRecord } from "@/lib/bookings";

const resendApiKey = process.env.RESEND_API_KEY;
const notificationFromEmail = process.env.NOTIFICATION_FROM_EMAIL;
const businessNotificationEmail = process.env.BUSINESS_NOTIFICATION_EMAIL;

function buildCustomerEmail(record: BookingRecord) {
  return {
    subject: `White Glove Cleaning booking confirmed`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2430;line-height:1.6">
        <h1 style="margin-bottom:12px;">Your cleaning is confirmed</h1>
        <p>Hi ${record.customerName},</p>
        <p>We received your payment for <strong>${record.service}</strong>.</p>
        <p>
          <strong>Location:</strong> ${record.address}, ${record.city}<br />
          <strong>Frequency:</strong> ${record.frequency}<br />
          <strong>Home size:</strong> ${record.bedrooms} bed / ${record.bathrooms} bath / ${record.squareFootage} sq ft<br />
          <strong>Total paid:</strong> $${(record.totalAmount / 100).toFixed(2)}
        </p>
        <p>We’ll follow up if we need anything else before arrival.</p>
        <p>White Glove Cleaning</p>
      </div>
    `,
  };
}

function buildBusinessEmail(record: BookingRecord) {
  const extras = record.extras.length ? record.extras.join(", ") : "None";
  const notes = record.notes || "None";

  return {
    subject: `New paid booking: ${record.customerName} - ${record.service}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2430;line-height:1.6">
        <h1 style="margin-bottom:12px;">New paid booking</h1>
        <p><strong>Customer:</strong> ${record.customerName} (${record.customerEmail})</p>
        <p><strong>Service:</strong> ${record.service}</p>
        <p><strong>Frequency:</strong> ${record.frequency}</p>
        <p><strong>Address:</strong> ${record.address}, ${record.city}</p>
        <p><strong>Home:</strong> ${record.bedrooms} bed / ${record.bathrooms} bath / ${record.squareFootage} sq ft</p>
        <p><strong>Extras:</strong> ${extras}</p>
        <p><strong>Notes:</strong> ${notes}</p>
        <p><strong>Total paid:</strong> $${(record.totalAmount / 100).toFixed(2)}</p>
        <p><strong>Checkout session:</strong> ${record.checkoutSessionId}</p>
      </div>
    `,
  };
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!resendApiKey || !notificationFromEmail) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: notificationFromEmail,
      to,
      subject,
      html,
    }),
  });
}

export async function sendBookingNotifications(record: BookingRecord) {
  const customerEmail = buildCustomerEmail(record);

  await sendEmail(record.customerEmail, customerEmail.subject, customerEmail.html);

  if (businessNotificationEmail) {
    const adminEmail = buildBusinessEmail(record);

    await sendEmail(
      businessNotificationEmail,
      adminEmail.subject,
      adminEmail.html,
    );
  }
}
