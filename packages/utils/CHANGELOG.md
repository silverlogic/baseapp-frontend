# @baseapp-frontend/utils

## 1.1.0

### Minor Changes

- Adds a few changes to `createAxiosInstance`:
  - Adds axios interceptors.
  - Introduces `servicesWithoutToken` that doesn't include the token in the header for certain routes.
  - Decamelizes request params.
  - Adds tests.
- Adds tests for `getApiErrorMessage`, `setFormApiErrors` and `buildQueryString`.
- Creates `withController`, `joinWithSeparator`, `useDebounce`, and `useDjangoOrderBy` alongside tests.

## 1.0.4

### Patch Changes

- Allow custom cookie name for `createAxiosInstance`.

## 1.0.3

### Patch Changes

- Update `getApiErrorMessage` function so it accept more error formats.
- Added first tests into this package.

## 1.0.2

### Patch Changes

- Fix `getApiErrorMessage` types.

## 1.0.1

### Patch Changes

- Exports `createAxiosInstance` and `getApiErrorMessage` functions.

## 1.0.0

### Major Changes

- Creates Provider package.
- Creates constants, functions, hooks and types to be reused between apps and packages.
