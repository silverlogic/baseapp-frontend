import { useEffect, useState } from 'react'

import { Dimensions, Keyboard, KeyboardEvent, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const insets = useSafeAreaInsets()
  useEffect(() => {
    const onKeyboardShow = (e: KeyboardEvent) => {
      const screenHeight = Dimensions.get('screen').height
      const safeHeight = screenHeight - insets.bottom
      const newKeyboardHeight = safeHeight - e.endCoordinates.screenY
      setKeyboardHeight(newKeyboardHeight)
    }

    const onKeyboardHide = () => {
      setKeyboardHeight(0)
    }

    const isAndroid = Platform.OS === 'android'
    const showListener = isAndroid
      ? Keyboard.addListener('keyboardDidShow', onKeyboardShow)
      : Keyboard.addListener('keyboardWillShow', onKeyboardShow)
    const hideListener = isAndroid
      ? Keyboard.addListener('keyboardDidHide', onKeyboardHide)
      : Keyboard.addListener('keyboardWillHide', onKeyboardHide)

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [insets])
  return keyboardHeight
}

export const useTextInputProperties = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [textHeight, setTextHeight] = useState<number>(0)
  const keyboardHeight = useKeyboardHeight()

  return {
    isFocused,
    onFocusChange: setIsFocused,
    textHeight,
    onTextHeightChange: setTextHeight,
    keyboardHeight,
  }
}
