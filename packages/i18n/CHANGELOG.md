# @baseapp-frontend/i18n

## 2.1.0

### Minor Changes

- 9ae8537: Support React Native in `@baseapp-frontend/i18n`. `IntlProvider` takes a per-locale `additionalMessages` map, and on
  native `useLocale().setLocale` switches the provider's locale in place instead of reloading. `getCurrentLocale`
  falls back to the device locale when there is no `navigator.language`. Every native component in `components`
  (comments, messages, files, notifications, profiles) and `design-system` (feedback screen, password and social
  inputs, photo library hook) now renders its text through react-intl, with en, es and pt catalogs.

## 2.0.0

### Minor Changes

- db2d24d: Translate every web string to English, Spanish and Portuguese through react-intl.
  - `components` and `design-system` web UI render all text via `formatMessage` with ids
    namespaced per module; catalogs ship in `@baseapp-frontend/{components,design-system}/locales`.
    Native code and shared `common/` code used by native are unchanged.
  - Default prop strings (e.g. `cancelText`, `placeholder`, `title`) are now translated fallbacks;
    passing the prop still overrides them.
  - `utils`: `getZodMessages(intl)`, `ZOD_MESSAGE_DESCRIPTORS` and the `IntlFormatter` type.
  - `authentication`: intl factories next to every validation schema
    (`getLoginValidationSchema`, `getSignUpValidationSchema`, `getCodeValidationSchema`, …) and a
    new `mfaFormOptions` option on `useLogin`. Existing schema constants are unchanged.
  - Web components that render text now require an `IntlProvider` ancestor (the package test
    providers include one). The provider ships only the `common.*` catalog: merge the
    `locales` exports of `utils`, `design-system`, `components` (and `wagtail`) per locale with
    the app's own and pass the `{ en, es, pt }` map through `additionalMessages`, otherwise
    those strings fall back to English. Setup is documented in `packages/i18n/README.md`.

### Patch Changes

- Updated dependencies [db2d24d]
  - @baseapp-frontend/utils@4.4.0
