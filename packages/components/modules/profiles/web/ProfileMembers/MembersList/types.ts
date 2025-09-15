import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { AvatarProps, ListItemProps } from '@mui/material'
import { RefetchFnDynamic } from 'react-relay'

import { UserMembersListFragment$key } from '../../../../../__generated__/UserMembersListFragment.graphql'
import { UsersListFragment$data } from '../../../../../__generated__/UsersListFragment.graphql'
import { MemberItemProps } from '../MemberItem/types'

export type User = NonNullable<
  NonNullable<NonNullable<UsersListFragment$data['users']>['edges'][number]>['node']
>
export type NewEmail = { email: string; isNewEmail: boolean }

export interface MembersListProps {
  MemberItem?: FC<MemberItemProps>
  MemberItemProps?: Partial<MemberItemProps>
  userRef: UserMembersListFragment$key
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
  membersContainerHeight?: number
}

export interface AddMembersDialogProps {
  isOpen: boolean
  onClose: () => void
  profileId?: string
  refetchMembers: RefetchFnDynamic<any, UserMembersListFragment$key>
  LoadingStateProps?: LoadingStateProps
}

export interface UserCardProps {
  user: User | NewEmail
  onRemove: () => void
  avatarProps?: AvatarProps
}

export interface UserListItemContainerProps extends ListItemProps {
  isEmpty?: boolean
}

export type VirtuosoListboxFunction = (
  props: any,
  autocompleteOptions: (User | NewEmail)[],
  handleItemSelection: (option: User | NewEmail) => void,
  renderLoadingState: () => React.ReactNode,
  hasNext: boolean,
  isLoadingNext: boolean,
  loadNext: (count: number) => void,
) => React.ReactElement
