import { FC } from 'react'

import { withAuthenticationTestProviders } from '@baseapp-frontend/authentication'
import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web/utils'
import { withGraphqlTestProviders } from '@baseapp-frontend/graphql'
import { compose } from '@baseapp-frontend/utils'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { WithProvidersProps } from './types'

export const withProviders =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithProvidersProps) => {
    const { queryClient, ...restProps } = props

    const defaultQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    return (
      <QueryClientProvider client={queryClient ?? defaultQueryClient}>
        <Component {...(restProps as Props)} />
      </QueryClientProvider>
    )
  }

export const withComponentsProviders = compose(
  withProviders,
  withAuthenticationTestProviders,
  withGraphqlTestProviders,
  withDesignSystemTestProviders,
)
