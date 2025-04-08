import { withStorybookProvidersWrapper } from '@baseapp-frontend/test/providers'

import type { Preview } from '@storybook/react'

import { withComponentCompleteTestProviders } from '../modules/tests/web'
import '../styles/tailwind/globals.css'
import { handlers } from './__mocks__/handlers'
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
  decorators: [withStorybookProvidersWrapper(withComponentCompleteTestProviders)],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: handlers,
    },
  },
}

export default preview
