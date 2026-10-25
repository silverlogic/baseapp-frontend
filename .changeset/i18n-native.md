---
'@baseapp-frontend/i18n': minor
'@baseapp-frontend/components': patch
---

Support React Native in `@baseapp-frontend/i18n`. `IntlProvider` takes `additionalMessagesByLocale`, and on
native `useLocale().setLocale` switches the provider's locale in place instead of reloading. `getCurrentLocale`
falls back to the device locale when there is no `navigator.language`. The native comments components
(pin badge, show/hide replies, reply button, edited marker, delete dialog, composer banners) are translated
in en, es and pt.
