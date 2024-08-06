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
