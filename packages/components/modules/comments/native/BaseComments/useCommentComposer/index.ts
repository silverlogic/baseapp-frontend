import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../../__shared__/common'
import { useCommentCreateForm, useCommentReply, useCommentUpdateForm } from '../../../common'
import { UseCommentComposerOptions, UseCommentComposerReturn } from './types'

/**
 * State machine for the native single bottom composer: it drives ONE form through BOTH
 * shared form hooks (`useCommentCreateForm` for create/reply, `useCommentUpdateForm` for
 * edit — selected by the reply store's `editingComment`), so the always-mounted
 * `SocialInputDrawer` keeps a single `control` for its whole lifetime. Swapping controls
 * is not an option: react-hook-form's Controller captures its register in a mount-time
 * ref, so a swapped-in form shows its values while `onChange` keeps writing to the old
 * form — typed characters instantly revert. Mode seeding (comment body on edit start,
 * empty on edit end) happens through the update hook's reset-on-target-change effect.
 */
const useCommentComposer = ({
  targetObjectId,
  onSubmitSuccess,
}: UseCommentComposerOptions): UseCommentComposerReturn => {
  const { editingComment, resetCommentEdit } = useCommentReply()

  // The single form behind the drawer, shared by both modes.
  const form = useForm<SocialUpsertForm>({
    defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })

  const {
    submit: submitCreate,
    isLoading: isCreating,
    isReply,
    replyTargetName,
    cancelReply,
  } = useCommentCreateForm({
    targetObjectId,
    form,
    expandRepliesOnSuccess: true,
    resetFormOnReplyTargetChange: true,
    onSuccess: () => onSubmitSuccess?.(),
  })

  const {
    submit: submitUpdate,
    isLoading: isUpdating,
    cancel: cancelEdit,
  } = useCommentUpdateForm({
    target: editingComment,
    form,
    onClose: resetCommentEdit,
    onSuccess: () => onSubmitSuccess?.(),
    // Pre-refactor native behavior: the edit banner clears as soon as the user submits.
    exitOnSubmit: true,
  })

  const isEditMode = !!editingComment

  // The native submit button calls with no payload; read the form values directly
  // (same semantics as the previous `form.watch`-based submit).
  const submit = () => {
    const values = form.getValues()
    if (isEditMode) {
      submitUpdate(values)
    } else {
      submitCreate(values)
    }
  }

  return {
    form,
    submit,
    isLoading: isCreating || isUpdating,
    editVariables: {
      isEditMode,
      label: 'Editing your comment',
      onEditCancel: cancelEdit,
    },
    replyVariables: {
      isReplyMode: isReply,
      label: 'Replying to ',
      onReplyCancel: cancelReply,
      targetName: replyTargetName ?? '',
    },
  }
}

export default useCommentComposer
