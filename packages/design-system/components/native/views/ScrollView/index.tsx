import { FC } from 'react'

import { KeyboardAvoidingView } from 'react-native'
import { ScrollView as NativeScrollView } from 'react-native-gesture-handler'

import { createStyles } from './styles'
import type { ScrollViewProps } from './types'

const ScrollView: FC<ScrollViewProps> = ({ style, avoidKeyboard = true, children, ...props }) => {
  const styles = createStyles()

  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardHideContainer}>
        <NativeScrollView style={[styles.scrollViewcontainer, style]} {...props}>
          {children}
        </NativeScrollView>
      </KeyboardAvoidingView>
    )
  }

  return (
    <NativeScrollView style={[styles.scrollViewcontainer, style]} {...props}>
      {children}
    </NativeScrollView>
  )
}

export default ScrollView
