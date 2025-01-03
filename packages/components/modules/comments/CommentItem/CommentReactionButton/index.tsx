import { FC } from 'react'

import { FavoriteIcon, FavoriteSelectedIcon, IconButton } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'

import ReactionButton from '../../../__shared__/ReactionButton'
import { CommentReactionButtonProps } from './types'

const CommentReactionButton: FC<CommentReactionButtonProps> = ({ target: targetRef }) => (
  <ReactionButton target={targetRef} reactionType="LIKE">
    {({ handleReaction, isLoading, target }) => (
      <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
        <IconButton
          onClick={handleReaction}
          isLoading={isLoading}
          aria-label={`react to comment ${target.id}`}
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
          aria-label={`reactions count ${target?.id}`}
        >
          {target?.reactionsCount?.total}
        </Typography>
      </div>
    )}
  </ReactionButton>
)

export default CommentReactionButton
