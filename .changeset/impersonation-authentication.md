---
'@baseapp-frontend/authentication': minor
---

Add impersonation token helpers: `swapInImpersonationTokens({ access, refresh })` keeps the current
JWT pair aside and stores an impersonation session's pair in its place, `restoreImpersonatorTokens()`
puts the kept pair back (resolving `false` when there is none), plus `hasImpersonatorTokens()` and
`clearImpersonatorTokens()`. Swapping either way forgets the current profile. `useLogout` now also
removes a kept-aside pair, so logging out during a session signs the impersonator out too; nothing
changes for apps that never impersonate.
