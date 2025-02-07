import { WeAreHiringImage } from '@baseapp-frontend/design-system/components/web/illustrations'

import { Box, Typography } from '@mui/material'

const EmptyProfilesListState = () => (
  <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
    <WeAreHiringImage sx={{ color: 'grey.500' }} />
    <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={0.5}>
      <Typography variant="subtitle2" color="text.primary">
        Search for profiles
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Once you connect to other profiles they will be shown here.
      </Typography>
    </Box>
  </Box>
)

export default EmptyProfilesListState
