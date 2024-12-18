import { FC, SyntheticEvent, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  ArchiveIcon,
  AvatarWithPlaceholder,
  UnarchiveIcon,
  UnreadIcon,
} from '@baseapp-frontend/design-system'

import { Box, Badge as DefaultBadge, Typography } from '@mui/material'
import { ConnectionHandler, useFragment } from 'react-relay'
import { RecordSourceSelectorProxy } from 'relay-runtime'

import { ChatRoomHeaderFragment$key } from '../../../../__generated__/ChatRoomHeaderFragment.graphql'
import { RoomFragment$key } from '../../../../__generated__/RoomFragment.graphql'
import ActionsOverlay from '../../../__shared__/ActionsOverlay'
import { useArchiveChatRoomMutation } from '../../graphql/mutations/ArchiveChatRoom'
import { ChatRoomHeaderFragment } from '../../graphql/queries/ChatRoomHeaderFragment'
import { RoomFragment } from '../../graphql/queries/Room'
import { useNameAndAvatar } from '../../utils'
import { StyledChatCard } from './styled'
import { ChatRoomItemProps } from './types'
import { formatDate } from './utils'

const ChatRoomItem: FC<ChatRoomItemProps> = ({
  roomRef,
  isCardSelected = false,
  handleClick,
  Badge = DefaultBadge,
  BadgeProps = {},
  isInArchivedTab = false,
  isInUnreadTab = false,
}) => {
  const room = useFragment<RoomFragment$key>(RoomFragment, roomRef)

  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    if (handleClick) handleClick()
  }

  const chatCardRef = useRef<HTMLDivElement>(null)

  const { currentProfile } = useCurrentProfile()

  const header = useFragment<ChatRoomHeaderFragment$key>(ChatRoomHeaderFragment, room)
  const { title, avatar } = useNameAndAvatar(header)

  const lastMessage = room.lastMessage?.content
  const { lastMessageTime } = room

  const showBadge = room.unreadMessagesCount && room.unreadMessagesCount > 0

  const [commit, isMutationInFlight] = useArchiveChatRoomMutation()

  return (
    <ActionsOverlay
      title="Chat"
      offsetTop={-12}
      actions={[
        {
          disabled: isMutationInFlight,
          icon: !isInArchivedTab ? <ArchiveIcon /> : <UnarchiveIcon />,
          label: !isInArchivedTab ? 'Archive Chat' : 'Unarchive Chat',
          onClick: () => {
            if (currentProfile?.id) {
              commit({
                variables: {
                  input: {
                    roomId: room.id,
                    profileId: currentProfile.id,
                    archive: !isInArchivedTab,
                  },
                },
                updater: (store: RecordSourceSelectorProxy<unknown>, data: any) => {
                  if (!data?.errors) {
                    const storyRecord = store.get(currentProfile.id)
                    if (storyRecord) {
                      const connectionRecord = ConnectionHandler.getConnection(
                        storyRecord,
                        'roomsList_chatRooms',
                        { unreadMessages: isInUnreadTab, archived: isInArchivedTab },
                      )
                      if (connectionRecord) {
                        ConnectionHandler.deleteNode(connectionRecord, room.id)
                      }
                    }
                  }
                },
              })
            }
          },
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
          src={avatar}
        />
        <Box display="grid" gridTemplateRows="repeat(2, minmax(0, 1fr))">
          <Typography variant="subtitle2">{title}</Typography>
          {lastMessage && lastMessageTime ? (
            <Box
              display="grid"
              gridTemplateColumns="min-content min-content auto"
              alignItems="center"
            >
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
            </Box>
          ) : (
            <div />
          )}
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
