import type { FormControl } from '@baseapp-frontend/utils/types/form'

import type { TextInputProps as PaperTextInputProps } from 'react-native-paper'

export type PureTextInputProps = PaperTextInputProps

export type TextInputProps = PaperTextInputProps & FormControl

export type OutlinedStylesOptions = {
  isFocused?: boolean
  isError?: boolean
  isDisabled?: boolean
}
