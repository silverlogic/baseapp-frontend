import { withStorybookProvidersWrapper } from '@baseapp-frontend/test/providers'

import type { Preview } from '@storybook/react'

import { withWagtailProviders } from './decorators/withProviders'
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
  decorators: [withStorybookProvidersWrapper(withWagtailProviders)],
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
