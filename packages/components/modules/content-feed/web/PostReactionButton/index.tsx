import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  FavoriteIcon,
  FavoriteSelectedIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { ReactionButton } from '../../../__shared__/common'
import { CounterContainer } from './styled'
import { PostReactionButtonProps } from './types'

const PostReactionButton: FC<PostReactionButtonProps> = ({ target: targetRef, onClick }) => {
  const intl = useIntl()

  return (
    <ReactionButton target={targetRef} reactionType="LIKE" onClick={onClick}>
      {({ handleReaction, target }) => (
        <CounterContainer>
          <IconButton
            onClick={handleReaction}
            aria-label={intl.formatMessage(
              { id: 'contentFeed.reaction.ariaLabel', defaultMessage: 'react to comment {postId}' },
              { postId: target.id },
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
                id: 'contentFeed.reaction.count.ariaLabel',
                defaultMessage: 'reactions count {postId}',
              },
              { postId: target?.id },
            )}
          >
            {target?.reactionsCount?.total}
          </Typography>
        </CounterContainer>
      )}
    </ReactionButton>
  )
}

export default PostReactionButton
