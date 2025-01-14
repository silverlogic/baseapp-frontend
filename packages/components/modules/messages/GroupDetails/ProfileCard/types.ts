import { MembersListFragment$data } from '../../../../__generated__/MembersListFragment.graphql'

type GroupMembers = NonNullable<MembersListFragment$data['participants']>
export type GroupMembersEdge = NonNullable<GroupMembers['edges'][number]>
export type GroupMembersNode = NonNullable<GroupMembersEdge['node']>

export interface ProfileCardProps {
  groupMember: GroupMembersNode
  hasAdminPermissions: boolean
  initiateRemoval: (id: string, name: string | null | undefined) => void
}
