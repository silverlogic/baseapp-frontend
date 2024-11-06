import React from 'react'

import { LoadingState, ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider, createTestEnvironment } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import type { StoryContext, StoryFn } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CurrentProfileProvider from '../../modules/profiles/context/CurrentProfileProvider'
import '../../styles/tailwind/globals.css'
import defaultTheme from '../__mocks__/theme'

const queryClient = new QueryClient()

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classess (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1
  const relayMockEnvironment = createTestEnvironment()
  const { environment, queueOperationResolver } = relayMockEnvironment

  context.parameters.relayMockEnvironment = relayMockEnvironment

  const mockResolvers = context.parameters.mockResolvers || {}

  queueOperationResolver(mockResolvers)

  return (
    <QueryClientProvider client={queryClient}>
      <RelayTestProvider environment={environment}>
        <React.Suspense fallback={<LoadingState />}>
          <ThemeProvider {...defaultTheme}>
            <NotificationProvider>
              <CurrentProfileProvider>
                <Story />
              </CurrentProfileProvider>
            </NotificationProvider>
          </ThemeProvider>
        </React.Suspense>
      </RelayTestProvider>
    </QueryClientProvider>
  )
}

export default withProviders
