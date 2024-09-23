import { FC } from 'react'

import { AvatarWithPlaceholder, TypographyWithEllipsis } from '@baseapp-frontend/design-system'
import { formatRelativeTime } from '@baseapp-frontend/utils'

import { TimelineDot } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { GenericItemProps } from '../types'
import { BodyTypographyContainer } from './styled'

const CommentReply: FC<GenericItemProps> = ({ notification }) => (
  <Box display="grid" gap={2} gridTemplateColumns="min-content 1fr" padding={2.5}>
    <AvatarWithPlaceholder
      width={40}
      height={40}
      alt={notification.actor?.fullName ?? `Notification's user avatar`}
      src={notification.actor?.avatar?.url}
    />
    <Box display="grid" gap={1}>
      <Box display="grid">
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
          <Box
            display="grid"
            gap={0.5}
            alignItems="center"
            gridTemplateColumns="repeat(2, max-content)"
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {notification?.actor?.fullName}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              replied your comment
            </Typography>
          </Box>
          {notification.unread && <TimelineDot color="error" />}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatRelativeTime(notification.timestamp)}
        </Typography>
      </Box>
      <BodyTypographyContainer>
        <TypographyWithEllipsis variant="body2" maxHeight={64} lineClamp={2}>
          {notification.actionObject?.body}
        </TypographyWithEllipsis>
      </BodyTypographyContainer>
    </Box>
  </Box>
)

export default CommentReply
