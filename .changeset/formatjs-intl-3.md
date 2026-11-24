---
"@baseapp-frontend/i18n": patch
"@baseapp-frontend/utils": patch
---

Bump `@formatjs/intl` from 2.10.10 to 3.1.8, the version `react-intl` 7.1.14 depends on, so an
`IntlShape` built with `createIntl` on the server and one from `useIntl()` share a single type.
