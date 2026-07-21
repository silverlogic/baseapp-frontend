import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../../__shared__/common'
import { CommentEditTarget } from '../../context/CommentReplyProvider/types'
import { CommentSubmitOptions } from '../useCommentCreateForm/types'

export interface UseCommentUpdateFormOptions {
  /** The comment being edited. `null`/`undefined` keeps the form inert (native's always-mounted composer). */
  target?: CommentEditTarget | null
  /** Use an external form instead of the hook's own — see UseCommentCreateFormOptions.form. */
  form?: UseFormReturn<SocialUpsertForm>
  /** Called when the edit finishes — successful submit or cancel. */
  onClose: () => void
  /** Called only after a successful submit (e.g. native blurs the composer input). */
  onSuccess?: () => void
  /**
   * Exit the edit optimistically: call `onClose` right after firing the mutation instead of
   * waiting for it to succeed. The native composer uses this so the "Editing your comment"
   * banner clears on submit (its pre-refactor behavior); web waits for success.
   */
  exitOnSubmit?: boolean
}

export interface UseCommentUpdateFormReturn {
  form: UseFormReturn<SocialUpsertForm>
  initialValues: SocialUpsertForm
  submit: (data: SocialUpsertForm, options?: CommentSubmitOptions) => void
  isLoading: boolean
  cancel: () => void
}
