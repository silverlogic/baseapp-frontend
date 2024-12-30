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
        // NOTE: Storybook does not accept importing external variables for storySort,
        // so the `designSystemStoriesOrder` and `componentsStoriesOrder` are defined inline.
        const designSystemStoriesOrder = [
          'Introduction',
          'Iconography',
          // Avatars
          'AvatarWithPlaceholder',
          'ClickableAvatar',
          // Buttons
          'IconButton',
          // Dialogs
          'BaseDialog',
          'ConfirmDialog',
          // Displays
          'LoadingState',
          // Drawers
          'SwipeableDrawer',
          // Popover
          'Popover',
          // Form
          'TextField',
          'TextareaField',
          'CommentTextField',
          // Typography
          'TypographyWithEllipsis',
          // General
          'Logo',
          'Scrollbar',
        ]

        const componentsStoriesOrder = [
          'Introduction',
          'Iconography',
          // Avatars
          'AvatarWithPlaceholder',
          'ClickableAvatar',
          // Buttons
          'IconButton',
          // Dialogs
          'BaseDialog',
          'ConfirmDialog',
          // Displays
          'LoadingState',
          // Drawers
          'SwipeableDrawer',
          // Popover
          'Popover',
          // Form
          'TextField',
          'TextareaField',
          'CommentTextField',
          // Typography
          'TypographyWithEllipsis',
          // General
          'Logo',
          'Scrollbar',

          // Navigation
          'NavigationLayout',
          'Header',
          'AccountPopover',
          'NavMini',
          'NavHorizontal',
          'NavCentered',
          'NavVertical',
          //Notifications
          'NotificationsModule',
          'NotificationItem',
          'NotificationsList',
          'NotificationsPopover',
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
        const final = [...designSystemStoriesOrder, ...componentsStoriesOrder]

        const titleA = a.title || ''
        const titleB = b.title || ''

        const indexA = final.indexOf(titleA.split('/').pop())
        const indexB = final.indexOf(titleB.split('/').pop())

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
