---
'@baseapp-frontend/graphql': minor
---

Add a prototype network seam: `registerPrototypeNetwork()` lets an app (e.g. a no-backend prototype app) answer GraphQL in-process. When a network is registered, `httpFetch` and subscriptions go through it; when none is registered, behaviour is unchanged.
