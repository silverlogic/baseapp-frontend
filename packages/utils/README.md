# **`@baseapp-frontend/utils`**

## **Overview**

This package includes constants, functions, hooks and types that are generic enough to be reused between apps and packages.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/utils
# or
yarn add @baseapp-frontend/utils
# or
pnpm install @baseapp-frontend/utils
```

## **What is in here?**

- Generic utility constants, functions, hooks and types.

## **API addresses**

`baseAppFetch`, the axios instances, `getAccessToken` and the GraphQL environment
(`@baseapp-frontend/graphql`) read the API's address from these variables:

| Variable | Example | Used for |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.example.com/v1` or `/v1` | REST |
| `NEXT_PUBLIC_RELAY_ENDPOINT` | `https://api.example.com/graphql` or `/graphql` | GraphQL over HTTP |
| `NEXT_PUBLIC_WS_RELAY_ENDPOINT` | `wss://api.example.com/graphql` or `/graphql` | GraphQL subscriptions |
| `INTERNAL_API_ORIGIN` | `http://web:8000` | Server-side calls to a relative address (server only, read at runtime) |
| `INTERNAL_API_FORWARDED_FOR_TRIM` | `0` (see below) | Optional. Forwards the visitor's address on those server-side calls (server only, read at runtime) |

**Absolute addresses** are called as they are, from the browser and from the server.

**Relative addresses** let one deployment serve several hosts (for example one subdomain per
customer), each calling the API on its own host. The host's proxy must route these paths to the
API.

- In the browser, requests go to the page's own host. The websocket address is built at each
  connection attempt from the page's address (`wss://<page host>/graphql` on an `https` page).
- On the server (SSR, route handlers, middleware), where there is no page address, requests go to
  `INTERNAL_API_ORIGIN` plus the path. They carry the incoming request's host as `X-Forwarded-Host`
  (from its `X-Forwarded-Host`, else `Host`), and its `X-Forwarded-Proto` / `X-Forwarded-Protocol`
  when present, so the API can tell which host the user is on. A call that runs outside a request
  can pass the host itself, e.g. `getAccessToken(refreshToken, { host })`. Without
  `INTERNAL_API_ORIGIN` the call throws.

`INTERNAL_API_ORIGIN` comes from configuration, never from the request, and is never sent to the
browser. Point it at an address only the web server can reach, and make sure the API trusts
`X-Forwarded-Host` only from there.

### Forwarding the visitor's address

Server-side calls come from the web server, so by default the API sees the web server's address
for every SSR request: per-IP throttles, login rate limits and security logs all share one address.
Set `INTERNAL_API_FORWARDED_FOR_TRIM=<n>` to forward the incoming `X-Forwarded-For` on those calls
with its last `n` entries removed. Unset, no `X-Forwarded-For` is sent, as before. It applies only
to calls that go through `INTERNAL_API_ORIGIN`.

