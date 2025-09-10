import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { AvatarProps } from '@mui/material'
import { RefetchFnDynamic } from 'react-relay'

import { UserMembersListFragment$key } from '../../../../../../__generated__/UserMembersListFragment.graphql'
import { UsersListFragment$data } from '../../../../../../__generated__/UsersListFragment.graphql'

export type User = NonNullable<
  NonNullable<NonNullable<UsersListFragment$data['users']>['edges'][number]>['node']
>
export type NewEmail = { email: string; isNewEmail: boolean }

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
