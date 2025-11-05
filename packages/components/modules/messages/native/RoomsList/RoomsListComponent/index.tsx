import { FC, useCallback, useRef, useTransition } from 'react'

import { useFocusEffect } from 'expo-router'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { RoomsListFragment$key } from '../../../../../__generated__/RoomsListFragment.graphql'
import { useRoomsList } from '../../../common'
import SearchNotFoundState from '../../SearchNotFoundState'
import { ChatCard } from '../ChatCard'
import EmptyChatRoomsState from '../EmptyChatRoomsState'
import { RoomsListProps } from '../types'
import { CHAT_TAB_VALUES } from './constants'

const RoomsListComponent: FC<RoomsListProps> = ({ targetRef, searchParam, selectedTab }) => {
  const [isPending, startTransition] = useTransition()
  const { data, loadNext, hasNext, refetch } = useRoomsList(
    targetRef?.me?.profile as RoomsListFragment$key,
  )
  const layoutTriggeredRef = useRef(false)
  const screenHeight = Dimensions.get('window').height

  const loadNextBasedOnHeight = (height: number) => {
    if (!layoutTriggeredRef.current && hasNext && height < screenHeight) {
      layoutTriggeredRef.current = true
      loadNext(10)
    }
  }

  const handleEmptyState = () => {
    const hasEmptyStates = data?.chatRooms?.edges.length === 0

    if (hasEmptyStates) {
      if (searchParam) return <SearchNotFoundState />
      return <EmptyChatRoomsState />
    }

    return undefined
  }

  useFocusEffect(
    useCallback(() => {
      layoutTriggeredRef.current = false
      if (isPending) return
      startTransition(() => {
        refetch(
          {
            q: searchParam,
            unreadMessages: selectedTab === CHAT_TAB_VALUES.unread,
            archived: selectedTab === CHAT_TAB_VALUES.archived,
          },
          { fetchPolicy: 'store-and-network' },
        )
      })
    }, [refetch, searchParam, selectedTab, isPending]),
  )

  return (
    <FlatList
      data={(data?.chatRooms?.edges ?? []).filter((e) => e?.node)}
      renderItem={({ item }) => {
        const node = item!.node!
        return <ChatCard roomRef={node} isArchived={selectedTab === CHAT_TAB_VALUES.archived} />
      }}
      onContentSizeChange={(_width, height) => loadNextBasedOnHeight(height)}
      keyExtractor={(item, index) => item?.node?.id ?? `room-edge-${index}`}
      onEndReached={() => {
        if (hasNext && !isPending) loadNext(10)
      }}
      ListEmptyComponent={handleEmptyState}
    />
  )
}

export default RoomsListComponent
