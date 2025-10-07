import { FC } from 'react'

import { SocialUpsertForm } from 'app/(protected-routes)/rooms/types'
import { UseFormReturn } from 'react-hook-form'

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
