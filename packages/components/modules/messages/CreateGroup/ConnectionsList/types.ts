import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { AllProfilesListPaginationQuery } from '../../../../__generated__/AllProfilesListPaginationQuery.graphql'
import { ProfileNode } from '../../types'

export interface ConnectionsListProps {
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  searchValue?: string | null
  profiles?: ProfileNode[]
  isPending: boolean
  isLoadingNext: boolean
  hasNext: boolean
  loadNext: LoadMoreFn<AllProfilesListPaginationQuery>
  renderItem: (profile: ProfileNode, isMember?: boolean) => JSX.Element | null
  SearchNotFoundState?: FC
  EmptyProfilesListState?: FC
}
