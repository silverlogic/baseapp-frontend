import { ReactNode } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

export interface EmptyViewProps {
  icon?: ReactNode
  title: string
  message?: string
  style?: StyleProp<ViewStyle>
}
