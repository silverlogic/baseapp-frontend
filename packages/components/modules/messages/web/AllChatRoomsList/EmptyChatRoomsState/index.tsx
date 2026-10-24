import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/web/illustrations'

import { Box, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

const EmptyChatRoomsState = () => (
  <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
    <SocialMediaDiscussionImage sx={{ color: 'grey.500' }} />
    <Typography variant="subtitle2" color="text.secondary">
      <FormattedMessage
        id="messages.chatRoomsList.empty"
        defaultMessage="No messages to be displayed."
      />
    </Typography>
  </Box>
)

export default EmptyChatRoomsState
