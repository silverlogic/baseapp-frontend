'use client'

import type { FC } from 'react'

import { FileUploadTrigger } from '@baseapp-frontend/components/files/web'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

import type { CommentFilesUpsertActionsProps } from './types'

const MAX_FILES = 5
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const ACCEPTED_FILE_TYPES = {
  'image/*': ['.png', '.jpg'],
  'application/pdf': ['.pdf'],
}

/**
 * SocialInput upsert-action bar for the comment editor: the attach icon is the
 * real file upload trigger; the mention icon stays a placeholder until wired.
 */
const CommentFilesUpsertActions: FC<CommentFilesUpsertActionsProps> = ({ target }) => (
  <div className="grid grid-cols-[repeat(2,max-content)] gap-2">
    <FileUploadTrigger
      target={target}
      as="button"
      icon={<AttachmentIcon />}
      maxFiles={MAX_FILES}
      maxFileSize={MAX_FILE_SIZE}
      acceptedFileTypes={ACCEPTED_FILE_TYPES}
      autoAttach
    />
    <IconButton disabled aria-label="mention">
      <MentionIcon />
    </IconButton>
  </div>
)

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
