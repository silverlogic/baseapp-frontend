import { AddContactToGroupsQuery$data } from '../../../../../__generated__/AddContactToGroupsQuery.graphql'

export type GroupsListProps = {
  targetRef: AddContactToGroupsQuery$data
  searchParam: string
  selectedIds: ReadonlySet<string>
  onToggle: (groupId: string) => void
}
