# @baseapp-frontend/utils

## 1.3.2

### Patch Changes

- Update `withController` so it passes a `helperText` props even if there is no `control` props used.

## 1.3.1

### Patch Changes

- Add `ZOD_MESSAGE` constant with reusable validation messages.

## 1.3.0

### Minor Changes

- Update `withController` so it passes a `helperText` and an `error` prop to the component. So it fits better the MUI's error display dynamic.

## 1.2.2

### Patch Changes

- Cast types instead of using `camelizeKeys` generic.
- Add missing export for `useDjangoOrderBy` hook.

## 1.2.1

### Patch Changes

- Add types to the `refreshAccessToken` function.
- Fix test types taht were using implict `any`.
- Import missing types.

## 1.2.0

### Minor Changes

- Added the JWT authentication flow and tools

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
