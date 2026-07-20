import { AddContactToGroupItemFragment$key } from '../../../../../../__generated__/AddContactToGroupItemFragment.graphql'

export type GroupListItemProps = {
  roomRef: AddContactToGroupItemFragment$key
  selected: boolean
  onToggle: (groupId: string) => void
}
