/* eslint-disable import/no-extraneous-dependencies */
// @playwright/test is a devDependency and this is a test-runner config, not
// published source.
import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'

/**
 * Playwright component testing for @baseapp-frontend/components.
 *
 * Uses the built-in `mount` fixture (Playwright >= 1.62) against a story
 * gallery served by this package's own webpack dev server — see
 * `playwright/webpack.gallery.config.cjs`. Stories live beside their components
 * in `__tests__/__utils__/` as `*.story.tsx`.
 *
 * Run:
 *   pnpm test:component        (headless, both engines)
 *   pnpm test:component:ui     (interactive UI mode)
 */
const GALLERY_URL = 'http://127.0.0.1:3100/'

export default defineConfig({
  // Specs live beside their component in `__tests__/`. The `.pw.ts` suffix keeps
  // them out of Jest's `**/*.(spec|test).(ts|tsx)` testMatch.
  testDir: path.join(__dirname, 'modules'),
  testMatch: '**/__tests__/*.pw.ts',
  outputDir: path.join(__dirname, 'playwright/test-results'),

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'playwright/report', open: 'never' }], ['list']],

  webServer: {
    command: 'pnpm gallery',
    url: GALLERY_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  use: {
    baseURL: GALLERY_URL,
    // DOCS: keep the msw service worker in public/ from serving cached
    // responses that would shadow page.route() mocks.
    serviceWorkers: 'block',
    // DOCS: reuse the browser context across tests in a worker, as the old
    // component-testing runtime did.
    reuseContext: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'components',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Cross-engine coverage for the layout/geometry assertions — the reason
      // these tests need a real browser at all. Cypress cannot do WebKit.
      name: 'components-webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
