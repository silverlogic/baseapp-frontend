# @baseapp-frontend/i18n

## 3.1.1

### Patch Changes

- e107fe1: Translate the strings the new `intl-no-hardcoded-text` / `intl-no-text-constants` ast-grep rules
  found: the native AppBar close label and hint, the group chat image upload toasts, the native group
  member count and the leave-group dialog copy returned by `useLeaveGroup`. `LEAVE_GROUP_DIALOG_TEXT_COPY`
  is deprecated in favour of `LEAVE_GROUP_DIALOG_COPY_MESSAGES`; the unused native `CHAT_TAB_LABEL` is removed.

## 3.1.0

### Minor Changes

- 4bdf85d: Device-language detection works on React Native. `getCurrentLocale` used `navigator.language`
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

### Patch Changes

- @baseapp-frontend/utils@4.5.1

## 3.0.1

### Patch Changes

- 12067e6: Bump `@formatjs/intl` from 2.10.10 to 3.1.8, the version `react-intl` 7.1.14 depends on, so installs
  resolve a single copy and server-side `createIntl` formats with the same FormatJS code as the client.
- 1986d29: Bump `next` from 15.5.28 to 15.5.29 (CVE-2026-119346, CVE-2026-119347, CVE-2026-119348), so
  published installs pick up the patched version.
- Updated dependencies [12067e6]
- Updated dependencies [1986d29]
  - @baseapp-frontend/utils@4.5.1

## 3.0.0

### Minor Changes

- The date helpers in `@baseapp-frontend/utils` take an optional `intl` (and `reference`) so they can
  follow the active locale: `formatRelativeTime` and `formatDateWithDiffNow` stay English when called
  without one (a future timestamp now shows the date instead of "N days ago", and calendar days are
  counted in the intl time zone), and the new `formatTimestamp` and `formatDayLabel` cover comment timestamps
  and day headers. Their messages ship as `utils.date.*` in the utils catalogs, with `INTL_DATE_FORMAT`
  and `INTL_TIME_FORMAT` for the absolute parts. `@baseapp-frontend/i18n`'s `formatRelativeTimeI18n`
  and `formatDateWithDiffNowI18n` delegate to them (the `DATE_MESSAGES` re-export and
  `formatRelativeTimeWithIntl` are gone), and `components` drops its `__shared__/common/dates`
  copy and the `shared.timestamp.*` ids.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@4.5.0

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
