import { SearchingImage } from '@baseapp-frontend/design-system/components/web/illustrations'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { Container } from './styled'

// TODO: check no profiles empty state
const EmptyState = () => (
  <Container>
    <SearchingImage sx={{ color: 'primary.main', fontSize: 100 }} />
    <Box textAlign="center">
      <Typography variant="subtitle2">
        <FormattedMessage
          id="profiles.profilesList.empty.title"
          defaultMessage="There are no profiles created."
        />
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <FormattedMessage
          id="profiles.profilesList.empty.description"
          defaultMessage="Your future profiles will be shown here."
        />
      </Typography>
    </Box>
  </Container>
)

export default EmptyState
