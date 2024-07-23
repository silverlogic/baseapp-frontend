import { FC } from 'react'

import { PinIcon } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'

import { CommentPinnedBadgeProps } from './types'

const CommentPinnedBadge: FC<CommentPinnedBadgeProps> = ({ isPinned }) => {
  if (!isPinned) return null

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] items-center gap-1">
      <PinIcon />
      <Typography variant="body2" color="text.secondary">
        Pinned
      </Typography>
    </div>
  )
}

export default CommentPinnedBadge
