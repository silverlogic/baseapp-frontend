import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CommentReplyIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { CounterContainer } from './styled'
import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({
  onReply,
  isLoadingReplies,
  totalCommentsCount,
  commentId,
  isDisabled = false,
}) => {
  const intl = useIntl()

  return (
    <CounterContainer>
      <IconButton
        disabled={isDisabled}
        onClick={onReply}
        isLoading={isLoadingReplies}
        aria-label={intl.formatMessage(
          {
            id: 'comments.reply.ariaLabel',
            defaultMessage: 'reply to comment {commentId}',
          },
          { commentId },
        )}
      >
        <CommentReplyIcon />
      </IconButton>
      <Typography
        variant="caption"
        color="text.secondary"
        aria-label={intl.formatMessage(
          {
            id: 'comments.reply.count.ariaLabel',
            defaultMessage: 'replies count {commentId}',
          },
          { commentId },
        )}
      >
        {totalCommentsCount ?? 0}
      </Typography>
    </CounterContainer>
  )
}

export default CommentReplyButton
