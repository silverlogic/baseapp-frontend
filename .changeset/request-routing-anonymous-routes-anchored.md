---
"@baseapp-frontend/utils": patch
---

The default `SERVICES_WITHOUT_TOKEN` patterns are now anchored at the start of the path as well as the end (`/^\/register$/`, `/^\/auth\/login$/`, ...). Before, any path that merely ended the same way was sent without the user's token, so an authenticated call such as `/events/1/register` reached the API anonymously. `baseAppFetch` and the axios instances now send the token on those paths.

Technically breaking for apps that call these anonymous endpoints with an extra path prefix (for example `baseAppFetch('/api/register')` with a base URL that doesn't include it): those calls now carry the token. To keep them anonymous, pass your own patterns through the `servicesWithoutToken` option.
