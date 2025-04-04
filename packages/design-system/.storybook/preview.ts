import { withStorybookProvidersWrapper } from '@baseapp-frontend/test/providers'

import type { Preview } from '@storybook/react'

import '../styles/web/material/globals.css'
import '../styles/web/tailwind/globals.css'
import withDesignSystemTestProviders from '../tests/web/utils/providers/withDesignSystemTestProviders'

const preview: Preview = {
  decorators: [withStorybookProvidersWrapper(withDesignSystemTestProviders)],
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
          'Introduction',
          'Iconography',
          // Avatars
          'AvatarWithPlaceholder',
          'ClickableAvatar',
          // Buttons
          'FileUploadButton',
          'IconButton',
          // Dialogs
          'BaseDialog',
          'ConfirmDialog',
          // Displays
          'LoadingState',
          // Drawers
          'SwipeableDrawer',
          // Images
          'ImageWithFallback',
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
