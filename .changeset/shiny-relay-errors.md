---
"@baseapp-frontend/utils": minor
---

Add `getMutationErrorMessage` (exported from `@baseapp-frontend/utils`, source in `functions/relay/getMutationErrorMessage`) — a single shared resolver for Relay mutation errors. It returns the first user-facing message from the payload's `errors[].messages`, then falls back to Relay's top-level transport errors (`PayloadError[]`), then to a configurable `defaultMessage` when an error is present but carries no message, and returns `undefined` when the mutation succeeded. The parameter types (`MutationPayloadErrors`, `MutationTransportErrors`) are structural, so generated Relay payload errors and `PayloadError[]` can be passed directly without this package depending on `relay-runtime`.
