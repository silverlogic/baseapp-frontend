# @baseapp-frontend/graphql

## 1.1.3

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.5.0

## 1.1.2

### Patch Changes

- Update a couple of dependencies.
- Move `react` and `@baseapp-frontend/utils` to `peerDependencies` for better compatibility between the packages and the consumer app.

## 1.1.1

### Patch Changes

- `connectionParams` function on the `wsClient` is now sync and don't wait for the `getToken` response.
- Updated dependencies
  - @baseapp-frontend/utils@2.3.0

## 1.1.0

### Minor Changes

- `httpFetch` function now uses the `baseAppFetch` as its fetch function.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.2.0

## 1.0.4

### Patch Changes

- 4ee7df9: fix graphql token is async

## 1.0.3

### Patch Changes

- Add Invalidate Relay Store hook

## 1.0.2

### Patch Changes

- Imports the `getToken` function from the `@baseapp-frontend/utils` package.
- Removes `next` dependency.
- Updated dependencies
  - @baseapp-frontend/utils@1.4.0

## 1.0.1

### Patch Changes

- No longer exports the `relay.config.ts` file.

## 1.0.0

### Major Changes

- Creates the `graphql` package.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@1.3.7
