export const toggleGroupSelection = (
  selectedIds: ReadonlySet<string>,
  groupId: string,
): Set<string> => {
  const next = new Set(selectedIds)
  if (next.has(groupId)) {
    next.delete(groupId)
  } else {
    next.add(groupId)
  }
  return next
}
