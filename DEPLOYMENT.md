# Deployment Guide

## Vercel

1. Import the GitHub repository into Vercel.
2. Add these environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`
   - `NOTIFICATION_FROM_EMAIL`
   - `BUSINESS_NOTIFICATION_EMAIL`
3. Deploy the project.
4. In Stripe, create a webhook for:
   - `checkout.session.completed`
5. Point the webhook URL to:
   - `https://your-domain.com/api/stripe-webhook`

## Important note

The current booking store uses a local SQLite file for simple self-hosted or single-instance deployments.
For horizontally scaled hosting, move booking persistence to a managed database before relying on it long-term.
