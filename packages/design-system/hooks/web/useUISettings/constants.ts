import type { UISettings } from '../../../styles/web/types'

export const UI_SETTINGS_KEY_NAME = 'ui-settings'

export const DEFAULT_UI_SETTINGS: UISettings = {
  themeMode: 'light',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
}

export const MISSING_UI_SETTINGS_STORE_ERROR =
  'Settings store has not been initialized. Make sure SettingsProvider is used in your app.'
