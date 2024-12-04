import { FC, SyntheticEvent, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ArchiveIcon, AvatarWithPlaceholder, UnreadIcon } from '@baseapp-frontend/design-system'

import { Box, Badge as DefaultBadge, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { RoomFragment$key } from '../../../../__generated__/RoomFragment.graphql'
import ActionsOverlay from '../../../__shared__/ActionsOverlay'
import { MINIMUM_AMOUNT_OF_PARTICIPANTS_TO_SHOW_ROOM_TITLE } from '../../constants'
import { RoomFragment } from '../../graphql/queries/Room'
import { StyledChatCard } from './styled'
import { ChatRoomItemProps } from './types'
import { formatDate } from './utils'

const ChatRoomItem: FC<ChatRoomItemProps> = ({
  roomRef,
  isCardSelected = false,
  handleClick,
  Badge = DefaultBadge,
  BadgeProps = {},
}) => {
  const room = useFragment<RoomFragment$key>(RoomFragment, roomRef)

  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    if (handleClick) handleClick()
  }

  const chatCardRef = useRef<HTMLDivElement>(null)

  const profile = useCurrentProfile().currentProfile

  const roomData = {
    title: room.title,
    avatarUrl: room.image?.url,
  }

  if (
    room.participants?.totalCount &&
    room.participants?.totalCount < MINIMUM_AMOUNT_OF_PARTICIPANTS_TO_SHOW_ROOM_TITLE
  ) {
    const otherParticipant = room.participants.edges.find(
      (edge) => edge?.node?.profile?.id && edge?.node?.profile?.id !== profile?.id,
    )
    roomData.title = otherParticipant?.node?.profile?.name
    roomData.avatarUrl = otherParticipant?.node?.profile?.image?.url
  }

  const lastMessage = room.lastMessage?.content
  const { lastMessageTime } = room

  const showBadge = room.unreadMessagesCount && room.unreadMessagesCount > 0

  return (
    <ActionsOverlay
      title="Chat"
      offsetTop={-12}
      actions={[
        {
          disabled: true,
          icon: <ArchiveIcon />,
          label: 'Archive Chat',
          onClick: () => {},
          hasPermission: true,
        },
        {
          disabled: false,
          icon: <UnreadIcon />,
          label: 'Mark as Unread',
          onClick: () => {},
          hasPermission: true,
        },
      ]}
      enableDelete
      handleDeleteItem={() => {}}
      isDeletingItem={false}
      ref={chatCardRef}
    >
      <StyledChatCard
        key={`room-${room.id}`}
        onClick={handleCardClick}
        isCardSelected={isCardSelected}
        showPointer={!!handleClick}
      >
        <AvatarWithPlaceholder
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
          width={48}
          height={48}
          src={roomData.avatarUrl}
        />
        <Box display="grid" gridTemplateRows="repeat(2, minmax(0, 1fr)">
          <Typography variant="subtitle2">{roomData.title}</Typography>
          <Box display="grid" gridTemplateColumns="1fr min-content" alignItems="center">
            {lastMessage && lastMessageTime && (
              <>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {formatDate(lastMessageTime)}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-block',
                    height: '6px',
                    width: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'text.disabled',
                    marginX: '8px',
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {lastMessage}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Badge
          sx={{ marginRight: '12px', justifySelf: 'center', display: 'flex', alignItems: 'center' }}
          badgeContent={room.unreadMessagesCount}
          color="error"
          max={99}
          invisible={!showBadge}
          {...BadgeProps}
        />
      </StyledChatCard>
    </ActionsOverlay>
  )
}

export default ChatRoomItem
