import { AddContactToGroupItemFragment$key } from '../../../../../../__generated__/AddContactToGroupItemFragment.graphql'

export type GroupItemProps = {
  roomRef: AddContactToGroupItemFragment$key
  selected: boolean
  onToggle: (groupId: string) => void
}
