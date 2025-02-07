import { FC } from 'react'

import { SocialTextFieldProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../common'
import { SubmitActionsProps } from './SubmitActions/types'

export interface SocialInputProps {
  placeholder?: string
  autoFocusInput?: boolean
  SocialTextField?: FC<SocialTextFieldProps>
  SocialTextFieldProps?: Partial<SocialTextFieldProps>
  SocialUpsertActions?: FC
  SubmitActions?: FC<SubmitActionsProps>
  SubmitActionsProps?: Partial<SubmitActionsProps>
  formId?: string
  submit: (data: SocialUpsertForm) => void
  isLoading: boolean
  isReply?: boolean
  replyTargetName?: string | null
  onCancelReply?: () => void
  form: UseFormReturn<SocialUpsertForm, any, undefined>
}
