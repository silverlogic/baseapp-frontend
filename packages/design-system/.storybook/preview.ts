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
  },
}

export default preview
