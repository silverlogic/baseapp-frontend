import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  MessageItemFragment$data,
  MessageItemFragment$key,
} from '../../../__generated__/MessageItemFragment.graphql'
import { MessageItemFragment } from '../graphql/queries/MessageItem'

// export const fragmentQuery = graphql`
//   fragment MessageItemFragment on Message @refetchable(queryName: "MessageItemRefetchQuery") {
//     id
//     content
//     created
//     verb
//     extraData
//     profile {
//       id
//     }
//   }
// `

const MessageItem = ({
  messageRef,
  profileId,
}: {
  messageRef: MessageItemFragment$key
  profileId: string
}) => {
  const message = useFragment(MessageItemFragment, messageRef)
  // TODO: use current profile hook when it is available
  const isOwnMessage = profileId === message?.profile?.id

  const getColor = (verb: MessageItemFragment$data['verb']) => {
    if (verb === 'SENT_MESSAGE') {
      return { color: 'surface.900', backgroundColor: isOwnMessage ? 'primary.300' : 'surface.300' }
    }
    return { color: 'surface.700', backgroundColor: 'surface.300' }
  }

  const currentVerb = getColor(message.verb)

  return (
    <Box
      gap={1}
      sx={{
        borderRadius: '12px',
        color: currentVerb.color,
        backgroundColor: currentVerb.backgroundColor,
        maxWidth: '400px',
        display: 'inline-flex',
        px: 1.5,
        py: 1,
        lineHeight: 20,
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{message?.content}</Typography>
      </Box>
    </Box>
  )
}

export default MessageItem
