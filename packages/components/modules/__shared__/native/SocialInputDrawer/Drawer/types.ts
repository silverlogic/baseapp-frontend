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
  /** Rendered above the input inside the sheet (e.g. attachment chips); the sheet grows to fit it. */
  Footer?: FC<any>
  FooterProps?: Record<string, any>
  /** Reports the footer's height so a `Placeholder` can reserve the same space. */
  onFooterHeightChange?: (height: number) => void
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
