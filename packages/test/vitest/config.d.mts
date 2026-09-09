import type { ViteUserConfig } from 'vitest/config'

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

export function createVitestConfig(opts?: VitestPresetOptions): ViteUserConfig
