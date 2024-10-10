import { FC } from 'react'

import { ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ProfileAccountPopoverProps } from '../../../types'
import defaultTheme from '../../__mocks__/theme'
import { WithProvidersOptions } from './types'

const queryClient = new QueryClient()

const withProviders =
  (Component: FC<ProfileAccountPopoverProps>) =>
  ({ environment, ...props }: WithProvidersOptions & ProfileAccountPopoverProps) => (
    <QueryClientProvider client={queryClient}>
      <RelayTestProvider environment={environment}>
        <ThemeProvider {...defaultTheme}>
          <NotificationProvider>
            <Component {...props} />
          </NotificationProvider>
        </ThemeProvider>
      </RelayTestProvider>
    </QueryClientProvider>
  )

export default withProviders
