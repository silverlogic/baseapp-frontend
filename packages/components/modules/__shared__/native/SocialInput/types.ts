import { FC } from 'react'

import {
  SocialTextInputEditVariablesProps,
  SocialTextInputProps,
  SocialTextInputReplyVariablesProps,
} from '@baseapp-frontend/design-system/components/native/inputs'

import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../common'
import { SubmitActionsProps } from './SubmitActions/types'

export interface SocialInputProps {
  SocialTextInput?: FC<SocialTextInputProps>
  SocialTextInputProps?: Partial<SocialTextInputProps>
  SocialUpsertActions?: FC
  SubmitActions?: FC<SubmitActionsProps>
  SubmitActionsProps?: Partial<SubmitActionsProps>
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  isLoading: boolean
  onFocusChange?: (focused: boolean) => void
  onTextHeightChange?: (height: number) => void
  shouldUseBottomSheetSafeComponents?: boolean
  submit: VoidFunction
  editVariables?: SocialTextInputEditVariablesProps
  replyVariables?: SocialTextInputReplyVariablesProps
}
