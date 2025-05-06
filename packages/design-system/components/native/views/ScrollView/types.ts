import { ComponentProps } from 'react'

import { ScrollView } from 'react-native'

export interface ScrollViewProps extends ComponentProps<typeof ScrollView> {
  avoidKeyboard?: boolean
}
