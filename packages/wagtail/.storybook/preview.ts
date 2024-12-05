import type { Preview } from '@storybook/react'

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
      // TODO: Story order.
    },
  },
}

export default preview
