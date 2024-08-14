import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '../styles/tailwind/globals.css'
import { handlers } from './__mocks__/handlers'
import { withProviders } from './decorators'
import './overrides.css'

initialize({
  onUnhandledRequest: 'warn',
})

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
          // Navigation
          'NavigationLayout',
          'Header',
          'AccountPopover',
          'NavMini',
          'NavHorizontal',
          'NavCentered',
          'NavVertical',
          // Social
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
