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
import { TitleFragment } from '../../graphql/fragments/Title'
import { getParticipantCountString, useNameAndAvatar } from '../../utils'
import { BackButtonContainer, ChatHeaderContainer, ChatTitleContainer } from './styled'
import { ChatRoomHeaderProps } from './types'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({
  participantsCount,
  roomTitleRef,
  onDisplayGroupDetailsClicked,
}) => {
  const roomHeader = useFragment(TitleFragment, roomTitleRef)

  const isUpToMd = useResponsive('up', 'md')
  const { resetChatRoom } = useChatRoom()

  const { title, avatar } = useNameAndAvatar(roomHeader)
  const members = getParticipantCountString(participantsCount)

  return (
    <ChatHeaderContainer>
      {isUpToMd ? (
        <div />
      ) : (
        <BackButtonContainer>
          <IconButton
            aria-label="return to chat room list"
            onClick={resetChatRoom}
            sx={{ maxWidth: 'fit-content' }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={24} />
          </IconButton>
        </BackButtonContainer>
      )}
      <ChatTitleContainer
        onClick={roomHeader.isGroup ? onDisplayGroupDetailsClicked : undefined}
        isClickable={roomHeader.isGroup}
      >
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
          {roomHeader.isGroup && (
            <Typography component="span" variant="caption" sx={{ float: 'left', clear: 'left' }}>
              {members}
            </Typography>
          )}
        </Box>
      </ChatTitleContainer>
    </ChatHeaderContainer>
  )
}

export default ChatRoomHeader
