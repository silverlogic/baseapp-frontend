import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../../__shared__/common'

export interface CommentSubmitOptions {
  includeMentions?: boolean
}

export interface UseCommentCreateFormOptions {
  targetObjectId: string
  /**
   * Use an external form instead of the hook's own. Required when one always-mounted input
   * swaps between hooks (native composer): react-hook-form's Controller captures its
   * `control.register` in a mount-time ref, so swapping `control` leaves `onChange` writing
   * into the old form while `value` reads from the new one — typed text instantly reverts.
   */
  form?: UseFormReturn<SocialUpsertForm>
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
