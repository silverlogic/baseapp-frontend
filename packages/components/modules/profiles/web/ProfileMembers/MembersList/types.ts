import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import { UserMembersListFragment$key } from '../../../../../__generated__/UserMembersListFragment.graphql'
import { InviteMemberDialogProps } from '../InviteMemberDialog/types'
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
  /** The dialog behind "Add Member". Receives `open`, `onClose` and `connections`. */
  InviteMemberDialog?: FC<InviteMemberDialogProps>
  InviteMemberDialogProps?: Partial<InviteMemberDialogProps>
}
