# @baseapp-frontend/graphql

## 1.3.3

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@4.0.1
  - @baseapp-frontend/authentication@5.0.2

## 1.3.2

### Patch Changes

- Send Current-Profile param on subscription/websocket connection

## 1.3.1

### Patch Changes

- Update config so websockets works properly on Native
- Fix Error msg when missing ChatRoomProvider

## 1.3.0

### Patch Changes

- Updated several dependencies, including `relay`, `react`, and `graphql`to the latest versions
- Removed the use of `getToken`for getting the access token for the WS client (using `js-cookies` instead)
- Updated dependencies
  - @baseapp-frontend/utils@4.0.0

## 1.2.7

### Patch Changes

- Unify test and storybook providers
- Updated dependencies
  - @baseapp-frontend/utils@3.1.6

## 1.2.6

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.5

## 1.2.5

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.4

## 1.2.4

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.3

## 1.2.3

### Patch Changes

- Update mock files.
- Updated dependencies
  - @baseapp-frontend/utils@3.1.2

## 1.2.2

### Patch Changes

- Use package relay-connection-handler-plus

## 1.2.1

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.1

## 1.2.0

### Minor Changes

- Replace `process.env.EXPO_PUBLIC_API_BASE_URL` and `EXPO_PUBLIC_WS_RELAY_ENDPOINT` usage with `getExpoConstant`.
- Updated dependencies
  - @baseapp-frontend/utils@3.1.0

## 1.1.15

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.5

## 1.1.14

### Patch Changes

- Add graphql support to Expo/Mobile environment

## 1.1.13

### Patch Changes

- Adapt `queueOperationResolver` to deal with resolvers or data mocks.

## 1.1.12

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.4

## 1.1.11

### Patch Changes

- Fix an issue with `useEnvironment` entering in a loop on dev mode.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.3

## 1.1.10

### Patch Changes

- Add new helpful mock functions to the react-relay "createTestEnvironment" helper.

## 1.1.9

### Patch Changes

- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.0

## 1.1.8

### Patch Changes

- Rearrange files internally.
- Add `use client` directive on some files.

## 1.1.7

### Patch Changes

- Add `createTestEnvironment` that returns the test `environment` and `resolveMostRecentOperation`. This function can resolve operations by receiving `mockResolvers` or `data`.
- Symplify `RelayTestProvider`, so it doesn't resolve test operations.
- Rearrange files internally.

## 1.1.6

### Patch Changes

- Remove `templateEnv` object to access `process.env` variables.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.3

## 1.1.5

### Patch Changes

- Use `templateEnv` object to access `process.env` variables.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.2

## 1.1.4

### Patch Changes

- Create `RelayTestProvider` to support component testing with `relay-test-utils`.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.1

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
