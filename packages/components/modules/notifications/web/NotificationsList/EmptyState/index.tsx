import { FC } from 'react'

import { NotificationBellIcon as DefaultNotificationBellIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

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
      <Typography variant="subtitle2">
        <FormattedMessage
          id="notifications.emptyState.title"
          defaultMessage="You don’t have notifications."
        />
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <FormattedMessage
          id="notifications.emptyState.description"
          defaultMessage="Your future notifications will be shown here."
        />
      </Typography>
    </Box>
  </Container>
)

export default EmptyState
