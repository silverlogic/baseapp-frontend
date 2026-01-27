import { MembersListFragment$data } from '../../../../../../__generated__/MembersListFragment.graphql'

type GroupMembers = NonNullable<MembersListFragment$data['participants']>
export type GroupMembersEdge = NonNullable<GroupMembers['edges'][number]>
export type GroupMembersNode = NonNullable<GroupMembersEdge['node']>

export interface MemberItemProps {
  groupMember: GroupMembersNode
  memberIsAdmin?: boolean
  currentProfileIsAdmin?: boolean
  groupId: string
}
