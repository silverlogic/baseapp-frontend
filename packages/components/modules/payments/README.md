# Module: `payments`

This module is divided into three primary folders:

- **`common/`**: Contains platform-independent logic (utilities, hooks, or components that work in both web and native).
  - Can import from within or other `common/` folders.
  - Must not import from `web/` or `native/`.
- **`web/`**: Contains web-specific components and logic (e.g., React DOM, browser APIs, Material UI and others).
  - Can import from within or `common/`.
  - Must not import from `native/`.
- **`native/`**: Contains native-specific components and logic (e.g., React Native, Expo, React Native Paper and others)
  - Can import from within or `common/`.
  - Must not import from `web/`.

This structure ensures platform-specific code remains isolated, while shared code lives in one place.

## Card holds

Client half of `baseapp_payments` card holds (the backend README's "Card holds" section is the
contract). The backend ships no create mutation: your project's own checkout mutation mixes in
`CardHoldPaymentInputMixin` and `CardHoldPayloadMixin`, and this module drives it.

- `payments/common`: `useCardHoldPlacement` (platform-neutral; inject an `authenticate`),
  `placeCardHold` (the same flow without React), the `cardHoldKeep` / `cardHoldCancel` mutation
  hooks, the `CardHold` fragments, and the copy/label helpers.
- `payments/web`: `useStripeCardHoldPlacement` (Stripe.js as the authenticator, inside
  `<Elements>`), `createStripeJsCardHoldAuthenticator`, `CardHoldNotice`, `CardHoldStatusLabel`
  and `CardHoldStaffActions`.

Your create mutation must return the card hold payload on **every** answer, errors included:
on the backend, spread `card_hold_payload(result)` into the payload alongside `errors`. This
module decides what to do next from `holdStatus` alone; without it on an error answer it can't
retry `in_progress` or tell when to renew the attempt id.

Wiring a checkout (web):

```tsx
const [commitOrderCreate] = useOrderCreateMutation() // your mutation; select holdStatus,
// requiresAction, clientSecret, intentType, holdOn and errors on its payload

const { place, isPending, outcome } = useStripeCardHoldPlacement({
  submit: (cardHoldInput) =>
    new Promise((resolve, reject) => {
      commitOrderCreate({
        variables: { input: { ...orderInput, ...cardHoldInput } },
        onCompleted: (response) => resolve(response.orderCreate),
        onError: reject,
      })
    }),
})

await place(paymentMethodId) // from Elements / a saved card
```

`outcome.status` is one of:

- `placed`, `scheduled` (with `holdOn`), `card_saved`, `charge_now`: done. Show `CardHoldNotice`.
- `declined`: ask for another card.
- `changed`: the attempt id was already used with other parameters. The hook has already resent
  once under a new attempt id with the same card; this means the resend answered `changed`
  again.
- `amount_changed`: the price changed; show the new one.
- `refused`: the project or the target refused the hold.
- `in_progress`: still pending after the retries; the same attempt can be retried later.
- `authentication_failed`: Stripe couldn't run 3D Secure; the same attempt can be retried.
- `error`: the mutation failed, returned no payload, or an unknown `holdStatus`.
- `cancelled`: only what `place()` resolves after the component unmounted.

The attempt id is kept across `in_progress` retries and the 3D Secure second pass. It is renewed
after `declined`, `changed` and `refused` (each means the next try is a new order), and never
otherwise, so a retry can't place twice. `reset()` starts a new checkout. Outcome payloads never
carry `clientSecret`.

Calling `place()` while a placement runs returns that placement's promise; it never submits
twice. Unmounting stops the placement: no further 3D Secure, resend or backoff, and `onOutcome`
is not called after unmount (navigating away is not a failure). Outside React, `placeCardHold`
takes an `AbortSignal` (`signal`) for the same, and `onAttemptIdChange` reports the new attempt
id of a `changed` resend.

On a target that implements `CardHoldsInterface`, spread `...CardHoldStatusLabel_cardHold` and,
for staff, `...CardHoldStaffActions_cardHold` under `cardHold`.
