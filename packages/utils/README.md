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

Mobile apps keep absolute `EXPO_PUBLIC_*` addresses. To use the same rules elsewhere, call
`resolveApiUrl(address)`, which returns `{ url, headers }`, and `resolveWebSocketUrl(address)`
(or `getWebSocketClientUrl(address)` for a `graphql-ws` client's `url` option).
