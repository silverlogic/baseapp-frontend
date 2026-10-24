import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  FavoriteIcon,
  FavoriteSelectedIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { ReactionButton } from '../../../../__shared__/common'
import { CounterContainer } from './styled'
import { CommentReactionButtonProps } from './types'

const CommentReactionButton: FC<CommentReactionButtonProps> = ({ target: targetRef, onClick }) => {
  const intl = useIntl()

  return (
    <ReactionButton onClick={onClick} target={targetRef} reactionType="LIKE">
      {({ handleReaction, target }) => (
        <CounterContainer>
          <IconButton
            onClick={handleReaction}
            aria-label={intl.formatMessage(
              { id: 'comments.reaction.ariaLabel', defaultMessage: 'react to comment {commentId}' },
              { commentId: target.id },
            )}
          >
            {target?.myReaction?.id ? (
              <FavoriteSelectedIcon sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <Typography
            variant="caption"
            color="text.secondary"
            aria-label={intl.formatMessage(
              {
                id: 'comments.reaction.count.ariaLabel',
                defaultMessage: 'reactions count {commentId}',
              },
              { commentId: target?.id },
            )}
          >
            {target?.reactionsCount?.total}
          </Typography>
        </CounterContainer>
      )}
    </ReactionButton>
  )
}

export default CommentReactionButton
