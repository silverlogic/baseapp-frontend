/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vitest/config'

// ─────────────────────────────────────────────────────────────────────────────
// Shared Vitest preset for @baseapp-frontend packages (and the template apps).
//
// Authored as plain ESM (.mjs), NOT .ts, on purpose: a package's vitest.config is
// loaded by Vitest at config time and its imports are handed to plain Node — which
// cannot execute a raw .ts file (ERR_UNKNOWN_FILE_EXTENSION) in the submodule's
// isolated install. A .mjs loads natively in every topology. Consumers import it
// with the explicit `.mjs` extension so it resolves without a package `exports` map.
// Types live alongside in config.d.mts.
//
// Every package's config repeated the same skeleton (react() plugin, jsdom + globals,
// the globalThis.jest = vi shim + shared console/fetch setup, the react-native/expo/
// next-font aliases → this package's __mocks__, v8 coverage). createVitestConfig
// centralizes it; each package passes only its real differences.
// ─────────────────────────────────────────────────────────────────────────────

const PRESET_DIR = path.dirname(fileURLToPath(import.meta.url)) // .../packages/test/vitest
const SHARED_MOCKS = path.resolve(PRESET_DIR, '../__mocks__')
const SHARED_SETUP = path.join(PRESET_DIR, 'setup.ts')

/**
 * Build a package's Vitest config from the shared preset.
 * @param {import('./config.d.mts').VitestPresetOptions} [opts]
 * @returns {import('vitest/config').ViteUserConfig}
 */
export function createVitestConfig(opts = {}) {
  const mocksDir = opts.mocksDir ?? SHARED_MOCKS
  const mock = (f) => path.join(mocksDir, f)
  const aliasNextFont = opts.aliasNextFont ?? true
  const mockSetupFiles = opts.mockSetupFiles ?? ['console.ts', 'fetch.ts']

  const base = defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [SHARED_SETUP, ...mockSetupFiles.map(mock), ...(opts.setupFiles ?? [])],
      include: opts.include ?? ['**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text-summary'],
        ...(opts.coverage ?? {}),
      },
    },
    resolve: {
      alias: {
        'react-native': mock('react-native.ts'),
        'expo-constants': mock('expo-constants.ts'),
        'expo-modules-core': mock('expo-modules-core.ts'),
        'expo-secure-store': mock('expo-secure-store.ts'),
        ...(aliasNextFont ? { 'next/font/google': mock('next-font.ts') } : {}),
        ...(opts.aliases ?? {}),
      },
    },
  })

  return opts.overrides ? mergeConfig(base, opts.overrides) : base
}
