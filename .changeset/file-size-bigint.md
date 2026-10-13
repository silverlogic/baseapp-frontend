---
'@baseapp-frontend/config': patch
'@baseapp-frontend/components': patch
---

`File.fileSize` is a `BigInt` in the GraphQL schema, so files over 2 GB report their size. The
shared Relay config maps `BigInt` to `number`, keeping `fileSize` typed as a number.
