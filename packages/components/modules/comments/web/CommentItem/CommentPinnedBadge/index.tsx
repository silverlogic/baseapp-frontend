import { FC } from 'react'

import { PinIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { BadgeContainer } from './styled'
import { CommentPinnedBadgeProps } from './types'

const CommentPinnedBadge: FC<CommentPinnedBadgeProps> = ({ isPinned }) => {
  if (!isPinned) return null

  return (
    <BadgeContainer>
      <PinIcon />
      <Typography variant="body2" color="text.secondary">
        Pinned
      </Typography>
    </BadgeContainer>
  )
}

export default CommentPinnedBadge
