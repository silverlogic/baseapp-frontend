---
'@baseapp-frontend/components': minor
---

Add `OneTimeCheckout` to `payments/web`, the checkout for one-time purchases (BA-2556). It takes the cart
as `items` (`productId` and `quantity`), lets the buyer change quantities (1–9999) or remove lines, pays
with a saved card or a new one, and creates the purchase through `baseapp_payments`'
`POST /payments/stripe/purchases/` with the prices on screen. It confirms the payment with
`confirmCardPayment` (3D Secure included) and polls the purchase until Stripe's webhook marks it `paid` or
`failed`. When the backend refuses a changed price, the products are refetched so the buyer sees the
current one. Requires the backend's one-time purchases (BA-3495) to be enabled.

Also adds `StripeApi.createPurchase` / `getPurchase`, the `useCreatePurchase` / `useGetPurchase` hooks,
the `Purchase` types, and exports `formatPrice`, `isOneTimeProduct`, `clampQuantity` and
`buildOrderSummary`.

`InvoiceListTable` now reads as a billing history for subscriptions and one-time purchases alike: its
default title is "Billing History", each row lists every line of the invoice with its quantity
(`2 × Coffee mug, 1 × Tea`), cut with "…" after 60 characters with the full text on hover, and a `void`
invoice shows as a red "canceled" chip.
