import { FC } from 'react'

import { PinIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { CommentPinnedBadgeProps } from './types'

const CommentPinnedBadge: FC<CommentPinnedBadgeProps> = ({ isPinned }) => {
  const intl = useIntl()

  if (!isPinned) return null

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] items-center gap-1">
      <PinIcon />
      <Typography variant="body2" color="text.secondary">
        {intl.formatMessage({
          id: 'comments.pinned.badge',
          defaultMessage: 'Pinned',
        })}
      </Typography>
    </div>
  )
}

export default CommentPinnedBadge
