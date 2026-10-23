---
"@baseapp-frontend/utils": patch
---

The default `SERVICES_WITHOUT_TOKEN` patterns are now anchored at the start of the path as well as the end (`/^\/register$/`, `/^\/auth\/login$/`, ...). Before, any path that merely ended the same way was sent without the user's token, so an authenticated call such as `/events/1/register` reached the API anonymously. `baseAppFetch` and the axios instances now send the token on those paths.

Technically breaking for apps that call these anonymous endpoints with an extra path prefix (for example `baseAppFetch('/api/auth/login')` with a base URL that doesn't include `/api`). Those calls are now treated as authenticated: they carry the stored access token, and when that token has expired they first refresh it. If the refresh fails, the call is rejected and `LOGOUT_EVENT` is broadcast, so a login or sign-up from someone with stale auth cookies fails once and logs them out, where before it was sent anonymously. To keep such calls anonymous, pass your own patterns through the `servicesWithoutToken` option.
