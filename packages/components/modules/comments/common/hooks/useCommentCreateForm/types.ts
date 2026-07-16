import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../../__shared__/common'

export interface CommentSubmitOptions {
  includeMentions?: boolean
}

export interface UseCommentCreateFormOptions {
  targetObjectId: string
  /**
   * When replying, expand the reply target's thread after a successful submission (via the
   * reply store's `commentIdToExpand`, consumed by `useCommentItem`).
   */
  expandRepliesOnSuccess?: boolean
  /**
   * Clear the drafted text whenever the reply target changes — including entering and
   * leaving reply mode. Used by the native single composer; web keeps the draft.
   */
  resetFormOnReplyTargetChange?: boolean
  onSuccess?: (context: { inReplyToId?: string }) => void
}

export interface UseCommentCreateFormReturn {
  form: UseFormReturn<SocialUpsertForm>
  submit: (data: SocialUpsertForm, options?: CommentSubmitOptions) => void
  isLoading: boolean
  isReply: boolean
  replyTargetName?: string | null
  cancelReply: () => void
}
