import React, { FC } from 'react'

import { LoadingState, ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import defaultTheme from '../../__mocks__/theme'
import { WithProvidersOptions } from './types'

const queryClient = new QueryClient()

const withProviders =
  <Props extends object>(Component: FC<Props>) =>
  ({ environment, ...props }: WithProvidersOptions & Props) =>
    (
      <QueryClientProvider client={queryClient}>
        <RelayTestProvider environment={environment}>
          <React.Suspense fallback={<LoadingState />}>
            <ThemeProvider {...defaultTheme}>
              <NotificationProvider>
                <Component {...(props as Props)} />
              </NotificationProvider>
            </ThemeProvider>
          </React.Suspense>
        </RelayTestProvider>
      </QueryClientProvider>
    )

export default withProviders
