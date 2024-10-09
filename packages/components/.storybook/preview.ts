import type { Preview } from '@storybook/react'

import '../styles/tailwind/globals.css'
import { handlers } from './__mocks__/handlers'
import { withProviders } from './decorators'
import './overrides.css'

const { initialize, mswLoader } = require('msw-storybook-addon')

const isProduction = process.env.NODE_ENV === 'production'
const serviceWorkerUrl = isProduction
  ? '/baseapp-frontend/mockServiceWorker.js'
  : '/mockServiceWorker.js'

initialize({
  onUnhandledRequest: 'warn',
  serviceWorker: {
    url: serviceWorkerUrl,
  },
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
      // @ts-ignore
      storySort: (a, b) => {
        const order = [
          //Shared
          'ReactionButton',
          'SocialInput',
          'SocialUpsertActions',
          'Timestamp',
          // Comments
          'Comments',
          'CommentsList',
          'CommentCreate',
          'CommentUpdate',
          'CommentItem',
          'CommentUpsertActions',
          // Messages
          'SendMessage',
          // Navigation
          'NavigationLayout',
          'Header',
          'AccountPopover',
          'NavMini',
          'NavHorizontal',
          'NavCentered',
          'NavVertical',
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
