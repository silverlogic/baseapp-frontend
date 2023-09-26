# @baseapp-frontend/core

## 2.7.2

### Patch Changes

- Use it's own tsconfig (with `noImplicitAny = false` )
- Updated dependencies
  - @baseapp-frontend/tsconfig@1.1.3

## 2.7.1

### Patch Changes

- Ignore `yupResolver` type error inside `mfaForm`.

## 2.7.0

### Minor Changes

- The `createAxiosInstance` function got parameter changes and small refactors.
- The `react-query` package was updated to `@tanstack/react-query` alongside with adaptions required for this update.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/tsconfig@1.1.0
  - @baseapp-frontend/config@2.1.0

## 2.6.0

### Minor Changes

- Update Next React vesions

## 2.5.3

### Patch Changes

- Add typing to redirectTo

## 2.5.2

### Patch Changes

- Fix redirectTo after unnecessary change

## 2.5.1

### Minor Changes

- Adding cammelcase on axios error responses and option to send query param to the redirectTo route on useUser

## 2.4.1

### Patch Changes

- Add missing provider import.

## 2.4.0

### Minor Changes

- Fix lint after upgrading @baseapp-frontend/config

## 2.3.0

### Minor Changes

- Added @faker-js/faker to mock data in tests and remove hard-coded data

## 2.2.1

### Minor Changes

- Fixing useMfaActivateConfirm hook return type that breaks nextjs baseapp

## 2.2.0

### Minor Changes

- Update the API path for second step of 2FA request (code)

## 2.1.0

### Major Changes

- Multi-factor authentication: add hooks and API methods for MFA REST endpoints

## 2.0.0

### Major Changes

- Replaced formik dependency with react-hook-form

## 1.1.0

### Minor Changes

- Updated following packages:
  - "next": from "^12.1.0" to "^12.2.4",
  - "react": from "^17.0.2" to "^18.2.0",
  - "react-dom": from "^17.0.2" to "^18.2.0",
  - "@testing-library/react":from "^12.1.2" to "^13.3.0",
  - "@testing-library/react-hooks": from "^7.0.2" to "^8.0.1",
  - "react-test-renderer": from "^17.0.2" to "^18.2.0",

## 1.0.0

### Major Changes

- @baseapp-frontend packages creation

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/config@1.0.0
  - @baseapp-frontend/tsconfig@1.0.0
