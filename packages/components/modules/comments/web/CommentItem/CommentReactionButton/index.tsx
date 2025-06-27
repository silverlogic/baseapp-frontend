import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  FavoriteIcon,
  FavoriteSelectedIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { ReactionButton } from '../../../../__shared__/common'
import { CommentReactionButtonProps } from './types'

const CommentReactionButton: FC<CommentReactionButtonProps> = ({ target: targetRef }) => (
  <ReactionButton target={targetRef} reactionType="LIKE">
    {({ handleReaction, target }) => (
      <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
        <IconButton onClick={handleReaction} aria-label={`react to comment ${target.id}`}>
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
