# **`@baseapp-frontend/provider`**

## **Overview**

This package includes provider of different kinds that have "use client" directive on top.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/provider
# or
yarn add @baseapp-frontend/provider
# or
pnpm install @baseapp-frontend/provider
```

## **What is in here?**

### **ReactQueryProvider**

A React component that provides the `QueryClient` context to its children using React Query's `QueryClientProvider`.

#### **Parameters**

- `children` (ReactNode): React elements that will have access to the `QueryClient` context.
- `config` (optional): This object is used to provide additional configuration to the `QueryClient`. By default, it's an empty object {}. Check the [React Query's QueryClient documentation](https://react-query.tanstack.com/reference/QueryClient) for all available options.
- `sessionKey` (optional): Names the session the query cache belongs to, usually `getSessionIdentity(access, refresh)` from `@baseapp-frontend/utils`. See [Logout and account switch](#logout-and-account-switch). Without it, one `QueryClient` is shared by the whole browser tab, as before.

#### **Returns**

- `ReactQueryProvider`: Wrapper component

#### **Usage**

```jsx
import React from 'react'

import { ReactQueryProvider } from 'your-react-query-provider-path'

import YourComponent from './YourComponent'

const config = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

const App = ({ children }) => <ReactQueryProvider config={config}>{children}</ReactQueryProvider>

export default App
```

#### **Logout and account switch**

Without a `sessionKey`, the browser keeps one `QueryClient` for the whole tab, so whatever one user
fetched stays cached after a logout or when another user logs in. Pass a `sessionKey` that changes
with the session to give each session its own client:

```tsx
'use client'

import { FC, PropsWithChildren } from 'react'

import { ReactQueryProvider } from '@baseapp-frontend/provider'
import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  getSessionIdentity,
  useCookie,
} from '@baseapp-frontend/utils'

const AppQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cookies } = useCookie()
  const sessionKey = getSessionIdentity(cookies?.[ACCESS_KEY_NAME], cookies?.[REFRESH_KEY_NAME])

  return (
    <ReactQueryProvider sessionKey={sessionKey}>{children}</ReactQueryProvider>
  )
}
```

When the key changes, the children are remounted with a new, empty `QueryClient`. After the change is
committed, the previous client's queries are cancelled and its cache is cleared, so a response from
the old session that arrives late is dropped. The retirement is deferred and cancelled if the same
client mounts again, so React StrictMode's double mount never clears the live client. Unmounting the
provider retires its client too, unless a provider with the same `sessionKey` mounts before the
retirement runs, which keeps it.

In the browser, the current session's client is also kept outside React, like the client used
without a `sessionKey`. So a render that suspends before it commits (e.g. a `useSuspenseQuery` child
with the nearest `Suspense` boundary above the provider) gets the same client on retry instead of
starting a new fetch each time. On the server, every render gets a new client.

`RelayProvider` from `@baseapp-frontend/graphql` takes the same
`sessionKey` for the Relay store.
