import { ButtonProps as PaperButtonProps } from 'react-native-paper'

import { ColorVariant } from '../../../../styles/native'

type ButtonMode = 'text' | 'outlined' | 'contained' | 'soft'
type ButtonSize = 'small' | 'medium' | 'large'

type ButtonColor = ColorVariant | 'inherit'

export type ButtonStylesOptions = {
  variant: ButtonColor
  disabled?: boolean
  mode?: ButtonMode
}

export type StyleSheetSchema = {
  content: {}
  text: {}
  wrapper: {}
}

export interface ButtonProps extends Omit<PaperButtonProps, 'mode'> {
  mode?: ButtonMode
  size?: ButtonSize
  color?: ButtonColor
  dismissKeyboardOnPress?: boolean
}
