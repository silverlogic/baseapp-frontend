/**
 * @jest-environment node
 *
 * Cross-request isolation regression test for the UI settings store.
 *
 * The bug: a module-level `let settingsStore: ... | null = null` cache caused two
 * Provider mounts in the same Node process to share state. In production SSR,
 * one user's settings (e.g., theme) leaked into the next user's render.
 *
 * The post-fix invariant: every call to `initializeSettingsStore` produces a fresh,
 * isolated StoreApi. This test runs with `@jest-environment node` so it mirrors the
 * production SSR runtime where `typeof window === 'undefined'`.
 */
import { DEFAULT_UI_SETTINGS } from '../constants'
import { initializeSettingsStore } from '../store'

describe('UI settings store cross-Provider isolation', () => {
  it('two initializeSettingsStore calls produce isolated stores', () => {
    const storeA = initializeSettingsStore({
      ...DEFAULT_UI_SETTINGS,
      themeMode: 'dark',
    })
    expect(storeA.getState().settings.themeMode).toBe('dark')

    storeA.getState().setSettings({ themeStretch: true })
    expect(storeA.getState().settings.themeStretch).toBe(true)

    const storeB = initializeSettingsStore()
    expect(storeB).not.toBe(storeA)
    expect(storeB.getState().settings.themeMode).toBe(DEFAULT_UI_SETTINGS.themeMode)
    expect(storeB.getState().settings.themeStretch).toBe(DEFAULT_UI_SETTINGS.themeStretch)

    // Mutations on storeB must not leak back into storeA.
    storeB.getState().setSettings({ themeMode: 'light' })
    expect(storeA.getState().settings.themeMode).toBe('dark')
  })
})
