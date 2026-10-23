---
"@baseapp-frontend/provider": minor
---

`ReactQueryProvider` takes an optional `sessionKey` (e.g. `getSessionIdentity(access, refresh)` from
`@baseapp-frontend/utils`). Each key gets its own `QueryClient`: when the key changes, the children
are remounted with a new client, and the previous client's queries are cancelled and its cache
cleared once the change is committed (StrictMode-safe), so nothing one user fetched is shown to the
next after a logout or an account switch. Without a `sessionKey`, the browser keeps sharing one
client as before. The package now has unit tests (`pnpm test:unit`).