The API (for example DRF's `NUM_PROXIES`) trusts the entry a fixed number of places from the end
of the chain, set for requests from the browser. Pick `n` so a server-side call puts the visitor at
that same place:

```
n = (entries added from the visitor to the web server)
  + (entries added from the web server to the API)
  - (entries added from the visitor to the API)
```

Each proxy on a path adds one entry. Count the proxies on each path, including any load balancer.

- **`INTERNAL_API_ORIGIN` reaches the API directly** (for example `http://web:8000`, no proxy
  between the web server and the API) **and the browser reaches the web server and the API through
  the same proxies**: `n` is `0`. The chain is forwarded unchanged, and the API reads the visitor
  where it reads it for a browser request.
- **`INTERNAL_API_ORIGIN` goes through the API's own proxy**, which appends the web server: with a
  browser request reaching the web server as `X-Forwarded-For: 203.0.113.7, 172.18.0.5` (the
  visitor, then the proxy that forwarded it: two entries) and an API that sits behind two proxies
  for browser requests, `n` is `2 + 1 - 2 = 1`. The web server sends
  `X-Forwarded-For: 203.0.113.7`, and the API's proxy turns it into `203.0.113.7, <web server>`,
  the same shape as a request straight from the browser.

If the result is below `0`, leave the variable unset.

> **Warning:** never trim an entry that nothing adds back on the way to the API. Every entry
> removed beyond the formula moves the entry the API trusts one step towards the start of the
> chain, which the visitor controls: they can send any `X-Forwarded-For` they like, and per-IP
> throttles and login rate limits then key on whatever they sent. With a direct
> `INTERNAL_API_ORIGIN`, any value other than `0` does this. A value that is too small is safe but
> keys every server-side call on one of your proxies. After deploying, check the address the API
> logs for an SSR request, and for one that sends a made-up `X-Forwarded-For`.

Middleware can't read the request through `next/headers`, so pass its headers instead. They are
used for the forwarded host, scheme and address:

```ts
// middleware.ts
const accessToken = await getAccessToken(refreshToken, { incomingHeaders: request.headers })
const tokens = await preAuthenticateJWT(token, { incomingHeaders: request.headers })
```

A `host` given on its own still skips reading the request, so nothing beyond `X-Forwarded-Host` is
forwarded.

Mobile apps keep absolute `EXPO_PUBLIC_*` addresses. To use the same rules elsewhere, call
`resolveApiUrl(address)`, which returns `{ url, headers }`, and `resolveWebSocketUrl(address)`
(or `getWebSocketClientUrl(address)` for a `graphql-ws` client's `url` option).

## **Acting as the current profile**

When a user switches profile (for example to an organization they manage), the API acts as that
profile for requests that carry its id in the `Current-Profile` header. `baseAppFetch` and the
GraphQL environment always send it, from the `CurrentProfile` cookie (secure store on mobile).
Axios instances send it when created with `withCurrentProfile: true`:

```ts
import { createAxiosInstance } from '@baseapp-frontend/utils'

export const { axios } = createAxiosInstance({ withCurrentProfile: true })
```

It is read on every request, in the browser and during server rendering, so it follows profile
switches without recreating the instance. No header is sent when there is no current profile, and
a `Current-Profile` header the caller sets on a request, in any letter case, is kept. The default stays `false`, and the
exported `axios` / `axiosForFiles` instances don't send it.

## **Session identity**

`getSessionIdentity(access?, refresh?)` names the current login session without exposing a token:

- `'<principal>:<refresh jti>'` when signed in, where the principal is the access token's `id`,
  else `user_id`, else `sub` claim;
- `'<principal>:access-only'` when there is no decodable refresh token;
- `'anonymous'` without an access token, or when the access token names no principal.

It changes on logout, on login as another user and on a new login as the same user, and stays the
same when the access token is refreshed. Pass it as the `sessionKey` of `RelayProvider`
(`@baseapp-frontend/graphql`) and `ReactQueryProvider` (`@baseapp-frontend/provider`) so neither
cache outlives the session that filled it:

```tsx
'use client'

import { FC, PropsWithChildren } from 'react'

import { RelayProvider } from '@baseapp-frontend/graphql'
import { ReactQueryProvider } from '@baseapp-frontend/provider'
import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  getSessionIdentity,
  useCookie,
} from '@baseapp-frontend/utils'

const SessionProviders: FC<PropsWithChildren> = ({ children }) => {
  const { cookies } = useCookie()
  const sessionKey = getSessionIdentity(cookies?.[ACCESS_KEY_NAME], cookies?.[REFRESH_KEY_NAME])

  return (
    <ReactQueryProvider sessionKey={sessionKey}>
      <RelayProvider sessionKey={sessionKey}>{children}</RelayProvider>
    </ReactQueryProvider>
  )
}
```

On the server, read the same cookies with `getTokenSSR`.

## **Token cookie names**

The JWT pair is stored under these names (cookies on web, secure storage on mobile). They are
exported from `@baseapp-frontend/utils` and `@baseapp-frontend/utils/constants/jwt`.

| Constant | Value | Holds |
|---|---|---|
| `ACCESS_KEY_NAME` | `Authorization` | The access token every request is made with |
| `REFRESH_KEY_NAME` | `Refresh` | The refresh token |
| `IMPERSONATOR_ACCESS_KEY_NAME` | `ImpersonatorAuthorization` | The impersonator's own access token, kept aside while an impersonation session runs |
| `IMPERSONATOR_REFRESH_KEY_NAME` | `ImpersonatorRefresh` | The impersonator's own refresh token, kept aside the same way |

The impersonator pair exists only between the start and the end of a session (see
`@baseapp-frontend/authentication`'s impersonation helpers); `useLogout` removes it.
