import type { Preview } from '@storybook/react'

import '../styles/web/material/globals.css'
import '../styles/web/tailwind/globals.css'
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
  },
}

export default preview
