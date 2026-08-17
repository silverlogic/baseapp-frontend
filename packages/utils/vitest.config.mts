import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Vitest config for @baseapp-frontend/utils (migration pilot — biggest package, 29 specs).
// Mirrors the shared Jest base (@baseapp-frontend/test/jest.config.ts): jsdom, the same
// mock files (moduleNameMapper → resolve.alias), and the same setup files (console/fetch),
// which we reuse via a globalThis.jest = vi shim (see vitest.setup.ts).
const MOCKS = path.resolve(__dirname, '../test/__mocks__')
const mock = (f: string) => path.join(MOCKS, f)

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts'), mock('console.ts'), mock('fetch.ts')],
    include: ['**/*.vitest.test.(ts|tsx)'],
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
