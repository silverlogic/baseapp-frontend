import { NotificationBellIcon } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

import { Container } from './styled'

const EmptyState = () => (
  <Container>
    <NotificationBellIcon sx={{ color: 'primary.main', fontSize: 32 }} />
    <Box textAlign="center">
      <Typography variant="subtitle2">You don’t have notifications.</Typography>
      <Typography variant="caption" color="text.secondary">
        Your future notifications will be shown here.
      </Typography>
    </Box>
  </Container>
)

export default EmptyState
