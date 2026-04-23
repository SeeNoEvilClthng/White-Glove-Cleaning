# White Glove Cleaning

Marketing and booking website for a Phoenix Metro cleaning company, built with Next.js and Stripe Checkout.

## Features

- premium single-page home experience for White Glove Cleaning
- online booking form with live pricing estimate
- Stripe Checkout integration for full upfront payment
- Stripe webhook capture for completed checkouts
- SQLite-backed booking persistence for local or single-instance hosting
- customer and internal notification email hooks via Resend
- simple admin bookings dashboard at `/admin/bookings`
- Phoenix Metro service area messaging
- success and cancel flows after payment

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and add your Stripe keys:

   ```bash
   cp .env.example .env.local
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`

## Stripe notes

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is used in the browser to start checkout.
- `STRIPE_SECRET_KEY` is used on the server to create the checkout session.
- `STRIPE_WEBHOOK_SECRET` is used to verify incoming Stripe webhook events.
- `NEXT_PUBLIC_SITE_URL` should match your deployed domain in production.
- `RESEND_API_KEY`, `NOTIFICATION_FROM_EMAIL`, and `BUSINESS_NOTIFICATION_EMAIL`
  enable email notifications after successful payment.

## Webhook setup

Create a Stripe webhook endpoint that points to:

```text
https://your-domain.com/api/stripe-webhook
```

Listen for:

- `checkout.session.completed`

Then copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

## Admin dashboard

- Visit `/admin/bookings` to view captured paid bookings.
- If `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set, the route is protected with basic auth.
- Successful webhook events are stored in `data/bookings.db`.

## Email notifications

- Customer confirmation emails are sent after `checkout.session.completed`.
- Internal booking notifications are sent to `BUSINESS_NOTIFICATION_EMAIL`.
- Email delivery is enabled only when the Resend env vars are configured.

## Deployment

- A minimal Vercel config is included in [vercel.json](/Users/wunmanbandxay._/PropSniper%20copy.AI/CLEANING%20COMPANY%20WEBSITE/vercel.json).
- Production setup notes are in [DEPLOYMENT.md](/Users/wunmanbandxay._/PropSniper%20copy.AI/CLEANING%20COMPANY%20WEBSITE/DEPLOYMENT.md).

## Next additions to consider

- Google Calendar integration
- CRM sync
- SMS reminders and recurring customer management
