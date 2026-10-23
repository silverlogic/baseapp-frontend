---
'@baseapp-frontend/authentication': minor
---

Add impersonation token helpers: `swapInImpersonationTokens({ access, refresh })` keeps the current
JWT pair aside and stores an impersonation session's pair in its place, `restoreImpersonatorTokens()`
puts the kept pair back (resolving `false` when there is none), plus `hasImpersonatorTokens()`,
`clearImpersonatorTokens()` and `isImpersonationSessionToken(token)`. Swapping either way forgets the
current profile, and a swap replaces a pair left aside by an earlier session. `useLogout` now also
removes a kept-aside pair, so logging out during a session signs the impersonator out too, and
`useLogin` removes it once a login succeeds; nothing changes for apps that never impersonate.
