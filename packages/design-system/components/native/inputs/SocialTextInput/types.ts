import { PropsWithChildren } from 'react'

import type { FormControl } from '@baseapp-frontend/utils/types/form'

import { StyleProp, ViewStyle } from 'react-native'
import type { TextInputProps as PaperTextInputProps } from 'react-native-paper'

export type SocialTextInputProps = PaperTextInputProps &
  FormControl &
  PropsWithChildren & {
    lineHeight?: number
    maxLines?: number
    onFocusChange?: (focused: boolean) => void
    onTextHeightChange?: (height: number) => void
    containerStyle?: StyleProp<ViewStyle>
    toolStyle?: StyleProp<ViewStyle>
  }
