import { FC } from 'react'

import { type GestureResponderEvent, Keyboard } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import {
  compactStyles,
  createContainedStyles,
  createOutlinedStyles,
  createSoftStyles,
  largeSizeStyles,
  mediumSizeStyles,
  smallSizeStyles,
  textStyles,
} from './styles'
import { ButtonProps, StyleSheetSchema } from './types'

const Button: FC<ButtonProps> = ({
  dismissKeyboardOnPress = true,
  onPress,
  disabled,
  style,
  contentStyle,
  labelStyle,
  compact = false,
  mode = 'contained',
  size = 'large',
  color = 'primary',
  ...props
}) => {
  const theme = useTheme()

  const buttonVariant = {
    contained: createContainedStyles(theme, { variant: color, disabled }),
    text: textStyles,
    outlined: createOutlinedStyles(theme, { variant: color, disabled }),
    soft: createSoftStyles(theme, { variant: color, disabled }),
  } as const

  const buttonSize = {
    small: smallSizeStyles,
    medium: mediumSizeStyles,
    large: largeSizeStyles,
  } as const

  const variantStyles = buttonVariant[mode]
  const sizeStyles = buttonSize[size]
  const buttonCompactStyles = compact ? compactStyles : ({} as StyleSheetSchema)

  const handlePress = (e: GestureResponderEvent) => {
    if (dismissKeyboardOnPress) {
      Keyboard.dismiss()
    }
    onPress?.(e)
  }

  const resolvedMode = mode === 'soft' ? 'contained' : mode
  const resolvedRippleColor =
    color === 'inherit' ? theme.colors.object.contrast : theme.colors[color].overlay

  return (
    <PaperButton
      mode={resolvedMode}
      disabled={disabled}
      rippleColor={compact || disabled ? 'transparent' : resolvedRippleColor}
      contentStyle={[
        sizeStyles.content,
        variantStyles.content,
        buttonCompactStyles.content,
        contentStyle,
      ]}
      labelStyle={[variantStyles.text, labelStyle, sizeStyles.text]}
      style={[variantStyles.wrapper, style]}
      onPress={handlePress}
      {...props}
    />
  )
}

export default Button
