import { FC } from 'react'

import { InitialProfileProp, InitialProfileProvider } from '@baseapp-frontend/authentication'
import { ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'

import { AccountPopoverProps } from '../../../types'
import defaultTheme from '../../__mocks__/theme'
import { WithProvidersOptions } from './types'

const queryClient = new QueryClient()

const withProviders =
  (Component: FC<AccountPopoverProps>) =>
  ({
    environment,
    initialProfile,
    ...props
  }: WithProvidersOptions & AccountPopoverProps & InitialProfileProp) => (
    <JotaiProvider>
      <InitialProfileProvider initialProfile={initialProfile}>
        <QueryClientProvider client={queryClient}>
          <RelayTestProvider environment={environment}>
            <ThemeProvider {...defaultTheme}>
              <NotificationProvider>
                <Component {...props} />
              </NotificationProvider>
            </ThemeProvider>
          </RelayTestProvider>
        </QueryClientProvider>
      </InitialProfileProvider>
    </JotaiProvider>
  )

export default withProviders
