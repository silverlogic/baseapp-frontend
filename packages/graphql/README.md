# **`@baseapp-frontend/graphql`**

## **Overview**

This package includes GraphQL's configurations and utilities.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/graphql
# or
yarn add @baseapp-frontend/graphql
# or
pnpm install @baseapp-frontend/graphql
```

## **Setup**

In order to use this package you will need to:

- create `relay.config.js` file at the root level:

```ts
module.exports = require('@baseapp-frontend/graphql/relay.config.ts')
```

- add relay compiler configuration under `next.config.js`:
  ```ts
  const nextConfig = {
    // ...
    transpilePackages: [
      // ...
      '@baseapp-frontend/graphql', // make sure to add this package under `transpilePackages` as well
    ],
    compiler: {
      relay: {
        src: './',
        language: 'typescript',
        artifactDirectory: '__generated__',
      },
    },
  }
  ```

````

In order to use common `Relay` features like `usePreloadedQuery` or `graphql` and to be able to create the generated files and download the graphql schema, you may need to install these additional dependencies (they're also present in the `@baseapp-frontend/graphql` dependencies, so make sure to install the same versions):

- install dependecies
```bash
    yarn add react-relay@^16.2.0
    yarn add -D relay-compiler@^16.2.0 @types/react-relay@^16.0.6
````

## **What is in here?**

### **RelayProvider**

This wrapper leverages the [RelayEnvironmentProvider](https://relay.dev/docs/api-reference/relay-environment-provider/#relayenvironmentprovider) from `react-relay` to supply a Relay environment throughout your application component tree.

It uses `useEnvironment` from `config/environment` for dynamic Relay environment configuration.

#### **Props**

- `children` (required): The child components that will receive access to the Relay environment.
- `sessionKey` (optional): Names the session the environment belongs to, usually
  `getSessionIdentity(access, refresh)` from `@baseapp-frontend/utils`. When it changes, the
  children are remounted with a new, empty environment and the previous one is disposed (see
  [Logout and account switch](#logout-and-account-switch)). Without it, one environment is kept for
  the provider's lifetime, as before.
- `environment` (optional): An environment you create and own. The provider uses it as is, ignores
  `sessionKey` and never disposes it.

#### **Usage**

To utilize `RelayProvider`, wrap your application or specific components where Relay functionality is needed.

- `RelayProvider` usage example inside the root layout:

  ```tsx
  import { RelayProvider } from '@baseapp-frontend/graphql'

  const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
      <html lang="en">
        <body>
          <RelayProvider>{children}</RelayProvider>
        </body>
      </html>
    )
  }

  export default RootLayout
  ```

### **Logout and account switch**

A Relay environment caches everything its user fetched: the store, the preloaded-query responses
and an authenticated websocket for subscriptions. When the user logs out or another user logs in,
none of that may reach the next user. Give `RelayProvider` a `sessionKey` that changes with the
session:

```tsx
'use client'

import { RelayProvider } from '@baseapp-frontend/graphql'
import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  getSessionIdentity,
  useCookie,
} from '@baseapp-frontend/utils'

const SessionRelayProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cookies } = useCookie()
  const sessionKey = getSessionIdentity(cookies?.[ACCESS_KEY_NAME], cookies?.[REFRESH_KEY_NAME])

  return <RelayProvider sessionKey={sessionKey}>{children}</RelayProvider>
}
```

When the key changes:

- the children are remounted under a new environment, so no component state or query from the old
  session survives;
- after the change is committed, the old environment is disposed with `disposeEnvironment`. The
  disposal is deferred and cancelled if the same environment mounts again, so React StrictMode's
  double mount never disposes the live environment. Unmounting the provider disposes it too.

`getSessionIdentity` keeps the same key when the access token is refreshed, so a refresh does not
reset the page. `ReactQueryProvider` from `@baseapp-frontend/provider` takes the same `sessionKey`
for the React Query cache.

#### **disposeEnvironment**

`disposeEnvironment(environment)` retires an environment yourself, e.g. in a React Native app that
keeps its environment outside React. It:

- clears the preloaded-query response cache;
- empties the store, including records written by a pending optimistic update, and notifies mounted
  queries;
- fails every HTTP request still in flight with an `EnvironmentDisposedError` (exported), right
  away. What such a request returns later, data or error, is ignored, so a response for the old
  session never lands in the emptied store. A request made after the disposal, even for the same
  query, starts a new fetch;
- closes the environment's websocket. Transport errors are swallowed, so logging out never fails
  because of the socket.

Each environment created with `createEnvironment()` has its own websocket client, opened on the
first subscription, so disposing one environment never closes another's subscriptions. Prefer a new
environment for the next session. An environment used again after disposal starts empty, is filled
only by requests made after the disposal, and opens a new websocket with the credentials of that
moment. Components still mounted that were waiting for a request in flight receive the
`EnvironmentDisposedError`; check `error.name` to tell it apart from a network failure.

#### **useEnvironment**

`useEnvironment(sessionKey?)` is the hook behind `RelayProvider`: it returns the environment for the
current `sessionKey` and disposes retired ones as described above. Without a key it keeps one
environment for the component's lifetime and never disposes it.

### **withRelay**

`withRelay` is a higher-order component for components that uses GraphQL preloaded queries.

#### **Parameters**

- `Component`: React component.
- `fallback` (optional): A React element or string to display while the query is loading. Default to 'Loading...'.
- `fetchPolicy` (optional): Defines the query fetching policy. Default to 'store-or-network'.

#### **Usage**

- `withRelay` usage example in a client component that receives a pre loaded query:

  ```tsx
  'use client'

  import { FC } from 'react'

  import { ComponentWithQueryRef, withRelay } from '@baseapp-frontend/graphql'

  import ClientComponentTestQueryNode, {
    ClientComponentTestQuery,
  } from '__generated__/ClientComponentTestQuery.graphql'
  import { graphql, usePreloadedQuery } from 'react-relay'

  const ClientComponent: FC<ComponentWithQueryRef<ClientComponentTestQuery>> = ({ queryRef }) => {
    const data = usePreloadedQuery(
      graphql`
        query ClientComponentTestQuery {
          user {
            id
            name
            bio
          }
        }
      `,
      queryRef,
    )

    return <h1>{data.user?.bio}</h1>
  }

  export default withRelay<typeof ClientComponentTestQueryNode, ClientComponentTestQuery>(
    ClientComponent,
    { fallback: 'A different loading fallback', fetchPolicy: 'store-and-network' },
  )
  ```

- A parent component that pre loads a query and passes it over to the `ClientComponent`:

  ```tsx
  import { loadSerializableQuery } from '@baseapp-frontend/graphql'

  import ClientComponentTestQueryNode, {
    ClientComponentTestQuery,
  } from '__generated__/ClientComponentAboutArtistRegisterQuery.graphql'

  import ClientComponent from './ClientComponent'

  const ParentComponent = async () => {
    const preloadedQuery = await loadSerializableQuery<
      typeof ClientComponentTestQueryNode,
      ClientComponentTestQuery
    >(ClientComponentTestQueryNode.params, {})

    return (
      <div>
        <ClientComponent preloadedQuery={preloadedQuery} />
      </div>
    )
  }

  export default ParentComponent
  ```
