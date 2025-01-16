import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  AvatarWithPlaceholder,
  IconButton,
  Iconify,
  Popover,
  ThreeDotsIcon,
  usePopover,
  useResponsive,
} from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { RoomTitleFragment$key } from '../../../../__generated__/RoomTitleFragment.graphql'
import LeaveGroupDialog from '../../__shared__/LeaveGroupDialog'
import { useChatRoom } from '../../context'
import { RoomTitleFragment } from '../../graphql/fragments/RoomTitle'
import { TitleFragment } from '../../graphql/fragments/Title'
import { getParticipantCountString, useCheckIsAdmin, useNameAndAvatar } from '../../utils'
import ChatRoomOptions from './ChatRoomOptions'
import { BackButtonContainer, ChatHeaderContainer, ChatTitleContainer } from './styled'
import { ChatRoomHeaderProps } from './types'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({
  participantsCount,
  roomTitleRef,
  onDisplayGroupDetailsClicked,
  roomId,
}) => {
  const roomHeader = useFragment(TitleFragment, roomTitleRef)
  const [open, setOpen] = useState(false)
  const { currentProfile } = useCurrentProfile()

  const isUpToMd = useResponsive('up', 'md')
  const { resetChatRoom } = useChatRoom()

  const { title, avatar } = useNameAndAvatar(roomHeader)
  const { participants } = useFragment<RoomTitleFragment$key>(RoomTitleFragment, roomHeader)
  const { isSoleAdmin } = useCheckIsAdmin(participants)
  const members = getParticipantCountString(participantsCount)
  const popover = usePopover()

  const onChatRoomOptionsClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    popover.onOpen(e)
  }

  return (
    <>
      <LeaveGroupDialog
        open={open}
        onClose={() => setOpen(false)}
        profileId={currentProfile?.id ?? ''}
        roomId={roomId}
        removingParticipantId={currentProfile?.id ?? ''}
        isSoleAdmin={isSoleAdmin}
      />
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
          <Box>
            <IconButton onClick={onChatRoomOptionsClicked} aria-label="Show chatroom options">
              <ThreeDotsIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Popover
              open={popover.open}
              onClose={popover.onClose}
              slotProps={{
                root: { onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation() },
              }}
            >
              <ChatRoomOptions
                onArchiveClicked={() => {}}
                onDetailsClicked={() =>
                  roomHeader.isGroup ? onDisplayGroupDetailsClicked() : undefined
                }
                onLeaveClicked={() => setOpen(true)}
              />
            </Popover>
          </Box>
        </ChatTitleContainer>
      </ChatHeaderContainer>
    </>
  )
}

export default ChatRoomHeader
