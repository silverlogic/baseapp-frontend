'use client'

import type { FC } from 'react'

import { FileUploadTrigger } from '@baseapp-frontend/components/files/web'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { COMMENT_FILE_ATTACHMENT_LIMITS } from '../../../common'
import { ActionsContainer } from './styled'
import type { CommentFilesUpsertActionsProps } from './types'

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
      {...COMMENT_FILE_ATTACHMENT_LIMITS}
      autoAttach
    />
    <IconButton disabled aria-label="mention">
      <MentionIcon />
    </IconButton>
  </ActionsContainer>
)

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
