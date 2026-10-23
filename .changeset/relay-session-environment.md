---
"@baseapp-frontend/graphql": minor
---

Session-owned Relay environments, so nothing from one user's session reaches the next after a
logout or an account switch. Existing callers behave as before.

- `RelayProvider` takes an optional `sessionKey` (e.g. `getSessionIdentity(access, refresh)` from
  `@baseapp-frontend/utils`). When it changes, the children are remounted with a new environment,
  and the previous one is disposed once the change is committed; the disposal is cancelled if the
  same environment mounts again, so React StrictMode never disposes the live one. It also takes an
  optional `environment` that it uses as is and never disposes. `useEnvironment(sessionKey?)` exposes
  the same behaviour as a hook.
- New `disposeEnvironment(environment)`: clears the preloaded-query response cache and the store
  (including records from pending optimistic updates), notifies mounted queries and closes the
  environment's websocket, swallowing transport errors so a logout never fails.
- Each environment now has its own `graphql-ws` client, created on its first subscription, instead
  of one module-level client shared by every environment. The address (including relative
  `NEXT_PUBLIC_WS_RELAY_ENDPOINT` values), retry policy and connection params are unchanged; an
  environment that never subscribes (e.g. on the server) no longer has a client at all.
- `useSerializablePreloadedQuery` writes the preloaded response again when the environment changes
  (it was memoized on the query only, so a new environment started without it).
- The package now has unit tests (`pnpm test:unit`).
