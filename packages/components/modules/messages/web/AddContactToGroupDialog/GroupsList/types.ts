export type GroupsListProps = {
  contactProfileId: string
  selectedIds: ReadonlySet<string>
  onToggle: (groupId: string) => void
}
