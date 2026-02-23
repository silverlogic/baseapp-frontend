import { FC } from 'react'

import { MembersListFragment$data } from '../../../../../../__generated__/MembersListFragment.graphql'
import { MemberOptionsProps } from '../MemberOptions/type'
import { RemoveAdminPermissionsDialogProps } from './RemoveAdminPermissionsDialog/type'

type GroupMembers = NonNullable<MembersListFragment$data['participants']>
export type GroupMembersEdge = NonNullable<GroupMembers['edges'][number]>
export type GroupMembersNode = NonNullable<GroupMembersEdge['node']>

export interface MemberItemProps {
  groupMember: GroupMembersNode
  memberIsAdmin?: boolean
  currentProfileIsAdmin?: boolean
  groupId: string
  MemberOptions?: FC<MemberOptionsProps>
  MemberOptionsProps?: Partial<MemberOptionsProps>
  RemoveAdminPermissionsDialog?: FC<RemoveAdminPermissionsDialogProps>
  RemoveAdminPermissionsDialogProps?: Partial<RemoveAdminPermissionsDialogProps>
}
