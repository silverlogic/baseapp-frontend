import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../../__shared__/common'
import type { FilesList_target$key } from '../../../../../__generated__/FilesList_target.graphql'
import type { UploadSource } from '../../../../files/common'

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

export interface CommentComposerAttachments {
  onFilesSelected: (files: UploadSource[]) => Promise<void>
  /** Upload-store scope holding the active mode's uploads. */
  scope: string
  /** Edit mode only: the edited comment's attached files. */
  filesTarget?: FilesList_target$key
  /** Edit mode only: deletes an attached file. */
  onRemoveFile?: (fileId: string) => void
}

export interface UseCommentComposerReturn {
  /** The active form: the update form while editing, the create form otherwise. */
  form: UseFormReturn<SocialUpsertForm>
  submit: () => void
  isLoading: boolean
  editVariables: CommentComposerEditVariables
  attachments: CommentComposerAttachments
  replyVariables: CommentComposerReplyVariables
}
