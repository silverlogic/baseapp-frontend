import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { ThreeDotsIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  TitleFragment,
  getParticipantCountString,
  useArchiveChatRoomMutation,
  useChatRoom,
  useNameAndAvatar,
} from '../../../common'
import LeaveGroupDialog from '../../__shared__/LeaveGroupDialog'
import ChatRoomOptions from './ChatRoomOptions'
import { BackButtonContainer, ChatHeaderContainer, ChatTitleContainer } from './styled'
import { ChatRoomHeaderProps } from './types'

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({
  isArchived,
  participantsCount,
  roomTitleRef,
  onDisplayGroupDetailsClicked,
  roomId,
}) => {
  const roomHeader = useFragment(TitleFragment, roomTitleRef)
  const [open, setOpen] = useState(false)

  const isUpToMd = useResponsive('up', 'md')
  const { resetChatRoom } = useChatRoom()

  const { isGroup } = roomHeader
  const { title, avatar } = useNameAndAvatar(roomHeader)
  const members = getParticipantCountString(participantsCount)
  const popover = usePopover()
  const { currentProfile } = useCurrentProfile()
  const [commit, isMutationInFlight] = useArchiveChatRoomMutation()

  const toggleArchiveChatroom = () => {
    popover.onClose()
    if (currentProfile?.id && roomId) {
      commit({
        variables: {
          input: {
            roomId,
            profileId: currentProfile.id,
            archive: !isArchived,
          },
        },
      })
    }
  }

  const onChatRoomOptionsClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    popover.onOpen(e)
  }

  return (
    <>
      <LeaveGroupDialog
        open={open}
        onClose={() => setOpen(false)}
        profileId={currentProfile?.id}
        roomId={roomId}
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
          onClick={isGroup ? onDisplayGroupDetailsClicked : undefined}
          isClickable={isGroup}
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
            {isGroup && (
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
                isArchived={isArchived}
                isArchiveMutationInFlight={isMutationInFlight}
                isGroup={isGroup}
                onArchiveClicked={toggleArchiveChatroom}
                onDetailsClicked={() => {
                  popover.onClose()
                  onDisplayGroupDetailsClicked()
                }}
                onLeaveClicked={() => {
                  popover.onClose()
                  setOpen(true)
                }}
              />
            </Popover>
          </Box>
        </ChatTitleContainer>
      </ChatHeaderContainer>
    </>
  )
}

export default ChatRoomHeader
