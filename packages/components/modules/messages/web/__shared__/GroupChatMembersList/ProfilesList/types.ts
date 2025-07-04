import { FC, ReactNode } from 'react'

import { BoxProps } from '@mui/material'
import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { ProfileNode } from '../../types'

export interface ProfilesListProps {
  profiles: ProfileNode[]
  isLoadingNext?: boolean
  hasNext?: boolean
  loadNext?: LoadMoreFn<any>
  searchValue?: string | null
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  isPending?: boolean
  label?: string
  title?: string
  renderItem: (profile: ProfileNode, isMember?: boolean) => ReactNode | null
  SearchNotFoundState?: FC
  EmptyProfilesListState?: FC
  allowAddMember?: boolean
  onAddMemberClick?: () => void
  removeTitle?: boolean
  NormalListProps?: Partial<BoxProps>
}
