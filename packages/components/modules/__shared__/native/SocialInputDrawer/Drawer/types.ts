import { FC } from 'react'

import type {
  SocialTextInputEditVariablesProps,
  SocialTextInputReplyVariablesProps,
} from '@baseapp-frontend/design-system/components/native/inputs'

import { UseFormReturn } from 'react-hook-form'
import { StyleProp, ViewStyle } from 'react-native'

import { SocialUpsertForm } from '../../../common'
import type { SocialInputProps } from '../../SocialInput/types'

export interface DrawerProps {
  DrawerHandle?: FC
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  isLoading: boolean
  keyboardHeight?: number
  onFocusChange?: (focused: boolean) => void
  onTextHeightChange?: (height: number) => void
  showHandle: boolean
  style?: StyleProp<ViewStyle>
  submit: VoidFunction
  editVariables?: SocialTextInputEditVariablesProps
  replyVariables?: SocialTextInputReplyVariablesProps
}
