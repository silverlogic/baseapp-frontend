---
'@baseapp-frontend/components': major
---

Upgrade `@stripe/stripe-js` from 7.10.0 to 10.3.0 and `@stripe/react-stripe-js` from 3.11.0 to 7.1.0, so
Stripe.js runs on the same Stripe API release (endive) as `baseapp_payments`, which now pins API
version `2026-10-28.endive` (BA-3496).

**Breaking:** update this package and the backend's `baseapp_payments` together. Each Stripe.js major is
tied to one API release, and the backend module now reads the first payment's secret from the invoice's
`confirmation_secret`. Projects that pin the payments catalog in their own `pnpm-workspace.yaml` (the
template does) must move it to the same versions. Projects must also move their **Stripe webhook endpoint** to API version
`2026-10-28.endive` (Stripe Dashboard → Developers → Webhooks), as the `baseapp_payments` README describes.

The add-card flow no longer calls `elements.update({ clientSecret })`. Stripe.js never supported changing
the client secret after Elements is created, and since the clover release it refuses an intent that is
already confirmed. `AddCardModal` now takes the SetupIntent's `clientSecret` instead of an `elements`
instance and mounts its own `<Elements>` for each SetupIntent. `PaymentDropdown` no longer takes
`elements`. Neither component is exported from the package, so only code that imports them by path is
affected.
