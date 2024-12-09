import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ChatRoomHeaderFragment$data } from '../../../../__generated__/ChatRoomHeaderFragment.graphql'
import { ChatRoomHeaderFragment } from '../../graphql/queries/ChatRoomHeaderFragment'
import useNameAndAvatar from '../../hooks/useNameAndAvatar'
import { getParticipantCount, isGroupChat } from '../../hooks/utils'
import { ChatHeaderContainer } from './styled'
import { ChatRoomHeaderProps } from './types'

const getSubtitle = (roomHeader: ChatRoomHeaderFragment$data) => {
  if (isGroupChat(roomHeader)) {
    const participantCount = getParticipantCount(roomHeader)
    if (participantCount !== undefined) {
      return `${participantCount} member${participantCount > 1 ? 's' : ''}`
    }
  }
  return null
}

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ roomHeaderRef }) => {
  const roomHeader = useFragment(ChatRoomHeaderFragment, roomHeaderRef)
  const { title, avatar } = useNameAndAvatar(roomHeaderRef)
  const subtitle = getSubtitle(roomHeader)
  return (
    <ChatHeaderContainer>
      <AvatarWithPlaceholder
        className="self-start justify-self-center"
        width={32}
        height={32}
        src={avatar}
        sx={{ border: 'none', alignSelf: 'center' }}
      />
      <Box>
        <Typography component="span" variant="subtitle2" sx={{ float: 'left', clear: 'left' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography component="span" variant="caption" sx={{ float: 'left', clear: 'left' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </ChatHeaderContainer>
  )
}

export default ChatRoomHeader
