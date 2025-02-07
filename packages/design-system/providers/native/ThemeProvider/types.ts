import { PropsWithChildren } from 'react'

import type { Fonts } from 'react-native-paper/lib/typescript/types'

import { Theme } from '../../../styles/native'

export interface ThemeProviderProps extends PropsWithChildren {
  theme?: Partial<Theme>
  fonts: Fonts
}
