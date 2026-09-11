import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CommentReplyIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { CounterContainer } from './styled'
import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({
  onReply,
  isLoadingReplies,
  totalCommentsCount,
  commentId,
  isDisabled = false,
}) => (
  <CounterContainer>
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
  </CounterContainer>
)

export default CommentReplyButton
