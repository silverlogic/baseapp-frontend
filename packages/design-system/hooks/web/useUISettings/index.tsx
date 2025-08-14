'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { type StoreApi, useStore } from 'zustand'

import { Palette, PresetType, getPresetOptions } from '../../../styles/web'
import { DEFAULT_UI_SETTINGS, MISSING_UI_SETTINGS_STORE_ERROR } from './constants'
import { initializeSettingsStore } from './store'
import type { UISettingsProviderProps, UISettingsState } from './types'

export const SettingsContext = createContext<StoreApi<UISettingsState> | null>(null)

const handleThemeColorPresets = (presets: PresetType, palette: Palette) => {
  if (typeof document !== 'undefined') {
    const root: HTMLElement | null = document.querySelector(':root')
    const preset = getPresetOptions(palette.primary)[presets]

    if (root && preset) {
      root.style.setProperty('--color-primary-lighter', preset.lighter)
      root.style.setProperty('--color-primary-light', preset.light)
      root.style.setProperty('--color-primary-main', preset.main)
      root.style.setProperty('--color-primary-dark', preset.dark)
      root.style.setProperty('--color-primary-darker', preset.darker)
      root.style.setProperty('--color-primary-contrastText', preset.contrastText)
    }
  }
}

export const UISettingsProvider = ({
  children,
  initialUISettings,
  palette,
}: UISettingsProviderProps) => {
  const storeRef = useRef<StoreApi<UISettingsState>>(undefined)

  if (!storeRef.current) {
    const initialSettings = initialUISettings || DEFAULT_UI_SETTINGS
    storeRef.current = initializeSettingsStore(initialSettings)
  }

  const store = storeRef.current

  useEffect(() => {
    const unsubscribe = store.subscribe((state, prevState) => {
      const { settings } = state
      const prevSettings = prevState?.settings

      if (settings.themeColorPresets !== prevSettings?.themeColorPresets) {
        handleThemeColorPresets(settings.themeColorPresets, palette)
      }
    })

    handleThemeColorPresets(store.getState().settings.themeColorPresets, palette)

    return unsubscribe
  }, [store, getPresetOptions, palette])

  return <SettingsContext.Provider value={store}>{children}</SettingsContext.Provider>
}

const useUISettings = () => {
  const store = useContext(SettingsContext)

  if (!store) {
    throw new Error(MISSING_UI_SETTINGS_STORE_ERROR)
  }

  return useStore(store)
}

export default useUISettings
