import { devServer as startDevServer } from '@cypress/webpack-dev-server'
import { defineConfig } from 'cypress'

import webpackConfig from './webpack.config'

export default defineConfig({
  component: {
    specPattern: './modules/**/__tests__/*.cy.{js,ts,jsx,tsx}',
    defaultCommandTimeout: 10000,
    devServer({ cypressConfig, devServerEvents, specs }) {
      return startDevServer({
        webpackConfig: webpackConfig as any,
        cypressConfig,
        framework: 'react',
        devServerEvents,
        specs,
      })
    },
    env: {
      baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      relayEndpoint: process.env.NEXT_PUBLIC_RELAY_ENDPOINT,
      wsRelayEndpoint: process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT,
    },
  },
})
