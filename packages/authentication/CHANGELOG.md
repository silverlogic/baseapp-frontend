# @baseapp-frontend/authentication

## 4.1.2

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.1

## 4.1.1

### Patch Changes

- Remove `getExpoConstant` from `preAuthenticateJWT` since it is being used on the web app middleware.

## 4.1.0

### Minor Changes

- Adapt `useLogin` to use `isMobilePlatform` to omit current profile logic from mobile platforms.
- Replace `process.env.EXPO_PUBLIC_API_BASE_URL` usage with `getExpoConstant`.
- Adapt `getUser` and `getUserAsync` tests to mock `getToken` and `getTokenAsync`.
- Add `expo` and `react-native` mock files.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.6

## 4.0.7

### Patch Changes

- Update `zod` from 3.23.8 to 3.24.1

## 4.0.6

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.5

## 4.0.5

### Patch Changes

- Remove `useEffect` hook that queues the logout listener.

## 4.0.4

### Patch Changes

- Make sure the log out listener is loaded only once on `useCurrentProfile`.
- Fix `useLogin` adding optional chaining to a problematic expression.
- Move `InitialProfileProviderForTesting` around.

## 4.0.3

### Patch Changes

- Use jotai global state and cookies to keep track of the current profile. CurrentProfileProvider is removed, use "const { currentProfile, setCurrentProfile } = useCurrentProfile()" to read and modify the current profile, respectively.

## 4.0.2

### Patch Changes

- asd
- Updated dependencies
  - @baseapp-frontend/utils@3.0.4

## 4.0.1

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.3

## 4.0.0

### Major Changes

- `useLogin` now uses `setTokenAsync` to set access/refresh tokens for both web and mobile platforms.
- Remove `useSimpleTokenLogin` and `useSimpleTokenUser` hooks along side with the remaning simple token logic on several functions, that should now only for with JWT tokens and API's.
- `useLogout` now uses `removeTokenAsync` to remove access/refresh tokens for both web and mobile platforms.
- Switch from `axios` to `baseAppFetch` on the `AuthApi` and `UserApi` as it was causing issues on the mobile app.
- Add common and reusable dependencies to the `pnpm` catalog.
- Create `getUserAsync` function, an async version of `getUser`.
- Rename the options `cookieName` and `refreshCookieName` to `accessKeyName` and `refreshKeyName` on several functions.
- Update tsconfig to use `lib.json`.
- Add `type` prefix for type imports.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.0

## 3.2.5

### Patch Changes

- Replaced useLogin parameters `validationSchema` and `defaultValues` by unique object `loginFormOptions`
- Replaced useSignUp parameters `validationSchema` and `defaultValues` by unique object `formOptions`

## 3.2.4

### Patch Changes

- Replaced `firstName` and `lastName` with `name` in `RegisterRequest,` interface
- Replaced `firstName` and `lastName` with `name` in `useSignUp` validation schema and form default values

## 3.2.3

### Patch Changes

- Trim `process.env` variables used in comparisons.
- Remove `templateEnv` object to access `process.env` variables.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.3

## 3.2.2

### Patch Changes

- Use `templateEnv` object to access `process.env` variables.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.2

## 3.2.1

### Patch Changes

- Remove `@baseapp-frontend/provider` and `@baseapp-frontend/utils` from `dependencies`.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.1

## 3.2.0

### Minor Changes

- Store the user language preference on cookies
- Sends the Accept-Language HEADER based on user language preference (HTTP calls and GraphQL)

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.5.0
  - @baseapp-frontend/provider@2.0.2

## 3.1.0

### Minor Changes

- Add change expired password logic in useLogin and add change expired password api

## 3.0.1

### Patch Changes

- `preAuthenticateJWT` uses normal fetch to avoid Node.js module not supported in the Edge Runtime error when used in the `middleware`.
- Standardize some of dependencies versions.
- Updated dependencies
  - @baseapp-frontend/provider@2.0.1

## 3.0.0

### Major Changes

- Migrate to React Query v5. This includes adapting the code due to breaking changes of the library.
- Update several dependencies.
- Remove deprecated `usePreAuth` hook. We should now pre authenticate on the server side using the `preAuthenticate` function.
- Renamed a couple of type interfaces, mainly removing the `I` prefix from it.
- Move `react`, `@baseapp-frontend/provider` and `@baseapp-frontend/utils` to `peerDependencies` for better compatibility between the packages and the consumer app.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/provider@2.0.0
  - @baseapp-frontend/utils@2.4.0

## 2.2.0

### Minor Changes

- The `useJWTUser` hook now uses `getUser` function to retrieve the user's data. The `noSSR` option is set to `false` by default, which allows cookies to be retrieved right away on the server, but also forces the Next.js page to be dynamically rendered.
- The `getUser` is no longer an async function or returns awaits for the `getToken` return.
- The `withUser` is no longer an async function or returns awaits for the `getUser` return.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.3.0

