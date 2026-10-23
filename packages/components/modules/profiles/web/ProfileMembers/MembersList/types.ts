import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { UserMembersListFragment$key } from '../../../../../__generated__/UserMembersListFragment.graphql'
import { MemberItemProps } from '../MemberItem/types'

export interface MembersListProps extends Pick<
  MemberItemProps,
  'roleOptions' | 'inactiveMemberOptions' | 'roleLabels' | 'statusLabels'
> {
  MemberItem?: FC<MemberItemProps>
  MemberItemProps?: Partial<MemberItemProps>
  userRef: UserMembersListFragment$key
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
}
