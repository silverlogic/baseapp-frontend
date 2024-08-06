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
