import { FC } from 'react'

import {
  AvatarWithPlaceholder,
  IconButton,
  Iconify,
  useResponsive,
} from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { useChatRoom } from '../../context'
import { ChatRoomHeaderFragment } from '../../graphql/queries/ChatRoomHeaderFragment'
import { useNameAndAvatar } from '../../utils'
import { ChatHeaderContainer } from './styled'
import { ChatRoomHeaderProps } from './types'
import { getSubtitle } from './utils'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ roomHeaderRef }) => {
  const roomHeader = useFragment(ChatRoomHeaderFragment, roomHeaderRef)

  const isUpToMd = useResponsive('up', 'md')
  const { resetChatRoom } = useChatRoom()

  const { title, avatar } = useNameAndAvatar(roomHeader)
  const subtitle = getSubtitle(roomHeader)
  return (
    <ChatHeaderContainer>
      {isUpToMd ? (
        <div />
      ) : (
        <IconButton
          aria-label="return to chat room list"
          onClick={resetChatRoom}
          sx={{ maxWidth: 'fit-content' }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={24} />
        </IconButton>
      )}
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
