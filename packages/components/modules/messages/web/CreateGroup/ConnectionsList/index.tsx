'use client'

import { FC } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { SearchNotFoundState as DefaultSearchNotFoundState } from '../../../../__shared__/web'
import DefaultEmptyProfilesListState from '../../__shared__/EmptyProfilesListState'
import { ConnectionsListProps } from './types'

const ConnectionsList: FC<ConnectionsListProps> = ({
  searchValue,
  profiles = [],
  isPending,
  isLoadingNext,
  hasNext,
  loadNext,
  renderItem,
  VirtuosoProps = {},
  EmptyProfilesListState = DefaultEmptyProfilesListState,
  SearchNotFoundState = DefaultSearchNotFoundState,
}) => {
  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more profiles"
      />
    )
  }

  const emptyProfilesList = profiles.length === 0

  if (!isPending && searchValue && emptyProfilesList) return <SearchNotFoundState />

  if (!isPending && emptyProfilesList) return <EmptyProfilesListState />

  return (
    <Virtuoso
      data={profiles}
      itemContent={(_index, item) => renderItem(item)}
      style={{ scrollbarWidth: 'none', maxHeight: '250px' }}
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

export default ConnectionsList
