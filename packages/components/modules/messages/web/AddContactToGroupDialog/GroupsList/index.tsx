'use client'

import { ChangeEventHandler, FC, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { Searchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLazyLoadQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { AddContactToGroupsListFragment$key } from '../../../../../__generated__/AddContactToGroupsListFragment.graphql'
import { AddContactToGroupsQuery as AddContactToGroupsQueryType } from '../../../../../__generated__/AddContactToGroupsQuery.graphql'
import { SearchNotFoundState } from '../../../../__shared__/web'
import { AddContactToGroupsQuery, useAddContactToGroupsList } from '../../../common'
import { NUMBER_OF_GROUPS_TO_LOAD } from '../constants'
import GroupItem from './GroupItem'
import { SearchbarContainer } from './styled'
import { GroupsListProps } from './types'

const GroupsList: FC<GroupsListProps> = ({ contactProfileId, selectedIds, onToggle }) => {
  const { currentProfile } = useCurrentProfile()
  const profileId = currentProfile?.id ?? ''
  const [isPending, startTransition] = useTransition()
  const {
    control: searchControl,
    reset: searchReset,
    watch: searchWatch,
  } = useForm({
    defaultValues: { search: '' },
  })
  const searchValue = searchWatch('search')

  const queryData = useLazyLoadQuery<AddContactToGroupsQueryType>(
    AddContactToGroupsQuery,
    { profileId, contactProfileId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: contactProfileId,
    },
  )

  const { data, loadNext, hasNext, isLoadingNext, refetch } = useAddContactToGroupsList(
    queryData?.profile as AddContactToGroupsListFragment$key,
  )

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      searchReset()
      refetch({ q: '' })
    })
  }

  const edges = (data?.chatRooms?.edges ?? []).filter((edge) => edge?.node)

  const renderItem = (item: (typeof edges)[number]) => {
    const node = item!.node!
    return <GroupItem roomRef={node} selected={selectedIds.has(node.id)} onToggle={onToggle} />
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more groups"
      />
    )
  }

  const renderEmptyState = () => {
    if (isPending) return <LoadingState CircularProgressProps={{ size: 15 }} />
    if (searchValue) return <SearchNotFoundState />

    return (
      <Box sx={{ display: 'grid', gap: 1, justifyItems: 'center', padding: 3 }}>
        <Typography variant="subtitle2" color="text.primary">
          No groups yet
        </Typography>
        <Typography variant="caption" color="text.secondary">
          You can only add contacts to groups you manage.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <SearchbarContainer>
        <Searchbar
          name="search"
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          control={searchControl}
          isPending={isPending}
        />
      </SearchbarContainer>
      {edges.length === 0 ? (
        renderEmptyState()
      ) : (
        <Virtuoso
          data={edges}
          itemContent={(_index, item) => renderItem(item)}
          style={{ height: '100vh', maxHeight: '400px', scrollbarWidth: 'none' }}
          components={{
            Footer: renderLoadingState,
          }}
          endReached={() => {
            if (hasNext && !isLoadingNext) loadNext(NUMBER_OF_GROUPS_TO_LOAD)
          }}
        />
      )}
    </>
  )
}

export default GroupsList
