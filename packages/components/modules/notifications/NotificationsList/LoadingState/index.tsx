import { LoadingState as BaseAppLoadingState } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

import { HeaderContainer } from '../styled'

const LoadingState = () => (
  <Box
    display="grid"
    gridTemplateRows="min-content 1fr"
    height="100%"
    sx={{ backgroundColor: 'common.white' }}
  >
    <HeaderContainer>
      <Typography variant="h6">Notifications</Typography>
    </HeaderContainer>
    <BaseAppLoadingState />
  </Box>
)

export default LoadingState
