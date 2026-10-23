---
'@baseapp-frontend/components': minor
---

New `impersonation` module (`@baseapp-frontend/components/impersonation/{common,web,native}`) for
the backend's `baseapp_auth.impersonation` app. `useStartImpersonation` starts a session and reloads
the app as the target user; `useEndImpersonation` ends it and gives the impersonator their own
tokens back, whatever the server answers. `ImpersonationBanner` (web and native, fragment
`ImpersonationBanner_user` on `User`) shows who is impersonated, by whom, the time left and an
End session button, and ends the session when it expires; it says "read only" only when the
session is. `CurrentUserImpersonationBanner` (web) queries `me` itself, and only while a session
runs. `schema.graphql` gains the impersonation mutations, `ImpersonationSession` and
`User.impersonation`.
