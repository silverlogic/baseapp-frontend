'use client'

import type { FC } from 'react'

import { FileUploadTrigger } from '@baseapp-frontend/components/files/web'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

import { ActionsContainer } from './styled'
import type { CommentFilesUpsertActionsProps } from './types'

const MAX_FILES = 5

/**
 * SocialInput upsert-action bar for the comment editor: the attach icon is the
 * real file upload trigger; the mention icon stays a placeholder until wired.
 */
const CommentFilesUpsertActions: FC<CommentFilesUpsertActionsProps> = ({ target }) => {
  const intl = useIntl()

  return (
    <ActionsContainer>
      <FileUploadTrigger
        target={target}
        as="button"
        icon={<AttachmentIcon />}
        maxFiles={MAX_FILES}
        autoAttach
        label={intl.formatMessage({
          id: 'comments.upsertActions.attachFiles.ariaLabel',
          defaultMessage: 'Attach files',
        })}
      />
      <IconButton
        disabled
        aria-label={intl.formatMessage({
          id: 'comments.upsertActions.mention.ariaLabel',
          defaultMessage: 'mention',
        })}
      >
        <MentionIcon />
      </IconButton>
    </ActionsContainer>
  )
}

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
