# @baseapp-frontend/authentication

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
