# @baseapp-frontend/test

## 2.0.5

### Patch Changes

- Add additional configuration to `jest.config` file.

## 2.0.4

### Patch Changes

- Making some mocks and configs CommonJS friendly.

## 2.0.3

### Patch Changes

- Add `mockFetch` and `mockFetchError` for mocking `fetch` operations.
- Add `expoSecureStoreMock` mock for `expo-secure-store`.
- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.

## 2.0.2

### Patch Changes

- Add `nextFontMock` file to mock `next/font/google`.

## 2.0.1

### Patch Changes

- Standardize some of dependencies versions.

## 2.0.0

### Major Changes

- Update several dependencies.
- `ComponentWithProviders` creates its own `material-ui`'s theme and `React Query`'s provider. Removed `@baseapp-frontend/design-system-mui` and `@baseapp-frontend/provider` dependencies to avoid circular dependencies.
- Move `react` to `peerDependencies` for better compatibility between the packages and the consumer app.

## 1.1.3

### Patch Changes

- Mock fetch Response on `Jest` tests.

## 1.1.2

### Patch Changes

- Alters the `CookiesGetByNameFn` type.

## 1.1.1

### Patch Changes

- Add `@types/react` and `@types/react-dom`.

- Updated dependencies
  - @baseapp-frontend/design-system-mui@1.4.1
  - @baseapp-frontend/provider@1.0.1

## 1.1.0

### Minor Changes

- Add a default `wrapper` to the `render` method, alongside a new `ComponentWithRootLayout` wrapper.
- Updates on `jest.config` and `tsconfig` files.

## 1.0.1

### Patch Changes

- Remove @baseapp-frontend/utils dependency.

## 1.0.0

### Major Changes

- Creates Test package.
- Exports React Testing Library features.
- Creates functions, mocks and test configurations.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/provider@1.0.0
  - @baseapp-frontend/utils@1.0.0
  - @baseapp-frontend/design-system-mui@1.4.0
