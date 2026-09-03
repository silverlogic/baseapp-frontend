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
    coverage: {
      provider: 'v8',
      reporter: ['text-summary'],
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
