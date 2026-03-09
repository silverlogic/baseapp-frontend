import { MembersListFragment$data } from '../../../../../__generated__/MembersListFragment.graphql'
import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'

type GroupMembers = NonNullable<MembersListFragment$data['participants']>
export type GroupMembersEdge = NonNullable<GroupMembers['edges'][number]>
export type GroupMembersNode = NonNullable<GroupMembersEdge['node']>

export interface ProfileCardProps {
  groupMember: GroupMembersNode
  hasAdminPermissions: boolean
  initiateRemoval: (profileFragmentRef: ProfileItemFragment$key) => void
  groupId?: string
}
