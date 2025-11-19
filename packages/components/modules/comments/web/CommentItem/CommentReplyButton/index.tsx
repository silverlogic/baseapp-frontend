import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CommentReplyIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

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
    <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
      <IconButton
        disabled={isDisabled}
        onClick={onReply}
        isLoading={isLoadingReplies}
        aria-label={intl.formatMessage({ id: 'comments.reply.ariaLabel' }, { commentId })}
      >
        <CommentReplyIcon />
      </IconButton>
      <Typography
        variant="caption"
        color="text.secondary"
        aria-label={intl.formatMessage({ id: 'comments.reply.count.ariaLabel' }, { commentId })}
      >
        {totalCommentsCount ?? 0}
      </Typography>
    </div>
  )
}

export default CommentReplyButton
