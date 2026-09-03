import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Vitest config. Mirrors the shared Jest base
// (@baseapp-frontend/test/jest.config.ts): jsdom, the same mock files
// (moduleNameMapper → resolve.alias), and the same setup files (console/fetch),
// reused via a globalThis.jest = vi shim (see vitest.setup.ts). Coverage ON
// (V8) so this lane matches the with-coverage scenario being measured.
const MOCKS = path.resolve(__dirname, '../test/__mocks__')
const mock = (f: string) => path.join(MOCKS, f)

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts'), mock('console.ts'), mock('fetch.ts')],
    include: ['**/*.(test|spec).(ts|tsx)'],
    // NOTE: design-system is a UI package — its real coverage is the component
    // (Cypress) layer, not unit. Whole-surface v8 (`all: true`) both errors on some
    // source files and reports a meaningless ~6%, so this package is NOT subject to
    // the unit no-regress gate (see docs/coverage-baseline.md). This is informational
    // (touched-files) coverage only.
    coverage: { provider: 'v8', reporter: ['text-summary'] },
  },
  resolve: {
    alias: {
      'react-native': mock('react-native.ts'),
      'expo-constants': mock('expo-constants.ts'),
      'expo-modules-core': mock('expo-modules-core.ts'),
      'expo-secure-store': mock('expo-secure-store.ts'),
      'next/font/google': mock('next-font.ts'),
    },
  },
})
