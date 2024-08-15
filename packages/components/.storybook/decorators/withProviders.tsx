import * as React from 'react'

import { LoadingState, ThemeProvider } from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'

import type { StoryContext, StoryFn } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '../../styles/tailwind/globals.css'
import defaultTheme from '../__mocks__/theme'

const queryClient = new QueryClient()

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classess (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1

  const mockResolvers = context.parameters.mockResolvers || {}

  return (
    <QueryClientProvider client={queryClient}>
      <RelayTestProvider mockResolvers={mockResolvers}>
        <React.Suspense fallback={<LoadingState />}>
          <ThemeProvider {...defaultTheme}>
            <NotificationProvider>
              <Story />
            </NotificationProvider>
          </ThemeProvider>
        </React.Suspense>
      </RelayTestProvider>
    </QueryClientProvider>
  )
}

export default withProviders
