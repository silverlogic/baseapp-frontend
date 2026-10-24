---
"@baseapp-frontend/components": minor
"@baseapp-frontend/design-system": minor
"@baseapp-frontend/utils": minor
"@baseapp-frontend/authentication": minor
"@baseapp-frontend/i18n": minor
---

Translate every web string to English, Spanish and Portuguese through react-intl.

- `components` and `design-system` web UI render all text via `formatMessage` with ids
  namespaced per module; catalogs ship in `@baseapp-frontend/{components,design-system}/locales`.
  Native code and shared `common/` code used by native are unchanged.
- Default prop strings (e.g. `cancelText`, `placeholder`, `title`) are now translated fallbacks;
  passing the prop still overrides them.
- `utils`: `getZodMessages(intl)`, `ZOD_MESSAGE_DESCRIPTORS` and the `IntlFormatter` type.
- `authentication`: intl factories next to every validation schema
  (`getLoginValidationSchema`, `getSignUpValidationSchema`, `getCodeValidationSchema`, …) and a
  new `mfaFormOptions` option on `useLogin`. Existing schema constants are unchanged.
- `i18n`: `IntlProviderWrapper` accepts `additionalMessagesByLocale`; the app-specific
  `settings.*` messages moved out of the package catalog.
- Web components that render text now require an `IntlProvider` ancestor (the package test
  providers include one).
