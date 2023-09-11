# @baseapp-frontend/authentication

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
