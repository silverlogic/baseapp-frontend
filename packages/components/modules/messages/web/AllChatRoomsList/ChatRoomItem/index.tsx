import { FC, SyntheticEvent, useCallback, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import {
  ArchiveIcon,
  UnarchiveIcon,
  UnreadIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Badge as DefaultBadge, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { LastMessageFragment$key } from '../../../../../__generated__/LastMessageFragment.graphql'
import { TitleFragment$key } from '../../../../../__generated__/TitleFragment.graphql'
import { UnreadMessagesCountFragment$key } from '../../../../../__generated__/UnreadMessagesCountFragment.graphql'
import { ActionsOverlay } from '../../../../__shared__/web'
import {
  LastMessageFragment,
  TitleFragment,
  UnreadMessagesCountFragment,
  useArchiveChatRoomMutation,
  useTitleAndImage,
  useUnreadChatMutation,
} from '../../../common'
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
}) => {
  const lastMessageFragment = useFragment<LastMessageFragment$key>(LastMessageFragment, roomRef)
  const headerFragment = useFragment<TitleFragment$key>(TitleFragment, roomRef)
  const unreadMessagesCountFragment = useFragment<UnreadMessagesCountFragment$key>(
    UnreadMessagesCountFragment,
    roomRef,
  )
  const [commitMutation] = useUnreadChatMutation()

  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    if (handleClick) handleClick()
  }

  const chatCardRef = useRef<HTMLDivElement>(null)

  const { currentProfile } = useCurrentProfile()
  const { title, image } = useTitleAndImage(headerFragment)

  const { lastMessageTime } = lastMessageFragment
  const lastMessage = lastMessageFragment.lastMessage?.content

  const hasUnreadMessages =
    unreadMessagesCountFragment.unreadMessages?.markedUnread ||
    !!unreadMessagesCountFragment.unreadMessages?.count

  const unreadChat = useCallback(() => {
    commitMutation({
      variables: {
        input: {
          roomId: roomRef.id,
          profileId: currentProfile?.id as string,
        },
      },
    })
  }, [roomRef.id, currentProfile])

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
                    roomId: roomRef.id,
                    profileId: currentProfile.id,
                    archive: !isInArchivedTab,
                  },
                },
              })
            }
          },
          hasPermission: true,
        },
        {
          disabled: hasUnreadMessages,
          icon: <UnreadIcon />,
          label: 'Mark as Unread',
          onClick: unreadChat,
          hasPermission: true,
          closeOnClick: true,
        },
      ]}
      showDeleteButton
      handleDeleteItem={() => {}}
      isDeletingItem={false}
      ref={chatCardRef}
    >
      <StyledChatCard
        key={`room-${roomRef.id}`}
        onClick={handleCardClick}
        isCardSelected={isCardSelected}
        showPointer={!!handleClick}
      >
        <AvatarWithPlaceholder
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
          width={48}
          height={48}
          src={image}
        />
        <Box display="grid" gridTemplateRows="repeat(2, minmax(0, 1fr))">
          <TypographyWithEllipsis variant="subtitle2">{title}</TypographyWithEllipsis>
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
          badgeContent={unreadMessagesCountFragment.unreadMessages?.count || ''}
          color="error"
          max={99}
          invisible={!hasUnreadMessages}
          {...BadgeProps}
        />
      </StyledChatCard>
    </ActionsOverlay>
  )
}

export default ChatRoomItem
