# @baseapp-frontend/i18n

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
    providers include one).

### Patch Changes

- Updated dependencies [db2d24d]
  - @baseapp-frontend/utils@4.4.0
