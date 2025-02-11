import { FC } from 'react'

import { Keyboard, View as NativeView, TouchableWithoutFeedback } from 'react-native'

import { useTheme } from '../../../../providers/native'
import { createStyles } from './styles'
import type { ViewProps } from './types'

const View: FC<ViewProps> = ({ style, dismissKeyboard = true, ...props }) => {
  const theme = useTheme()

  const styles = createStyles(theme)

  if (dismissKeyboard) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NativeView style={[styles.container, style]} {...props} />
      </TouchableWithoutFeedback>
    )
  }

  return <NativeView style={[styles.container, style]} {...props} />
}

export default View
