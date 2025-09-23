import React, { Suspense, useEffect, useRef, useTransition } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { useAllProfilesList } from '../../../../profiles/common'
import { withChatRoomProvider } from '../../../common'
import SearchNotFoundState from '../../SearchNotFoundState'
import ChatRoomListItem from './CreateRoomListItem'
import { createStyles } from './styles'
import { CreateRoomListProps } from './types'

const CreateRoomList = ({ targetRef, searchParam }: CreateRoomListProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const [isPending, startTransition] = useTransition()
  const { data, refetch, loadNext, hasNext } = useAllProfilesList(targetRef)

  const profiles = data?.allProfiles?.edges ?? []
  const layoutTriggeredRef = useRef(false)
  const screenHeight = Dimensions.get('window').height

  const loadNextBasedOnHeight = (height: number) => {
    if (!layoutTriggeredRef.current && hasNext && height < screenHeight) {
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

  useEffect(() => {
    layoutTriggeredRef.current = false
    startTransition(() => {
      refetch({ q: searchParam })
    })
  }, [refetch, searchParam])

  return (
    <View style={styles.flatListWrapper}>
      <FlatList
        data={profiles}
        keyExtractor={(item, i) => (item && item.node?.id) || i.toString()}
        renderItem={({ item }) => (item?.node ? <ChatRoomListItem profile={item.node} /> : null)}
        onEndReached={() => {
          if (hasNext) loadNext(10)
        }}
        onEndReachedThreshold={0.8}
        onContentSizeChange={(width, height) => loadNextBasedOnHeight(height)}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatList}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={handleEmptySearch}
      />
    </View>
  )
}

const CreateRoomListWithProvider = withChatRoomProvider(CreateRoomList)

const SuspendedCreateRoomList = (props: CreateRoomListProps) => (
  <Suspense>
    <CreateRoomListWithProvider {...props} />
  </Suspense>
)

export default SuspendedCreateRoomList
