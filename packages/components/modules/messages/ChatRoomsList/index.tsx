'use client'

import { FC, useCallback, useMemo, useState, useTransition } from 'react'

import {
  NoMessagesIcon as DefaultNoMessagesIcon,
  Searchbar as DefaultSearchbar,
  LoadingState,
  useResponsive,
} from '@baseapp-frontend/design-system'

import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { RoomsListFragment$key } from '../../../__generated__/RoomsListFragment.graphql'
import { useCurrentProfile } from '../../profiles'
import { useChatRoom } from '../context'
import { useRoomsList } from '../graphql/queries/RoomsList'
import useRoomListSubscription from '../graphql/subscriptions/useRoomListSubscription'
import DefaultChatRoomCard from './ChatRoomCard'
import { CHAT_TAB_LABEL, CHAT_TAB_VALUES } from './constants'
import { ChatRoomsListProps, ChatTabValues } from './types'

const ChatRoomsList: FC<ChatRoomsListProps> = ({
  targetRef,
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  ChatRoomCard = DefaultChatRoomCard,
  ChatRoomCardProps = {},
  NoMessagesIcon = DefaultNoMessagesIcon,
  NoMessagesIconProps = {},
  VirtuosoProps = {},
}) => {
  const [tab, setTab] = useState<ChatTabValues>(CHAT_TAB_VALUES.active)

  const { profile } = useCurrentProfile()
  const { data, loadNext, isLoadingNext, hasNext, refetch } = useRoomsList(
    targetRef?.me?.profile as RoomsListFragment$key,
  )

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab as ChatTabValues)
  }

  const isMobile = useResponsive('down', 'sm')
  const theme = useTheme()
  const { id: selectedRoom, setChatRoom } = useChatRoom()

  const memoizedChatRooms = useMemo(
    () => data?.chatRooms?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.chatRooms?.edges],
  )

  const renderChatCard = useCallback(
    (room: any) => {
      if (!room) return null

      return (
        <ChatRoomCard
          roomRef={room}
          isCardSelected={selectedRoom === room.id}
          handleClick={() => {
            setChatRoom({ id: room.id })
          }}
          {...ChatRoomCardProps}
        />
      )
    },
    [selectedRoom, setChatRoom, ChatRoomCardProps, ChatRoomCard],
  )

  useRoomListSubscription(data?.id as string, profile?.id as string)

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more rooms"
      />
    )
  }

  const [isPending, startTransition] = useTransition()

  return (
    <div className="grid h-full w-full grid-rows-[min-content_min-content_auto]">
      <Box
        sx={{
          paddingX: isMobile ? theme.spacing(1.5) : theme.spacing(2.5),
          paddingTop: theme.spacing(2),
        }}
      >
        {/* @ts-ignore TODO: Check typing */}
        <Searchbar
          isPending={isPending}
          startTransition={startTransition}
          refetch={refetch}
          {...SearchbarProps}
        />
      </Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        variant="fullWidth"
        sx={{
          paddingX: isMobile ? 0 : theme.spacing(2.5),
          paddingTop: theme.spacing(2),
        }}
      >
        <Tab label={CHAT_TAB_LABEL[CHAT_TAB_VALUES.active]} value={CHAT_TAB_VALUES.active} />
        <Tab label={CHAT_TAB_LABEL[CHAT_TAB_VALUES.unread]} value={CHAT_TAB_VALUES.unread} />
        <Tab label={CHAT_TAB_LABEL[CHAT_TAB_VALUES.archived]} value={CHAT_TAB_VALUES.archived} />
      </Tabs>
      <div className="h-full w-full self-start sm:h-screen">
        {memoizedChatRooms.length === 0 ? (
          <Box
            sx={{
              display: 'grid',
              justifyContent: 'center',
              gap: theme.spacing(1.5),
              padding: theme.spacing(4),
            }}
          >
            <NoMessagesIcon {...NoMessagesIconProps} />
            <Typography variant="subtitle2" color="text.secondary">
              No messages to be displayed.
            </Typography>
          </Box>
        ) : (
          <Virtuoso
            data={memoizedChatRooms}
            overscan={1}
            itemContent={(_index, item) => renderChatCard(item)}
            style={{ scrollbarWidth: 'none' }}
            components={{
              Footer: renderLoadingState,
            }}
            endReached={() => {
              if (hasNext) {
                loadNext(5)
              }
            }}
            {...VirtuosoProps}
          />
        )}
      </div>
    </div>
  )
}

export default ChatRoomsList
