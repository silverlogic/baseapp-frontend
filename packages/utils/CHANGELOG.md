# @baseapp-frontend/utils

## 2.3.0

### Minor Changes

- Add cookie management functions like `getCookie`. It can optionally enable cookies retrieval on the server side. By doing so, it will force the Next.js page to be dynamically rendered.
- The `getToken` function now uses `getCookie` function and it no longer returns a promise nor needs to be waited/resolved.
- The `baseAppFetch` function can now optionally `throw` api errors if `throwError` option is set to `true`. It is enabled by default.


## 2.2.3

### Patch Changes

- Use native include instead of `lodash`.

## 2.2.2

### Patch Changes

- Add generic response types to `baseAppFetch`.
- Handle `!response.ok` on `getAccessToken`.
- Add pre-auth endpoints to `SERVICES_WITHOUT_TOKEN`.

## 2.2.1

### Patch Changes

- Fix type issue on `BaseAppFetchOptions`.

## 2.2.0

### Minor Changes

- Implement the `baseAppFetch` fetch function.
- Minor changes on `createAxiosInstance` to ensure it won't try to refresh the token for api routes included in `servicesWithoutToken`.
- Implement the `getAccessToken` to abstract only the access token refresh fetch, without setting cookies.
- Minor changes on `refreshAccessToken` to reuse the `getAccessToken` function.

## 2.1.0

### Minor Changes

- Append data in a `FormData` instance when using an axios instance created by `createAxiosInstance` setting `file` and `useFormData` options to `true`. This will be the default behavior when using `axiosForFiles`.
- Create `filterDirtyValues`, `getInitialValues` and `toBase64` util functions.
- Add default parameters to the `refreshAccessToken` function.

## 2.0.0

### Major Changes

- The axios instance will try to refresh the access token on the request interceptor if the JWT token flow is used, enabling the flow to be used with file uploads.
- The getToken function is async now, handle accordingly.
- The refreshAccessToken function was moved to its own file and it won't try to make the request again on a 401 error.
- Some 'use client' directives were added to allow imports on server-side components.

## 1.4.4

### Patch Changes

- Make `OptionalActions` types inside `withController` more flexible.

## 1.4.3

### Patch Changes

- Improve `OptionalActions` types inside `withController`.

## 1.4.2

### Patch Changes

- Add `'./functions/events'` barrel file.

## 1.4.1

### Patch Changes

- Creates the `isUserTokenValid` function.

## 1.4.0

### Minor Changes

- Creates a `getToken` function that can get tokens from the server and client sides.
- Adds `next` dependency.

## 1.3.7

### Patch Changes

- Refactor `setFormApiErrors` so it only sets the form's errors if the API response is appropriate and if the field matches the form key.

## 1.3.6

### Patch Changes

- Allow custom `onChange` and `onBlur` functions to be passed along with a controlled component, without overriding the built-in Controller's functions.

## 1.3.5

### Patch Changes

- Add password regex validation and message constants

## 1.3.4

### Patch Changes

- `servicesWithoutToken` should now be a list of Regex Expressions to match the request url more precisely.

## 1.3.3

### Patch Changes

- Remove `Promise.resolve()` when the request throws a `401` after the refresh token attempt.

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
