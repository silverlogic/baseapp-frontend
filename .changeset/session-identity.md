---
"@baseapp-frontend/utils": minor
---

Add `getSessionIdentity(access?, refresh?)` (`functions/token`). It returns
`<principal>:<refresh token jti>` for a signed-in user (`<principal>:access-only` without a
decodable refresh token) or `'anonymous'`, where the principal is the access token's `id`, else
`user_id`, else `sub`. It changes on logout, on login as another user and on a new login as the same
user, but not when the access token is refreshed, so it can key per-session caches such as the new
`sessionKey` of `RelayProvider` and `ReactQueryProvider`.
