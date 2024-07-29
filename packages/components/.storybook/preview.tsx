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

import type { Preview, StoryContext, StoryFn } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '../styles/tailwind/globals.css'

initialize({
  onUnhandledRequest: 'warn',
})

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classess (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1

  const mockResolvers = context.parameters.mockResolvers || {}

  return (
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
  },
}

export default preview
