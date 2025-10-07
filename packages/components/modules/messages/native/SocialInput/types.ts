import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../__shared__/common'
import { SocialTextInputProps } from '../SocialTextInput/types'
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
}
