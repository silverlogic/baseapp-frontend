/**
 * @jest-environment node
 *
 * Cross-request isolation regression: two `initializeSettingsStore` calls must produce
 * separate `StoreApi` instances. Runs under `node` to mirror the SSR runtime.
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
