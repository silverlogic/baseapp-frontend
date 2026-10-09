import { FC, useCallback, useRef, useTransition } from 'react'

import {
  InfiniteScrollerView,
  type InfiniteScrollerViewRef,
} from '@baseapp-frontend/design-system/components/native/views'

import { useFocusEffect } from 'expo-router'
import { Dimensions } from 'react-native'

import { AddContactToGroupsListFragment$key } from '../../../../../__generated__/AddContactToGroupsListFragment.graphql'
import { useAddContactToGroupsList } from '../../../common'
import SearchNotFoundState from '../../SearchNotFoundState'
import EmptyGroupsState from '../EmptyGroupsState'
import { NUMBER_OF_GROUPS_TO_LOAD } from '../constants'
import GroupListItem from './GroupListItem'
import { styles } from './styles'
import { GroupsListProps } from './types'

const GroupsList: FC<GroupsListProps> = ({ targetRef, searchParam, selectedIds, onToggle }) => {
  const [, startTransition] = useTransition()
  const { data, loadNext, hasNext, isLoadingNext, refetch } = useAddContactToGroupsList(
    targetRef?.profile as AddContactToGroupsListFragment$key,
  )
  const layoutTriggeredRef = useRef(false)
  const screenHeight = Dimensions.get('window').height
  const flashListRef = useRef<InfiniteScrollerViewRef>(null)

  const loadNextBasedOnHeight = (height: number) => {
    if (!layoutTriggeredRef.current && hasNext && height < screenHeight) {
      layoutTriggeredRef.current = true
      loadNext(NUMBER_OF_GROUPS_TO_LOAD)
    }
  }

  const handleEmptyState = () => {
    const hasEmptyStates = data?.chatRooms?.edges?.length === 0

    if (hasEmptyStates) {
      if (searchParam) return <SearchNotFoundState />
      return <EmptyGroupsState />
    }

    return undefined
  }

  useFocusEffect(
    useCallback(() => {
      layoutTriggeredRef.current = false
      startTransition(() => {
        refetch(
          { q: searchParam },
          {
            fetchPolicy: 'store-and-network',
          },
        )
      })
    }, [refetch, searchParam, startTransition]),
  )

  return (
    <InfiniteScrollerView
      ref={flashListRef}
      data={(data?.chatRooms?.edges ?? []).filter((edge) => edge?.node)}
      renderItem={({ item }) => {
        const node = item!.node!
        return (
          <GroupListItem roomRef={node} selected={selectedIds.has(node.id)} onToggle={onToggle} />
        )
      }}
      onContentSizeChange={(_width, height) => loadNextBasedOnHeight(height)}
      keyExtractor={(item, index) => item?.node?.id ?? `group-edge-${index}`}
      onEndReached={() => {
        if (hasNext && !isLoadingNext) loadNext(NUMBER_OF_GROUPS_TO_LOAD)
      }}
      ListEmptyComponent={handleEmptyState}
      isLoading={isLoadingNext}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    />
  )
}

export default GroupsList
