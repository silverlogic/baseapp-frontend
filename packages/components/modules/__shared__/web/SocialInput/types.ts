import { FC, KeyboardEvent } from 'react'

import { SocialTextFieldProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { UseFormReturn } from 'react-hook-form'
import { LoadMoreFn, RefetchFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

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
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>, onSubmit: VoidFunction) => void
  formId?: string
  submit: (data: SocialUpsertForm) => void
  isLoading: boolean
  isReply?: boolean
  replyTargetName?: string | null
  onCancelReply?: () => void
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  profilesList?: readonly any[] | any[]
  loadNextProfiles?: LoadMoreFn<any>
  isLoadingNextProfiles?: boolean
  hasNextProfiles?: boolean
  refetchProfiles?: RefetchFn<any>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
