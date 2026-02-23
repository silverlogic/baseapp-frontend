import React, { Suspense, useEffect, useRef, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useAllProfilesList } from '@baseapp-frontend/components/profiles/common'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { InfiniteScrollerView, View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Dimensions } from 'react-native'

import { withChatRoomProvider } from '../../../common'
import SearchNotFoundState from '../../SearchNotFoundState'
import CreateGroupListItem from './CreateGroupListItem'
import ChatRoomListItem from './CreateRoomListItem'
import SelectedGroupMembers from './SelectedGroupMembers'
import { createStyles } from './styles'
import { CreateRoomListProps } from './types'

const CreateRoomList = ({ targetRef, searchParam, isGroup }: CreateRoomListProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const { currentProfile } = useCurrentProfile()

  const [isPending, startTransition] = useTransition()
  const { data, refetch, loadNext, isLoadingNext, hasNext } = useAllProfilesList(targetRef)

  const profiles =
    data?.allProfiles?.edges?.filter((profile) =>
      isGroup ? profile?.node?.id !== currentProfile?.id : true,
    ) ?? []
  const layoutTriggeredRef = useRef(false)
  const screenHeight = Dimensions.get('window').height

  const loadNextBasedOnHeight = (height: number) => {
    if (!layoutTriggeredRef.current && hasNext && !isLoadingNext && height < screenHeight) {
      layoutTriggeredRef.current = true
      loadNext(10)
    }
  }

  const handleEmptySearch = () => {
    if (searchParam && !isPending && !profiles.length) {
      return <SearchNotFoundState />
    }
    return null
  }

  const renderItem = ({ item }: { item: (typeof profiles)[0] }) => {
    if (!item?.node) return null
    return isGroup ? (
      <CreateGroupListItem profile={item.node} />
    ) : (
      <ChatRoomListItem profile={item.node} />
    )
  }

  useEffect(() => {
    layoutTriggeredRef.current = false
    startTransition(() => {
      refetch({ q: searchParam })
    })
  }, [refetch, searchParam])

  return (
    <>
      {isGroup && <SelectedGroupMembers />}
      <View style={styles.flatListWrapper}>
        <InfiniteScrollerView
          data={profiles}
          keyExtractor={(item, i) => (item && item.node?.id) || i.toString()}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNext && !isLoadingNext) loadNext(10)
          }}
          onEndReachedThreshold={0.8}
          onContentSizeChange={(width, height) => loadNextBasedOnHeight(height)}
          contentContainerStyle={styles.contentContainer}
          style={styles.flatList}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={handleEmptySearch}
          isLoading={isLoadingNext}
        />
      </View>
    </>
  )
}

const CreateRoomListWithProvider = withChatRoomProvider(CreateRoomList)

const SuspendedCreateRoomList = (props: CreateRoomListProps) => (
  <Suspense fallback={<LoadingScreen />}>
    <CreateRoomListWithProvider {...props} />
  </Suspense>
)

export default SuspendedCreateRoomList
