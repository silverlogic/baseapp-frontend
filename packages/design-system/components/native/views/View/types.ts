import { ComponentProps } from 'react'

import { View } from 'react-native'

export interface ViewProps extends ComponentProps<typeof View> {
  dismissKeyboard?: boolean
}
