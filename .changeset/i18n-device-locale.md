---
"@baseapp-frontend/i18n": minor
"@baseapp-frontend/test": patch
---

Device-language detection works on React Native. `getCurrentLocale` used `navigator.language`
with an `Intl.DateTimeFormat().resolvedOptions().locale` fallback, but Hermes has no
`navigator.language` and the Intl polyfills don't report the device locale, so a Portuguese phone
got English. The new `getDeviceLocale` walks the device's preferred languages (`expo-localization`
`getLocales()`) on native and `navigator.languages` on web, taking the first supported one rather
than only the first entry.

`IntlProvider` no longer flashes the default language on native: the new synchronous
`getInitialLocale` (secure store, then device) seeds the first render, so the mobile root layout
no longer needs to pass the stored language as `initialCookies`. With no stored language the
provider also follows the OS (per-app) language when it changes while the app runs. Apps consuming `@baseapp-frontend/i18n`
on the web should alias `expo-localization` to `false` in their webpack config next to
`expo-secure-store`. `@baseapp-frontend/test` ships an `expo-localization` mock and aliases it in the
shared Vitest and Jest presets.
