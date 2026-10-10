'use client'

import type { FC } from 'react'

import { FileUploadTrigger } from '@baseapp-frontend/components/files/web'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ActionsContainer } from './styled'
import type { CommentFilesUpsertActionsProps } from './types'

const MAX_FILES = 5

/**
 * SocialInput upsert-action bar for the comment editor: the attach icon is the
 * real file upload trigger; the mention icon stays a placeholder until wired.
 */
const CommentFilesUpsertActions: FC<CommentFilesUpsertActionsProps> = ({ target }) => (
  <ActionsContainer>
    <FileUploadTrigger
      target={target}
      as="button"
      icon={<AttachmentIcon />}
      maxFiles={MAX_FILES}
      autoAttach
    />
    <IconButton disabled aria-label="mention">
      <MentionIcon />
    </IconButton>
  </ActionsContainer>
)

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
