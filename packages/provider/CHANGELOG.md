# @baseapp-frontend/provider

## 2.0.19

### Patch Changes

- Update `react` and `react-dom` versions due to `CVE-2025-55182`.
- Updated dependencies
  - @baseapp-frontend/utils@4.0.5

## 2.0.18

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@4.0.4

## 2.0.17

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@4.0.3

## 2.0.16

### Patch Changes

- moved dependencies from package.json to pnpm-workspace.yaml catalog
- Updated dependencies
  - @baseapp-frontend/utils@4.0.2

## 2.0.15

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@4.0.1

## 2.0.14

### Patch Changes

- Update `react`dependencies
- Updated dependencies
  - @baseapp-frontend/utils@4.0.0

## 2.0.13

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.6

## 2.0.12

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.5

## 2.0.11

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.4

## 2.0.10

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.3

## 2.0.9

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.2

## 2.0.8

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.1

## 2.0.7

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.0

## 2.0.6

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.5

## 2.0.5

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.4

## 2.0.4

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.3

## 2.0.3

### Patch Changes

- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.0

## 2.0.2

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.5.0

## 2.0.1

### Patch Changes

- Standardize some of dependencies versions.

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
