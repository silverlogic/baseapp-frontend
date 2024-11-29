import { FC, PropsWithChildren } from 'react'

import { ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { MinimalProfile, NotificationProvider } from '@baseapp-frontend/utils'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { profileAtom } from '../../../../../../../profiles'
import { AccountPopoverProps } from '../../../types'
import defaultTheme from '../../__mocks__/theme'
import { WithProvidersOptions } from './types'

type InitialProfileProp = {
  initialProfile: MinimalProfile | null
}

const HydrateAtoms: FC<PropsWithChildren & InitialProfileProp> = ({ initialProfile, children }) => {
  useHydrateAtoms([[profileAtom, initialProfile]])
  return children
}

const queryClient = new QueryClient()

const withProviders =
  (Component: FC<AccountPopoverProps>) =>
  ({
    environment,
    initialProfile,
    ...props
  }: WithProvidersOptions & AccountPopoverProps & InitialProfileProp) => (
    <JotaiProvider>
      <HydrateAtoms initialProfile={initialProfile}>
        <QueryClientProvider client={queryClient}>
          <RelayTestProvider environment={environment}>
            <ThemeProvider {...defaultTheme}>
              <NotificationProvider>
                <Component {...props} />
              </NotificationProvider>
            </ThemeProvider>
          </RelayTestProvider>
        </QueryClientProvider>
      </HydrateAtoms>
    </JotaiProvider>
  )

export default withProviders
