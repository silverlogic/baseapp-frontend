import { SearchingImage } from '@baseapp-frontend/design-system/components/web/illustrations'

import { Box, Typography } from '@mui/material'

import { Container } from './styled'

// TODO: check no profiles empty state
const EmptyState = () => (
  <Container>
    <SearchingImage sx={{ color: 'primary.main', fontSize: 100 }} />
    <Box textAlign="center">
      <Typography variant="subtitle2">There are no profiles created.</Typography>
      <Typography variant="caption" color="text.secondary">
        Your future profiles will be shown here.
      </Typography>
    </Box>
  </Container>
)

export default EmptyState
