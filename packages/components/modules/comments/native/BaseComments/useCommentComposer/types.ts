import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../../__shared__/common'

export interface UseCommentComposerOptions {
  targetObjectId: string
  /** Called after a successful create or update submission (e.g. blur the composer input). */
  onSubmitSuccess?: () => void
}

export interface CommentComposerEditVariables {
  isEditMode: boolean
  label: string
  onEditCancel: () => void
}

export interface CommentComposerReplyVariables {
  isReplyMode: boolean
  label: string
  onReplyCancel: () => void
  targetName: string
}

export interface UseCommentComposerReturn {
  /** The active form: the update form while editing, the create form otherwise. */
  form: UseFormReturn<SocialUpsertForm>
  submit: () => void
  isLoading: boolean
  editVariables: CommentComposerEditVariables
  replyVariables: CommentComposerReplyVariables
}
