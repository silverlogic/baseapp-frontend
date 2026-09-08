/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type ViteUserConfig, defineConfig, mergeConfig } from 'vitest/config'

// ─────────────────────────────────────────────────────────────────────────────
// Shared Vitest preset for @baseapp-frontend packages (and the template apps).
//
// Every package's `vitest.config` repeated the same skeleton: the react() plugin,
// jsdom + globals, the `globalThis.jest = vi` shim + shared console/fetch setup,
// the react-native/expo/next-font aliases pointing at this package's __mocks__,
// and v8 coverage. `createVitestConfig` centralizes that; each package passes only
// its real differences (include glob, extra setup, coverage policy, extra aliases).
//
// Mocks resolve against THIS package's own __mocks__ by default, so consumers no
// longer hardcode `../test/__mocks__` vs `../../baseapp-frontend/...` paths.
// ─────────────────────────────────────────────────────────────────────────────

const PRESET_DIR = path.dirname(fileURLToPath(import.meta.url)) // .../packages/test/vitest
const SHARED_MOCKS = path.resolve(PRESET_DIR, '../__mocks__')
const SHARED_SETUP = path.join(PRESET_DIR, 'setup.ts')

export interface VitestPresetOptions {
  /** Glob(s) for test files. Default: `['**\/*.{test,spec}.{ts,tsx}']`. */
  include?: string[]
  /** Extra per-package setup files (absolute paths) — e.g. a package's own vitest.setup.ts. */
  setupFiles?: string[]
  /**
   * Shared mock setup files loaded from `mocksDir`, after the jest→vi shim.
   * Default: `['console.ts', 'fetch.ts']`. Pass `[]` to opt out (e.g. apps/web).
   */
  mockSetupFiles?: string[]
  /** Mocks root. Default: this package's shared `__mocks__`. */
  mocksDir?: string
  /** Alias `next/font/google` → `<mocksDir>/next-font.ts`. Default: true. */
  aliasNextFont?: boolean
  /** Extra resolve aliases (absolute paths). */
  aliases?: Record<string, string>
  /** Coverage overrides, spread over the v8 defaults. */
  coverage?: NonNullable<NonNullable<ViteUserConfig['test']>['coverage']>
  /** Escape hatch: a full config merged last via Vitest `mergeConfig`. */
  overrides?: ViteUserConfig
}

export function createVitestConfig(opts: VitestPresetOptions = {}): ViteUserConfig {
  const mocksDir = opts.mocksDir ?? SHARED_MOCKS
  const mock = (f: string) => path.join(mocksDir, f)
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
  }) as ViteUserConfig

  return opts.overrides ? (mergeConfig(base, opts.overrides) as ViteUserConfig) : base
}
