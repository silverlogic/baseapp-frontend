import * as React from 'react'

import {
  LoadingState,
  ThemeProvider,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  primaryFont,
  secondaryFont,
  typography,
} from '@baseapp-frontend/design-system'
import { RelayTestProvider } from '@baseapp-frontend/graphql'
import { NotificationProvider } from '@baseapp-frontend/utils'
import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils/constants/cookie'

import type { Preview, StoryContext, StoryFn } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '../styles/tailwind/globals.css'
import { handlers } from './__mocks__/handlers'

// TODO move to a separate file
const tokenFixture = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MDc2NDgyLCJpYXQiOjE2OTUwNzYxODIsImp0aSI6ImVmMTFhYWE3OGMyODQ4YTBiOWJiYWYwMTU5MjY3MWY5IiwidXNlcl9pZCI6MSwiaWQiOjEsImVtYWlsIjoidXNlckBjb21wYW55LmNvbSIsImlzX2VtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmV3X2VtYWlsIjoiIiwiaXNfbmV3X2VtYWlsX2NvbmZpcm1lZCI6ZmFsc2UsInJlZmVycmFsX2NvZGUiOiIiLCJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSJ9.QSy7NSAzk7w49kC9BxdZR-x0J8RLHS4ZYa5Jk0aUcSk',
}

initialize({
  onUnhandledRequest: 'warn',
})

const queryClient = new QueryClient()

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classess (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1

  const mockResolvers = context.parameters.mockResolvers || {}

  React.useEffect(() => {
    if (context.parameters.userType === 'valid') {
      Cookies.set(ACCESS_COOKIE_NAME, tokenFixture.token)
    } else {
      Cookies.remove(ACCESS_COOKIE_NAME)
    }
  }, [context.parameters.userType])

  return (
    <QueryClientProvider client={queryClient}>
      <RelayTestProvider mockResolvers={mockResolvers}>
        <React.Suspense fallback={<LoadingState />}>
          <ThemeProvider
            palette={createPalette('light')}
            breakpoints={breakpoints}
            primaryFont={primaryFont}
            secondaryFont={secondaryFont}
            settings={{
              themeMode: 'light',
              themeContrast: 'default',
              themeLayout: 'vertical',
              themeColorPresets: 'default',
              themeStretch: false,
            }}
            shadows={createShadows('light')}
            customShadows={createCustomShadows('light')}
            typography={typography}
          >
            <NotificationProvider>
              <Story />
            </NotificationProvider>
          </ThemeProvider>
        </React.Suspense>
      </RelayTestProvider>
    </QueryClientProvider>
  )
}

const preview: Preview = {
  decorators: [withProviders],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        const order = [
          'Comments',
          'CommentsList',
          'CommentCreate',
          'CommentUpdate',
          'CommentItem',
          'CommentUpsertActions',
          'ReactionButton',
          'Timestamp',
        ]

        const titleA = a.title || ''
        const titleB = b.title || ''

        const indexA = order.indexOf(titleA.split('/').pop())
        const indexB = order.indexOf(titleB.split('/').pop())

        if (indexA === -1 || indexB === -1) {
          return titleA.localeCompare(titleB, undefined, { numeric: true })
        }

        return indexA - indexB
      },
    },
    msw: {
      handlers: handlers,
    },
  },
}

export default preview
