import { FC } from 'react'

import { NotificationBellIcon as DefaultNotificationBellIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Typography } from '@mui/material'

import { Container as DefaultContainer } from './styled'
import { EmptyStateProps } from './types'

const EmptyState: FC<EmptyStateProps> = ({
  Container = DefaultContainer,
  NotificationBellIcon = DefaultNotificationBellIcon,
  NotificationBellIconProps = {},
}) => (
  <Container>
    <NotificationBellIcon
      sx={{ color: 'primary.main', fontSize: 32 }}
      {...NotificationBellIconProps}
    />
    <Box textAlign="center">
      <Typography variant="subtitle2">You don’t have notifications.</Typography>
      <Typography variant="caption" color="text.secondary">
        Your future notifications will be shown here.
      </Typography>
    </Box>
  </Container>
)

export default EmptyState
