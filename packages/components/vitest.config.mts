import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createVitestConfig } from '@baseapp-frontend/test/vitest/config.mjs'

// Shared skeleton from `createVitestConfig`; this package adds its own vitest.setup.ts
// (a global graphql-ws vi.mock). UI package — real coverage is the component (Cypress)
// layer, not unit; the factory default (v8, text-summary) is informational only.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default createVitestConfig({
  setupFiles: [path.join(__dirname, 'vitest.setup.ts')],
})
