import { FC } from 'react'

import { SocialTextInputProps } from '@baseapp-frontend/design-system/components/native/inputs'

import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../common'
import { SubmitActionsProps } from './SubmitActions/types'

export interface SocialInputBoxProps {
  SocialTextInput?: FC<SocialTextInputProps>
  SocialTextInputProps?: Partial<SocialTextInputProps>
  SocialUpsertActions?: FC
  SubmitActions?: FC<SubmitActionsProps>
  SubmitActionsProps?: Partial<SubmitActionsProps>
  isLoading: boolean
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  shouldUseBottomSheetSafeComponents?: boolean
  submit: VoidFunction
}
