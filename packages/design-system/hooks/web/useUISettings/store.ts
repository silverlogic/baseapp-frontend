import Cookies from 'js-cookie'
import { type StoreApi, createStore } from 'zustand'

import { UISettings } from '../../../styles/web'
import { MISSING_UI_SETTINGS_STORE_ERROR, UI_SETTINGS_KEY_NAME } from './constants'
import type { UISettingsState } from './types'

const handleTailwindThemeMode = (themeMode: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
  }
}

let settingsStore: StoreApi<UISettingsState> | null = null

const createSettingsStore = (initialSettings: UISettings): StoreApi<UISettingsState> =>
  createStore<UISettingsState>()((set) => ({
    settings: initialSettings,
    setSettings: (newSettings: Partial<UISettings>) =>
      set((state) => {
        const settings = { ...state.settings, ...newSettings }
        handleTailwindThemeMode(settings.themeMode)
        Cookies.set(UI_SETTINGS_KEY_NAME, JSON.stringify(settings))
        return {
          settings,
        }
      }),
  }))

export const initializeSettingsStore = (initialSettings: UISettings): StoreApi<UISettingsState> => {
  // Create a new store in dev mode to prevent HMR from preserving stale data
  if (process.env.NODE_ENV === 'development' || !settingsStore) {
    return createSettingsStore(initialSettings)
  }

  return settingsStore
}
export const getSettingsStore = (): StoreApi<UISettingsState> => {
  if (!settingsStore) {
    throw new Error(MISSING_UI_SETTINGS_STORE_ERROR)
  }
  return settingsStore
}

export const getUISettingsFromStore = (): UISettings => {
  const store = getSettingsStore()
  return store.getState().settings
}

export const setUISettingsInStore = (newSettings: Partial<UISettings>): void => {
  const store = getSettingsStore()
  store.getState().setSettings(newSettings)
}

export const resetSettingsStore = (): void => {
  settingsStore = null
}
