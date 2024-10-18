import type { Preview } from '@storybook/react'

import '../styles/material/globals.css'
import '../styles/tailwind/globals.css'
import { withProviders } from './decorators'

const preview: Preview = {
  decorators: [withProviders],
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
