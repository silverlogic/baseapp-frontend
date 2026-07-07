---
"@baseapp-frontend/utils": minor
---

Add shared Relay mutation error handling:

- `getMutationErrorMessage(payloadErrors, transportErrors, { defaultMessage })` (source in `functions/relay/getMutationErrorMessage`) resolves the first user-facing error from a mutation's `onCompleted` args: the first message in the payload's `errors[].messages`, else the first top-level transport error message, else `defaultMessage`; `undefined` when the mutation succeeded. The parameter types (`MutationPayloadErrors`, `MutationTransportErrors`) are structural, so generated Relay payload errors and `PayloadError[]` pass straight through without this package depending on `relay-runtime`.
- `sendMutationErrorToast(payloadErrors, transportErrors, options?)` on the `useNotification` store composes `getMutationErrorMessage` with an error toast (mirroring the existing `sendApiErrorToast`) and returns the toasted message (or `undefined`), so callers can branch on it for success toasts / early returns.
- `DEFAULT_ERROR_MESSAGE` constant (`'Something went wrong.'`) exported from `constants/errors` and used as the default by both `getApiErrorMessage` and `getMutationErrorMessage`.
- `setFormRelayErrors` now accepts the shared `MutationPayloadErrors` type (a supertype of its previous private type — no call-site changes needed) and normalizes empty/blank `messages` to `DEFAULT_ERROR_MESSAGE` so fields are never marked invalid with blank helper text.
