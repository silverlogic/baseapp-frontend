import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createVitestConfig } from '@baseapp-frontend/test/vitest/config'

// Shared skeleton from `createVitestConfig`; this package adds its own vitest.setup.ts
// (a global js-cookie vi.mock) and keeps whole-surface v8 coverage.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default createVitestConfig({
  setupFiles: [path.join(__dirname, 'vitest.setup.ts')],
  coverage: {
    all: true, // whole-surface (not touched-files-only) so the no-regress baseline is honest
    include: ['**/*.{ts,tsx}'],
    exclude: [
      '**/__tests__/**',
      '**/*.test.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      '**/*.d.ts',
      '**/__mocks__/**',
      '**/__mock__/**',
      '**/tests/**',
      '**/types/**',
      'coverage/**',
      'dist/**',
      'vitest.config.mts',
      'vitest.setup.ts',
      'vitest.d.ts',
    ],
  },
})
