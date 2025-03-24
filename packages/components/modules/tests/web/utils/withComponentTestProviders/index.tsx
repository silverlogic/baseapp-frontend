import { FC } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { WithComponentTestProvidersProps } from './types'

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const withComponentTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithComponentTestProvidersProps) => {
    const { queryClient, ...restProps } = props

    return (
      <QueryClientProvider client={queryClient ?? defaultQueryClient}>
        <Component {...(restProps as Props)} />
      </QueryClientProvider>
    )
  }

export default withComponentTestProviders