## 2.1.3

### Patch Changes

- Remove barrel file imports since such functions are meant to be used in a `middleware`.
- Updated dependencies
  - @baseapp-frontend/utils@2.2.3

## 2.1.2

### Patch Changes

- Add `preAuthenticateJWT` function to be used on the server side.
- Deprecates the `usePreAuth` hook.
- Updated dependencies
  - @baseapp-frontend/utils@2.2.2

## 2.1.1

### Patch Changes

- Export variables from `services/auth`

## 2.1.0

### Minor Changes

- Create `useJWTUser` and `useUpdateUser` for user management in the client side using JWT.
- Rename the constant `PRE_AUTH_API_KEY` to `AUTH_API_KEY`.
- Add `phoneNumber` field to the `IUser` interface.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.1.0

## 2.0.1

### Patch Changes

- Creates `withUser` HOC and `ComponentWithUser` type. `withUser`'s JSDoc contains a more detailed information about its usage.

## 2.0.0

### Major Changes

- The getUser function is async now, handle accordingly.
- Some types were added to make testing easier.

### Patch Changes

- Updated dependencies [2300f2d]
  - @baseapp-frontend/utils@2.0.0

## 1.2.6

### Patch Changes

- Remove the import from barrel files inside the `getUser` function.
- This has become necessary because we are not eliminating not used code that comes with the barrel file, and functions like `getUser` can be executed in environments that do not support some features that are being exported in the same barrel file, like `useDebounce`.

## 1.2.5

### Patch Changes

- Add `emitLogoutEvent` option to the `useLogout` hook. By default, it will emit the `LOGOUT_EVENT`. That's useful when you have subscribed to that event and want to execute some action after the event is triggered.
- Updated dependencies
  - @baseapp-frontend/utils@1.4.2

## 1.2.4

### Patch Changes

- Creates a `getUser` function that allows to get the user token on the server side and can be used by both Client and Server Components.
- Deprecates the `useUser` hook.
- Updated dependencies
  - @baseapp-frontend/utils@1.4.0

## 1.2.3

### Patch Changes

- Add `enableFormApiErrors` option to all the hooks that were using `setFormApiErrors`. It now conditionally sets form errors based on the API response.
- Add the `mode` option to the `useSignUp` hook.
- Updated dependencies
  - @baseapp-frontend/utils@1.3.7

## 1.2.2

### Patch Changes

- Pre Authenticated URL handling
- Short URL handling

## 1.2.1

### Patch Changes

- Remove `acceptConsent` and `phoneNumber` from signup form validations
- Add password validations for `useSignup`
- Updated dependencies
  - @baseapp-frontend/utils@1.3.5

## 1.2.0

### Minor Changes

- Replaces `yup` for `zod` as schema validation utility.
- Add tests to `defaultValues` and `validationSchema` props to ensure that customization works.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@1.3.1

## 1.1.4

### Patch Changes

- Update `useResetPassword` so it expects to receive a token as a hook parameter.
- Set `onBlur` mode for most of the hookes that uses `useForm`.
- Add a `{}` fallback for some hook'`s options.

- Updated dependencies
  - @baseapp-frontend/utils@1.3.0

## 1.1.3

### Patch Changes

- Update auth endpoint url path to match baseapp-django-v3. The default login path is `/auth/login` for both Simple Token and JWT auth.

## 1.1.2

### Patch Changes

- Add an `ApiClass` option to all hooks that use some internal api class like `AuthApi` or `UserApi`. The user would be able to use its own api class, as long it has the required methods that each hook needs.

## 1.1.1

### Patch Changes

- Add types to `handleLoginSuccess` function.

- Updated dependencies
  - @baseapp-frontend/utils@1.2.1

## 1.1.0

### Minor Changes

- Added the JWT authentication flow and tools

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@1.2.0

## 1.0.3

### Patch Changes

- Redesigning `useLogout` hook

  - It now returns an object instead of a function
  - It now uses `resetQueries` instead of `invalidateQueries` in order to reset the user cache properly.

- Updated dependencies
  - @baseapp-frontend/utils@1.1.0

## 1.0.2

### Patch Changes

- Reset user cache when `useUser` throws a 401 error.
  - It was using `invalidateQueries` but this doesn't necessarily clean the user cache response, so changing to `resetQueries` is more effective.

## 1.0.1

### Patch Changes

- Allows more hook's options to be overridable.
- Updated dependencies
  - @baseapp-frontend/utils@1.0.1

## 1.0.0

### Major Changes

- Creates Authentication package.
- Creates `access`, `mfa` and `user` modules alongside its services api's and types.
- Migrate authentication methods and tests from the `core` package.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/provider@1.0.0
  - @baseapp-frontend/utils@1.0.0
