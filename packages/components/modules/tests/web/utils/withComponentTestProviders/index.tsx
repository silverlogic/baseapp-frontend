import { FC } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'

import enMessages from '../../../../../locales/en.json'
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
      <IntlProvider locale="en" messages={enMessages}>
        <QueryClientProvider client={queryClient ?? defaultQueryClient}>
          <Component {...(restProps as Props)} />
        </QueryClientProvider>
      </IntlProvider>
    )
  }

export default withComponentTestProviders
