'use client'

import { ChangeEventHandler, FC, useCallback, useMemo, useState, useTransition } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { Searchbar as DefaultSearchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Virtuoso } from 'react-virtuoso'

import { RoomsListFragment$key } from '../../../../__generated__/RoomsListFragment.graphql'
import { SearchNotFoundState } from '../../../__shared__/web'
import { useChatRoom, useRoomListSubscription, useRoomsList } from '../../common'
import DefaultChatRoomItem from './ChatRoomItem'
import DefaultEmptyChatRoomsState from './EmptyChatRoomsState'
import { CHAT_TAB_LABEL, CHAT_TAB_VALUES } from './constants'
import { ChatRoomListContainer } from './styled'
import { ChatRoomNode, ChatRoomsListProps, ChatTabValues } from './types'

const ChatRoomsList: FC<ChatRoomsListProps> = ({
  targetRef,
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  ChatRoomItem = DefaultChatRoomItem,
  ChatRoomItemProps = {},
  EmptyChatRoomsState = DefaultEmptyChatRoomsState,
  VirtuosoProps = {},
}) => {
  const [tab, setTab] = useState<ChatTabValues>(CHAT_TAB_VALUES.active)

  const [isRefetchPending, startRefetchTransition] = useTransition()
  const { data, loadNext, isLoadingNext, hasNext, refetch } = useRoomsList(
    targetRef?.me?.profile as RoomsListFragment$key,
  )

  const [isPending, startTransition] = useTransition()
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })

  const isInArchivedTab = tab === CHAT_TAB_VALUES.archived
  const isInUnreadTab = tab === CHAT_TAB_VALUES.unread
  const searchValue = watch('search')

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({
        q: value,
        unreadMessages: isInUnreadTab,
        archived: isInArchivedTab,
      })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      reset()
      refetch({
        q: '',
        unreadMessages: isInUnreadTab,
        archived: isInArchivedTab,
      })
    })
  }

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab as ChatTabValues)
    startRefetchTransition(() => {
      refetch(
        {
          q: searchValue,
          unreadMessages: newTab === CHAT_TAB_VALUES.unread,
          archived: newTab === CHAT_TAB_VALUES.archived,
        },
        { fetchPolicy: 'store-and-network' },
      )
    })
  }

  const { id: selectedRoom, setChatRoom } = useChatRoom()
  const chatRooms = useMemo(
    () => data?.chatRooms?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.chatRooms?.edges],
  )

  useRoomListSubscription({ profileId: data.id, connections: [] })

  const renderItem = useCallback(
    (room: ChatRoomNode) => {
      if (!room) return null

      return (
        <ChatRoomItem
          roomRef={room}
          isCardSelected={selectedRoom === room.id}
          handleClick={() => {
            setChatRoom({ id: room.id })
          }}
          isInArchivedTab={isInArchivedTab}
          {...ChatRoomItemProps}
        />
      )
    },
    [selectedRoom, setChatRoom, ChatRoomItemProps, ChatRoomItem, isInArchivedTab],
  )

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

  const renderTabLabel = (tabValue: ChatTabValues) => (
    <Box display="grid" gap={1} gridTemplateColumns="1fr min-content" alignItems="center">
      <Typography variant="subtitle2" color="text.primary">
        {CHAT_TAB_LABEL[tabValue]}
      </Typography>
      {isRefetchPending && tab === tabValue && <CircularProgress size={15} />}
    </Box>
  )

  const renderListContent = () => {
    const emptyChatRoomsList = chatRooms.length === 0

    if (!isPending && searchValue && emptyChatRoomsList) return <SearchNotFoundState />

    if (!isPending && emptyChatRoomsList) return <EmptyChatRoomsState />

    return (
      <Virtuoso
        data={chatRooms}
        overscan={1}
        itemContent={(_index, item) => renderItem(item)}
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
    )
  }

  return (
    <ChatRoomListContainer>
      <Box
        sx={{
          paddingX: {
            xs: 1.5,
            sm: 2.5,
          },
          paddingTop: 2,
        }}
      >
        <Searchbar
          key={
            tab /* The handleSearchChange function depends on tab.
            Searchbar calls useRef on the onChange function (to debounce),
            hence it does not see the changes unless it is reloaded */
          }
          name="search"
          control={control}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          isPending={isPending}
          {...SearchbarProps}
        />
      </Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        variant="fullWidth"
        sx={{
          paddingX: {
            xs: 0,
            sm: 2.5,
          },
          paddingTop: 2,
        }}
      >
        <Tab label={renderTabLabel(CHAT_TAB_VALUES.active)} value={CHAT_TAB_VALUES.active} />
        <Tab label={renderTabLabel(CHAT_TAB_VALUES.unread)} value={CHAT_TAB_VALUES.unread} />
        <Tab label={renderTabLabel(CHAT_TAB_VALUES.archived)} value={CHAT_TAB_VALUES.archived} />
      </Tabs>
      {renderListContent()}
    </ChatRoomListContainer>
  )
}

export default ChatRoomsList
