# @baseapp-frontend/provider

## 2.0.0

### Major Changes

- Several updates on `ReactQueryProvider` based on React Query v5 breaking changes.
- `ReactQueryProvider` now expects `sendErrorToast`, `toastMessage` and `toastType` meta keys to be sent in order to trigger `onError` message toasts out of the box.
- Update a couple of dependencies.
- Move `react` and `@baseapp-frontend/utils` to `peerDependencies` for better compatibility between the packages and the consumer app.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.4.0

## 1.0.1

### Patch Changes

- Add `@types/react` and `@types/react-dom`.

## 1.0.0

### Major Changes

- Creates Provider package.
- Creates `ReactQueryProvider` component.
