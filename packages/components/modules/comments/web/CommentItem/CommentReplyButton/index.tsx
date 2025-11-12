import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CommentReplyIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({
  onReply,
  isLoadingReplies,
  totalCommentsCount,
  commentId,
  isDisabled = false,
}) => (
  <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
    <IconButton
      disabled={isDisabled}
      onClick={onReply}
      isLoading={isLoadingReplies}
      aria-label={`reply to comment ${commentId}`}
    >
      <CommentReplyIcon />
    </IconButton>
    <Typography variant="caption" color="text.secondary" aria-label={`replies count ${commentId}`}>
      {totalCommentsCount ?? 0}
    </Typography>
  </div>
)

export default CommentReplyButton
