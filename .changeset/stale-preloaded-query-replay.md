---
'@baseapp-frontend/graphql': patch
---

Fix stale data overwriting fresh mutation results after client-side navigation. `useSerializablePreloadedQuery` re-wrote the SSR-serialized query response into the `QueryResponseCache` on every mount, and the `store-and-network` fetch policy then committed it to the Relay store. In production, Next.js can re-deliver an old RSC payload (client router cache on back/forward navigation, prefetch entries), so a response fetched before a mutation would clobber the fields the mutation had just updated — e.g. editing the profile headline and still seeing the old value until a hard refresh. Serialized payloads now carry a `fetchedAt` timestamp and are only replayed while younger than the response-cache TTL; older payloads are skipped so the page renders from the store and revalidates over the network.
