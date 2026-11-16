---
'@baseapp-frontend/utils': minor
---

Add a prototype fetch seam: `registerPrototypeFetch()` lets an app (e.g. a no-backend prototype app) answer the REST API locally. When a handler is registered, `baseAppFetch` and `getAccessToken` (token refresh) send their requests to it, with the API path instead of a full URL and the requested base URL as context; auth headers, token refresh, key casing and error handling are unchanged. When none is registered, behaviour is unchanged.
