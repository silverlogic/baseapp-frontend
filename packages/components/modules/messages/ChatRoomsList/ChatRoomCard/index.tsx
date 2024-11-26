import { FC, SyntheticEvent } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Badge as DefaultBadge, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { RoomFragment$key } from '../../../../__generated__/RoomFragment.graphql'
import { useCurrentProfile } from '../../../profiles'
import { MINIMUM_AMOUNT_OF_PARTICIPANTS_TO_SHOW_ROOM_TITLE } from '../../constants'
import { RoomFragment } from '../../graphql/queries/Room'
import { StyledChatCard } from './styled'
import { ChatRoomCardProps } from './types'
import { formatDate } from './utils'

const ChatRoomCard: FC<ChatRoomCardProps> = ({
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

  const { profile } = useCurrentProfile()

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
    <StyledChatCard
      key={`room-${room.id}`}
      onClick={handleCardClick}
      isCardSelected={isCardSelected}
      showPointer={!!handleClick}
    >
      <AvatarWithPlaceholder
        className="self-start justify-self-center"
        width={48}
        height={48}
        src={roomData.avatarUrl}
      />
      <div className="grid grid-rows-2">
        <Typography variant="subtitle2">{roomData.title}</Typography>
        <div className="grid grid-cols-[min-content_min-content_auto] items-center">
          {lastMessage && lastMessageTime && (
            <>
              <Typography variant="caption" color="text.secondary" noWrap>
                {formatDate(lastMessageTime)}
              </Typography>
              <div className="mx-2 inline-block h-1.5 w-1.5 rounded-full bg-text-disabled" />
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
        </div>
      </div>
      <div className="mr-3 flex items-center justify-center">
        <Badge
          badgeContent={room.unreadMessagesCount}
          color="error"
          max={99}
          invisible={!showBadge}
          {...BadgeProps}
        />
      </div>
    </StyledChatCard>
  )
}

export default ChatRoomCard
