---
"@baseapp-frontend/utils": minor
---

Server-side calls to a relative API address can now forward the visitor's address. Set the new server-only `INTERNAL_API_FORWARDED_FOR_TRIM=<n>` and `resolveApiUrl` (and with it `baseAppFetch`, the axios instances, and `getAccessToken` / `preAuthenticateJWT` from `@baseapp-frontend/authentication`) sends the incoming `X-Forwarded-For` with its last `n` entries removed, so the API keeps reading the visitor at the same trusted hop position instead of every SSR request coming from the web server's address. `n` is `0` when `INTERNAL_API_ORIGIN` reaches the API directly; the utils README explains how to count it for other topologies, and why trimming an entry nothing re-adds exposes a client-supplied address. Unset, nothing changes. `ResolveApiUrlOptions` gains `incomingHeaders?: Headers`, read instead of `next/headers` for the forwarded host, scheme and address, so middleware can pass `request.headers` to `getAccessToken` and `preAuthenticateJWT`.
