import { createVitestConfig } from '@baseapp-frontend/test/vitest/config.mjs'

export default createVitestConfig({
  coverage: {
    all: true,
    include: ['**/*.{ts,tsx}'],
    exclude: [
      '**/__tests__/**',
      '**/*.test.{ts,tsx}',
      '**/*.d.ts',
      '**/__mocks__/**',
      '**/types/**',
      'coverage/**',
      'dist/**',
      'scripts/**',
      'vitest.config.mts',
      'vitest.d.ts',
    ],
  },
})
