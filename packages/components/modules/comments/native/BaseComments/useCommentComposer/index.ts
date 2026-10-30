
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../../__shared__/common'
import {
  FileUploadStatus,
  useDeferredFileAttachments,
  useFileDeleteLogic,
  useFileUploadLogic,
  useFileUploadStore,
} from '../../../../files/common'
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
 *
 * While editing, files behave as on web: new uploads attach to the comment as soon as they
 * finish and removals delete right away, independent of saving the text.
 */
const useCommentComposer = ({
  targetObjectId,
  onSubmitSuccess,
}: UseCommentComposerOptions): UseCommentComposerReturn => {
  const { editingComment, resetCommentEdit } = useCommentReply()
  const {
    handleFilesSelected,
    attachTo,
    hasPendingFiles,
    scope: filesScope,
  } = useDeferredFileAttachments()
  // Scoped to the edited comment (as on web), so a new comment's draft files wait meanwhile.
  const editCommentId = editingComment?.id
  const { handleFilesSelected: handleEditFilesSelected } = useFileUploadLogic({
    targetObjectId: editCommentId,
  })
  const { handleDelete } = useFileDeleteLogic({ targetObjectId: editCommentId })
  const hasPendingEditFiles = useFileUploadStore((state) =>
    Array.from(state.files.values()).some(
      (file) => file.scope === editCommentId && file.status !== FileUploadStatus.COMPLETED,
    ),
  )

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
    onSuccess: ({ commentId }) => {
      if (commentId) {
        // Fire-and-forget: attachTo reports mutation failures through its own onError.
        attachTo(commentId).catch(() => undefined)
      }
      onSubmitSuccess?.()
    },
  })

  const {
    submit: submitUpdate,
    isLoading: isUpdating,
    cancel: cancelUpdate,
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
    // Block submit until every attachment has finished, so a paused or failed upload is
    // never silently left off the comment.
    isLoading: isEditMode ? isUpdating || hasPendingEditFiles : isCreating || hasPendingFiles,
    editVariables: {
      isEditMode,
      label: 'Editing your comment',
      onEditCancel: cancelUpdate,
    },
    attachments: isEditMode
      ? {
          onFilesSelected: handleEditFilesSelected,
          scope: editingComment.id,
          filesTarget: editingComment.filesTarget,
          onRemoveFile: handleDelete,
        }
      : {
          onFilesSelected: handleFilesSelected,
          scope: filesScope,
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
