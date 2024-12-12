import React, { useEffect } from 'react'

import { LoadingState, ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider, createTestEnvironment } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import type { StoryContext, StoryFn } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'

import '../../styles/tailwind/globals.css'
import defaultTheme from '../__mocks__/theme'

const queryClient = new QueryClient()

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classess (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1
  const relayMockEnvironment = createTestEnvironment()
  const { environment, queueOperationResolver } = relayMockEnvironment

  context.parameters.relayMockEnvironment = relayMockEnvironment

  const queryName = context.parameters.queryName || undefined
  const mockResolvers = context.parameters.mockResolvers || undefined
  const mockData = context.parameters.mockData || {}

  queueOperationResolver({ mockResolvers, data: mockData, queryName })

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <RelayTestProvider environment={environment}>
          <React.Suspense fallback={<LoadingState />}>
            <ThemeProvider {...defaultTheme}>
              <NotificationProvider>
                <Story />
              </NotificationProvider>
            </ThemeProvider>
          </React.Suspense>
        </RelayTestProvider>
      </QueryClientProvider>
    </JotaiProvider>
  )
}

export default withProviders
