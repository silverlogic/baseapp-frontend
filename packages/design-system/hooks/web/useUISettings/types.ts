import type { PropsWithChildren } from 'react'

import type { Palette, UISettings } from '../../../styles/web'

export type UISettingsStore = {
  settings: UISettings
}

type UISettingsFunctions = {
  setSettings: (newSettings: Partial<UISettings>) => void
}

export type UISettingsState = UISettingsStore & UISettingsFunctions

export interface UISettingsProviderProps extends PropsWithChildren {
  initialUISettings?: UISettings
  palette: Palette
}

export type UseUISettings = UISettingsState
