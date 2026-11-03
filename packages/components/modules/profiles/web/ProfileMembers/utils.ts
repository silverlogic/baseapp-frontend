import type { MemberLabels, MemberRoleOption } from './MemberItem/types'

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

/**
 * The label to show for a role or status value: the project's label, else the label of the
 * matching menu option, else the value capitalized (`MANAGER` -> `Manager`).
 */
export const getMemberLabel = (
  value: string | null | undefined,
  labels?: MemberLabels,
  options?: MemberRoleOption[],
): string => {
  if (!value) return ''
  return (
    labels?.[value] ??
    options?.find((option) => option.value === value)?.label ??
    capitalizeFirstLetter(value)
  )
}
