import { FC } from 'react'

import { CommentReplyIcon, IconButton } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'

import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({
  onReply,
  isLoadingReplies,
  totalCommentsCount,
  commentId,
}) => (
  <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
    <IconButton
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
