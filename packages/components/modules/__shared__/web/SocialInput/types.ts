import { ComponentPropsWithoutRef, ComponentType, FC, KeyboardEvent } from 'react'

import {
  SocialTextFieldMode,
  SocialTextFieldProps,
} from '@baseapp-frontend/design-system/components/web/inputs'

import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../common'
import { SubmitActionsProps } from './SubmitActions/types'

export interface SocialInputProps {
  placeholder?: string
  autoFocusInput?: boolean
  mode?: SocialTextFieldMode
  SocialTextField?: FC<SocialTextFieldProps>
  SocialTextFieldProps?: Partial<SocialTextFieldProps>
  SocialUpsertActions?: FC<any>
  SocialUpsertActionsProps?: Record<string, any>
  SubmitActions?: FC<SubmitActionsProps>
  SubmitActionsProps?: Partial<SubmitActionsProps>
  /**
   * Rendered inside the form, under the text field. The form is `position: sticky`, so
   * anything that has to stay with the composer — pending attachments, for instance —
   * belongs here; a sibling rendered after `SocialInput` sits below the pinned form and
   * is off-screen until the user scrolls to the end of the list.
   */
  Footer?: FC<any>
  FooterProps?: Record<string, any>
  Form?: ComponentType<ComponentPropsWithoutRef<'form'>>
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>, onSubmit: VoidFunction) => void
  formId?: string
  submit: (data: SocialUpsertForm) => void
  isLoading: boolean
  isReply?: boolean
  replyTargetName?: string | null
  onCancelReply?: () => void
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
}
