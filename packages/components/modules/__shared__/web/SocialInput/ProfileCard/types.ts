import { MembersListFragment$data } from '../../../../../__generated__/MembersListFragment.graphql'

type GroupMembers = NonNullable<MembersListFragment$data['memberList']>
export type GroupMembersEdge = NonNullable<GroupMembers['edges'][number]>
export type GroupMembersNode = NonNullable<GroupMembersEdge['node']>

export interface ProfileCardProps {
  groupMember: GroupMembersNode
  isSelected: boolean
  tagUser: () => void
  setName: (name: string | undefined | null) => void
}
