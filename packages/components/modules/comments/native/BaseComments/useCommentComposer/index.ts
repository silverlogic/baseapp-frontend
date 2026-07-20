import { useEffect } from 'react'

import { useCommentCreateForm, useCommentReply, useCommentUpdateForm } from '../../../common'
import { UseCommentComposerOptions, UseCommentComposerReturn } from './types'

/**
 * State machine for the native single bottom composer: it consumes BOTH shared form hooks
 * (`useCommentCreateForm` for create/reply, `useCommentUpdateForm` for edit — driven by the
 * reply store's `editingComment`) and swaps which one backs the always-mounted
 * `SocialInputDrawer`, so the gorhom bottom sheet never remounts when the mode changes.
 */
const useCommentComposer = ({
  targetObjectId,
  onSubmitSuccess,
}: UseCommentComposerOptions): UseCommentComposerReturn => {
  const { editingComment, resetCommentEdit } = useCommentReply()

  const {
    form: createForm,
    submit: submitCreate,
    isLoading: isCreating,
    isReply,
    replyTargetName,
    cancelReply,
  } = useCommentCreateForm({
    targetObjectId,
    expandRepliesOnSuccess: true,
    resetFormOnReplyTargetChange: true,
    onSuccess: () => onSubmitSuccess?.(),
  })

  const {
    form: updateForm,
    submit: submitUpdate,
    isLoading: isUpdating,
    cancel: cancelEdit,
  } = useCommentUpdateForm({
    target: editingComment,
    onClose: resetCommentEdit,
    onSuccess: () => onSubmitSuccess?.(),
    // Pre-refactor native behavior: the edit banner clears as soon as the user submits.
    exitOnSubmit: true,
  })

  const isEditMode = !!editingComment

  // Entering edit mode discards the create draft (parity with the previous single-form composer).
  useEffect(() => {
    if (editingComment) {
      createForm.reset()
    }
    // `createForm` is stable across renders (react-hook-form).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingComment?.id])

  const form = isEditMode ? updateForm : createForm

  // The native submit button calls with no payload; read the active form's values directly
  // (same semantics as the previous `form.watch`-based submit).
  const submit = () => {
    if (isEditMode) {
      submitUpdate(updateForm.getValues())
    } else {
      submitCreate(createForm.getValues())
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
