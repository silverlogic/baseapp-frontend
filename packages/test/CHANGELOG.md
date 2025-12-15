# @baseapp-frontend/test

## 2.1.6

### Patch Changes

- Update `react` and `react-dom` versions due to `CVE-2025-55183` and `CVE-2025-55184`.

## 2.1.5

### Patch Changes

- Update `react` and `react-dom` versions due to `CVE-2025-55182`.

## 2.1.4

### Patch Changes

- moved dependencies from package.json to pnpm-workspace.yaml catalog
- set NEXT_PUBLIC_API_BASE_URL if it is not defined
- adapted mock functions to work with the template project

## 2.1.3

### Patch Changes

- Update `react`dependencies

## 2.1.2

### Patch Changes

- Unify test and storybook providers

## 2.1.1

### Patch Changes

- Fix lint errors.

## 2.1.0

### Minor Changes

- Update mock files.

## 2.0.6

### Patch Changes

- Add `expo` and `react-native` mock files.

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
