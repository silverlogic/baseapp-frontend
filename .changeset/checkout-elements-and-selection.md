---
'@baseapp-frontend/components': patch
---

Checkout fixes found in Stripe test-mode QA (BA-3496):

- The checkout's Elements group now runs in deferred-intent `setup` mode with the price's currency.
  Without a mode or a client secret, Stripe.js (endive) logged "Unable to select session" from the
  address form. The currency is required: in setup mode without it, Elements never initialized on
  accounts with dynamic payment methods.
- After a successful payment the selected card stays on the card that was charged, instead of
  jumping to the newest card. A refetched payment-method list only changes the selection when the
  selected card is no longer in it.
