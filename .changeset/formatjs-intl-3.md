---
"@baseapp-frontend/i18n": patch
"@baseapp-frontend/utils": patch
---

Bump `@formatjs/intl` from 2.10.10 to 3.1.8, the version `react-intl` 7.1.14 depends on, so installs
resolve a single copy and server-side `createIntl` formats with the same FormatJS code as the client.
