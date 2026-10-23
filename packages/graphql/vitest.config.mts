import { createVitestConfig } from '@baseapp-frontend/test/vitest/config.mjs'

// Shared skeleton (react plugin, jsdom, jest→vi shim + console/fetch setup, RN/expo/next-font
// aliases) from `createVitestConfig`, with whole-surface v8 coverage.
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
      '**/tests/**',
      '**/types/**',
      'coverage/**',
      'dist/**',
      'vitest.config.mts',
    ],
  },
})
