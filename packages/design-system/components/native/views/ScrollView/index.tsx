import { FC } from 'react'

import { KeyboardAvoidingView } from 'react-native'
import { ScrollView as NativeScrollView } from 'react-native-gesture-handler'

import { createStyles } from './styles'
import type { ScrollViewProps } from './types'

const ScrollView: FC<ScrollViewProps> = ({ style, avoidKeyboard = true, children, ...props }) => {
  const styles = createStyles()

  if (avoidKeyboard) {
    return (
<<<<<<< HEAD
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardHideContainer}>
        <NativeScrollView style={[styles.scrollViewcontainer, style]} {...props}>
          {children}
        </NativeScrollView>
=======
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <NativeScrollView style={[styles.container, style]}>{children}</NativeScrollView>
>>>>>>> 56094f3 (feat: fix inherit btn colors, add ScrollView component)
      </KeyboardAvoidingView>
    )
  }

  return (
<<<<<<< HEAD
    <NativeScrollView style={[styles.scrollViewcontainer, style]} {...props}>
=======
    <NativeScrollView style={[styles.container, style]} {...props}>
>>>>>>> 56094f3 (feat: fix inherit btn colors, add ScrollView component)
      {children}
    </NativeScrollView>
  )
}

export default ScrollView
