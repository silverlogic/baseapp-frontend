import { SearchingImage } from '@baseapp-frontend/design-system/components/web/illustrations'

import { Box, Typography } from '@mui/material'

const SearchNotFoundState = () => (
  <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
    <SearchingImage sx={{ color: 'grey.500' }} />
    <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={0.5}>
      <Typography variant="subtitle2" color="text.primary">
        No results found
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Check your spelling or try another search.
      </Typography>
    </Box>
  </Box>
)

export default SearchNotFoundState
