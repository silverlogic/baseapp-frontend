import type { FC } from 'react'

import type { LoadingStateProps } from '@baseapp-frontend/design-system'

import type { UserMembersListFragment$key } from '../../../__generated__/UserMembersListFragment.graphql'
import type { MemberItemProps } from './MemberItem/types'

export interface MemberListProps {
  MemberItem: FC<MemberItemProps>
  MemberItemProps?: Partial<MemberItemProps>
  userRef: UserMembersListFragment$key
  LoadingState: FC<LoadingStateProps>
  LoadingStateProps: LoadingStateProps
  membersContainerHeight?: number
  searchQuery?: string
}

export interface UserMembersSuspendedProps {
  MemberItem?: FC<MemberItemProps>
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
  title?: string
  subtitle?: string
  InitialLoadingState?: FC
  membersContainerHeight?: number
}

export interface UserMembersProps extends Omit<MemberListProps, 'userRef'> {
  searchQuery?: string
}
