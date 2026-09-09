import React from 'react'

import { act, renderHook } from '@testing-library/react'
import Cookies from 'js-cookie'

import useUISettings, { UISettingsProvider } from '..'
import { createPalette } from '../../../../styles/web'
import { DEFAULT_UI_SETTINGS, UI_SETTINGS_KEY_NAME } from '../constants'

vi.mock('js-cookie', () => {
  // Vitest needs a `default` export for `import Cookies from 'js-cookie'`; share one
  // object so Cookies.* (app code) and mockCookiesSet (assertions) are the same vi.fn().
  const api = { set: vi.fn(), get: vi.fn(), remove: vi.fn() }
  return { default: api, ...api }
})

const mockCookiesSet = Cookies.set as MockedFunction<typeof Cookies.set>

const mockToggle = vi.fn()
Object.defineProperty(document, 'documentElement', {
  value: {
    classList: {
      toggle: mockToggle,
    },
  },
  writable: true,
})

Object.defineProperty(document, 'querySelector', {
  value: vi.fn(() => ({
    style: {
      setProperty: vi.fn(),
    },
  })),
  writable: true,
})

describe('useUISettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockToggle.mockClear()
  })

  describe('Provider', () => {
    it('should provide default settings when no initial settings provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      expect(result.current.settings).toEqual(DEFAULT_UI_SETTINGS)
    })

    it('should use initial settings prop when provided', () => {
      const initialSettings = {
        ...DEFAULT_UI_SETTINGS,
        themeMode: 'dark' as const,
      }

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider initialUISettings={initialSettings} palette={createPalette('light')}>
          {children}
        </UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      expect(result.current.settings).toEqual(initialSettings)
    })
  })

  describe('Settings Management', () => {
    it('should update settings correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      act(() => {
        result.current.setSettings({ themeMode: 'dark' })
      })

      expect(result.current.settings.themeMode).toBe('dark')
    })

    it('should merge partial settings with existing settings', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      act(() => {
        result.current.setSettings({
          themeMode: 'dark',
          themeStretch: true,
        })
      })

      expect(result.current.settings).toEqual({
        ...DEFAULT_UI_SETTINGS,
        themeMode: 'dark',
        themeStretch: true,
      })
    })

    it('should persist settings to cookie when changed', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      act(() => {
        result.current.setSettings({ themeMode: 'dark' })
      })

      expect(mockCookiesSet).toHaveBeenCalledWith(
        UI_SETTINGS_KEY_NAME,
        JSON.stringify({ ...DEFAULT_UI_SETTINGS, themeMode: 'dark' }),
      )
    })
  })

  describe('Theme Mode Handling', () => {
    it('should apply theme mode changes', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      act(() => {
        result.current.setSettings({ themeMode: 'dark' })
      })

      expect(mockToggle).toHaveBeenCalledWith('dark', true)
    })

    it('should apply initial theme mode when settings are updated', () => {
      const initialSettings = { ...DEFAULT_UI_SETTINGS, themeMode: 'dark' as const }

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider initialUISettings={initialSettings} palette={createPalette('light')}>
          {children}
        </UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      // Theme mode should be applied when we trigger any settings change
      act(() => {
        result.current.setSettings({ themeMode: 'dark' })
      })

      expect(mockToggle).toHaveBeenCalledWith('dark', true)
    })
  })

  describe('Error Handling', () => {
    it('should throw error when useUISettings is used without provider', () => {
      expect(() => {
        renderHook(() => useUISettings())
      }).toThrow('Settings store has not been initialized')
    })
  })

  describe('Cookie Integration', () => {
    it('should persist settings changes to cookies', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UISettingsProvider palette={createPalette('light')}>{children}</UISettingsProvider>
      )

      const { result } = renderHook(() => useUISettings(), { wrapper })

      act(() => {
        result.current.setSettings({
          themeMode: 'dark',
          themeStretch: true,
        })
      })

      expect(mockCookiesSet).toHaveBeenCalledWith(
        UI_SETTINGS_KEY_NAME,
        JSON.stringify({
          ...DEFAULT_UI_SETTINGS,
          themeMode: 'dark',
          themeStretch: true,
        }),
      )
    })
  })
})
