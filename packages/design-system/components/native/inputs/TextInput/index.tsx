import { FC, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { LayoutChangeEvent } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import Text from '../../typographies/Text'
import View from '../../views/View'
import { createOutlinedStyles, styles } from './styles'
import type { PureTextInputProps, TextInputProps } from './types'

const TextInput: FC<TextInputProps> = (props) => {
  const { disabled, helperText } = props

  const [isFocused, setIsFocused] = useState(false)
  const [errorContainerWidth, setErrorContainerWidth] = useState(0)
  const theme = useTheme()

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setErrorContainerWidth(width)
  }

  const outlinedStyles = createOutlinedStyles(theme, {
    isFocused,
    isError: !!helperText,
    isDisabled: disabled,
  })

  return (
    <View style={styles.container} onLayout={onLayout}>
      <PaperTextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        outlineStyle={[outlinedStyles.wrapper]}
        activeOutlineColor={theme.colors.object.high}
        {...props}
      />
      {helperText && !disabled && (
        // Had to do this adjustment to the error container width because the error text was overflowing the container
        // The 12px subtraction is to account for the padding of the error container
        <View style={[styles.errorContainer, { width: errorContainerWidth - 12 }]}>
          <Ionicons name="warning" size={15} color={theme.colors.error.main} />
          <Text variant="caption" style={{ color: theme.colors.error.main }}>
            {helperText}
          </Text>
        </View>
      )}
    </View>
  )
}

export default withNativeController(TextInput)

// exporting the TextInput without the controller, it's useful when a component
// that inherits from TextField needs to use the same controller
export const PureTextInput = TextInput as FC<PureTextInputProps>
