import { createVitestConfig } from '@baseapp-frontend/test/vitest/config'

// Vitest config for @baseapp-frontend/utils (migration pilot — biggest package, 29 specs).
// Shared skeleton (react plugin, jsdom, jest→vi shim + console/fetch setup, RN/expo/next-font
// aliases → the shared @baseapp-frontend/test/__mocks__) comes from `createVitestConfig`; only
// this package's coverage policy is overridden below.
export default createVitestConfig({
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
