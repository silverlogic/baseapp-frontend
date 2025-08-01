# @baseapp-frontend/utils

## 4.0.1

### Minor Changes

- Introduced a new `useAppStateSubscription` hook that allows developers to register a callback (onAppResume) which runs whenever the app returns to the foreground. E.g. after a user unlocks their device or switches back to the app.

## 4.0.0

### Major Changes

- **BREAKING:** Removed SSR support from cookie and token functions
  - Added `'use client'` directive to `getCookie`, `getToken`, `setTokenAsync`, and `removeTokenAsync` - these are now client-side only
  - Removed `noSSR` parameter from `getCookie`, `getToken`, and related types
  - Removed `getCookieAsync` function entirely
  - For server-side token retrieval, use the new `getTokenSSR` function instead

- **BREAKING:** Removed deprecated `getTokenAsync` function
  - Deleted `getTokenAsync` function and all related tests

- **BREAKING:** Removed deprecated cookie constants
  - Deleted `ACCESS_COOKIE_NAME` and `REFRESH_COOKIE_NAME` constants
  - These were already deprecated in favor of `ACCESS_KEY_NAME` and `REFRESH_KEY_NAME`

- **BREAKING:** Updated `refreshAccessToken` API
  - Now requires explicit `refreshToken` parameter object
  - Updated function signature: `refreshAccessToken({ refreshToken, accessKeyName, refreshKeyName })`
  - No longer retrieves refresh token internally

- **BREAKING:** Removed `ServerSideRenderingOption` type
  - Deleted `types/server.ts` file entirely
  - Updated all function signatures to remove SSR-related options

- Added new `getTokenSSR` module for server-side token retrieval
- Added new `useCookie` hook with store-based architecture for client-side cookie management
- Added new `parseString` utility function for safe JSON parsing
- Enhanced token and cookie functions to work with React Server Components (RSC)
- Updated `createAxiosInstance` and `baseAppFetch` to handle SSR/client-side token retrieval automatically
- Updated `getLanguage` function to work with mobile platforms using expo-secure-store

### Migration Guide

- Replace `getCookie({ noSSR: true })` with `getCookie()` (client-side only)
- Replace `getToken({ noSSR: true })` with `getToken()` (client-side) or `getTokenSSR()` (server-side)
- Replace `getCookieAsync()` calls with `getCookie()` or server-side cookie retrieval (using `nextjs` headers)
- Replace `getTokenAsync()` calls with `getToken()` or `getTokenSSR()`
- Update `refreshAccessToken(accessKey, refreshKey)` to `refreshAccessToken({ refreshToken: token, accessKeyName: accessKey, refreshKeyName: refreshKey })`
- Remove usage of deprecated `ACCESS_COOKIE_NAME` and `REFRESH_COOKIE_NAME` constants, use `ACCESS_KEY_NAME` and `REFRESH_KEY_NAME` instead
- Use `useCookie` hook for reactive cookie state management in React components

## 3.1.6

### Patch Changes

- Unify test and storybook providers

## 3.1.5

### Patch Changes

- Implement a snackbar component with a 'progress bar' indicating the remaining time before it automatically disappears

## 3.1.4

### Patch Changes

- setFormApiErrors also handles Error objects

## 3.1.3

### Patch Changes

- Fix lint errors.

## 3.1.2

### Patch Changes

- Update mock files.

## 3.1.1

### Patch Changes

- Display form relay errors also on null and blank fields

## 3.1.0

### Minor Changes

- Update `createAxiosInstance` to achieve feature parity with `baseAppFetch` adding `decamelizeRequestBodyKeys`, `decamelizeRequestParamsKeys`, `camelizeResponseDataKeys`, `stringifyBody`, `setContentType`, `baseUrl` optional params.
- `baseAppFetch` accept `text/plain, */*` by default, like axios do.
- Replace `process.env.EXPO_PUBLIC_API_BASE_URL` usage with `getExpoConstant`.
- Replace `process.env.EXPO_PUBLIC_PLATFORM` usage with `isMobilePlatform`.
- Add `expo` and `react-native` mock files.

## 3.0.5

### Patch Changes

- Remove events from catalogs.
- Use stable versions on core dependencies.

## 3.0.4

### Patch Changes

- `withController` have an option for debounce the `handleChange` function provided.

## 3.0.3

### Patch Changes

- Add `isToday`, `isYesterday` and `datesDontHaveSameDay` date functions.

## 3.0.2

### Patch Changes

- `getCookie` and `getCookieAsync` won't parse the value as default.
- `setCookie` won't stringfy the value as default.

## 3.0.1

### Patch Changes

- Adds `use-client` directive to `useSSR` and `useBoolean`.

## 3.0.0

### Major Changes

- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.
- Remove simple token logic on several functions, that should now only for with JWT tokens and API's. Most noticiable changes were made on `createAxiosInstance` and `baseAppFetch`.
- `getToken` can now get token on both mobile and web by looking at the `EXPO_PUBLIC_PLATFORM` env variable.
- Introduce `EXPO_PUBLIC_API_BASE_URL` as an the api URL to be used on mobile platforms on `getAccessToken` and `baseAppFetch` functions.
- Create `removeTokenAsync` function to remove access/refresh tokens for both web and mobile platforms.
- Create `setTokenAsync` function to set access/refresh tokens for both web and mobile platforms.
- Adapt `refreshAccessToken` to use `setTokenAsync` and `removeTokenAsync` to set/remove access/refresh tokens for both web and mobile platforms.
- Create `getTokenAsync` function, an async version of `getToken`.
- Create `getCookieAsync` function, an async version of `getCookie`.
- Rename the options `cookieName` and `refreshCookieName` to `accessKeyName` and `refreshKeyName` on several functions.
- Deprecate `ACCESS_COOKIE_NAME` and `REFRESH_COOKIE_NAME` in favor of `ACCESS_KEY_NAME` and `REFRESH_KEY_NAME` constans.

## 2.5.6

### Patch Changes

- Moved setFormRelayErrors from baseapp-frontend/components to baseapp-frontend/utils

## 2.5.5

### Patch Changes

- Added useLogoOverrides hook and Dropzone component to Design System
  Added getImageString to Utils pkg

## 2.5.4

### Patch Changes

- Add `useBoolean` hook

## 2.5.3

### Patch Changes

- Trim `process.env` variables used in comparisons.
- Remove `templateEnv` object to access `process.env` variables.

## 2.5.2

### Patch Changes

- Create and use `templateEnv` object to access `process.env` variables.

## 2.5.1

### Patch Changes

- Add date format utilities.
- `baseAppFetch` throws `JSON.stringfy` error messages.
- `getApiErrorMessage` can parse `JSON.stringfy` error messages.

## 2.5.0

### Minor Changes

- Store the user language preference on cookies
- Sends the Accept-Language HEADER based on user language preference (HTTP calls and GraphQL)

## 2.4.0

### Minor Changes

- Update several dependencies.
- Move `react` to `peerDependencies` for better compatibility between the packages and the consumer app.
- Renamed a couple of type interfaces, mainly removing the `I` prefix from it.

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
