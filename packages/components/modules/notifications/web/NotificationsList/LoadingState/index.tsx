import { LoadingState as BaseAppLoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { NOTIFICATIONS_LIST_MESSAGES } from '../constants'
import { HeaderContainer } from '../styled'

const LoadingState = () => (
  <Box
    display="grid"
    gridTemplateRows="min-content 1fr"
    height="100%"
    sx={{ backgroundColor: 'common.white' }}
  >
    <HeaderContainer>
      <Typography variant="h6">
        <FormattedMessage {...NOTIFICATIONS_LIST_MESSAGES.title} />
      </Typography>
    </HeaderContainer>
    <BaseAppLoadingState />
  </Box>
)

export default LoadingState
