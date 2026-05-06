// Do not introduce module-level mutable state here. This file runs during SSR of client
// components; in Next.js App Router, module-level `let` persists across HTTP requests in
// a long-running Node process and leaks user data between sessions. Per-request
// isolation comes from the Provider's `useRef`.
import Cookies from 'js-cookie'
import { type StoreApi, createStore } from 'zustand'

import { UISettings } from '../../../styles/web'
import { DEFAULT_UI_SETTINGS, UI_SETTINGS_KEY_NAME } from './constants'
import type { UISettingsState } from './types'

const handleTailwindThemeMode = (themeMode: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
  }
}

const getClientSideUISettings = (initialSettings?: UISettings): UISettings => {
  const storedSettings = Cookies.get(UI_SETTINGS_KEY_NAME)
  const defaultSettings = { ...DEFAULT_UI_SETTINGS, ...initialSettings }

  if (storedSettings) {
    try {
      return { ...defaultSettings, ...JSON.parse(storedSettings) }
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

const createSettingsStore = (initialSettings?: UISettings): StoreApi<UISettingsState> => {
  const settingsToUse = getClientSideUISettings(initialSettings)

  return createStore<UISettingsState>()((set) => ({
    settings: settingsToUse,
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
}

export const initializeSettingsStore = (initialSettings?: UISettings): StoreApi<UISettingsState> =>
  createSettingsStore(initialSettings)
