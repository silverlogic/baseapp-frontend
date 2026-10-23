---
"@baseapp-frontend/utils": minor
"@baseapp-frontend/authentication": patch
---

Server-side calls to a relative API address can now forward the visitor's address. Set the new server-only `INTERNAL_API_FORWARDED_FOR_TRIM=<n>` and `resolveApiUrl` (and with it `baseAppFetch`, the axios instances, `getAccessToken` and `preAuthenticateJWT`) sends the incoming `X-Forwarded-For` with its last `n` entries removed, so the proxy in front of the API keeps the visitor at the same trusted hop position instead of every SSR request coming from the web server's address. Unset, nothing changes. `ResolveApiUrlOptions` gains `incomingHeaders?: Headers`, read instead of `next/headers` for the forwarded host, scheme and address, so middleware can pass `request.headers` to `getAccessToken` and `preAuthenticateJWT`.
