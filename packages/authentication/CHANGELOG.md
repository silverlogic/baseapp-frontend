# @baseapp-frontend/authentication

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
