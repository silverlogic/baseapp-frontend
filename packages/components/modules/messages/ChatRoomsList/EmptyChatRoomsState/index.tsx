import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

const EmptyChatRoomsState = () => (
  <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
    <SocialMediaDiscussionImage sx={{ color: 'grey.500' }} />
    <Typography variant="subtitle2" color="text.secondary">
      No messages to be displayed.
    </Typography>
  </Box>
)

export default EmptyChatRoomsState
