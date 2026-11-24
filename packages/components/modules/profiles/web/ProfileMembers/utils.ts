import type { MessageDescriptor } from 'react-intl'

import type { MemberLabels, MemberOptionLabel, MemberRoleOption } from './MemberItem/types'
import { MEMBER_ROLE_AND_STATUS_MESSAGES } from './constants'

type FormatMessage = (descriptor: MessageDescriptor) => string

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

/** An option label as text: a string as is, a message descriptor through `formatMessage`. */
export const formatMemberOptionLabel = (
  label: MemberOptionLabel,
  formatMessage?: FormatMessage,
) => {
  if (typeof label === 'string') return label
  if (formatMessage) return formatMessage(label)
  return String(label.defaultMessage ?? label.id)
}

/**
 * The label to show for a role or status value: the project's label, else the label of the
 * matching menu option, else BaseApp's translated label for the value, else the value
 * capitalized (`MEMBER` -> `Member`). Pass `intl.formatMessage` to translate.
 */
export const getMemberLabel = (
  value: string | null | undefined,
  labels?: MemberLabels,
  options?: MemberRoleOption[],
  formatMessage?: FormatMessage,
): string => {
  if (!value) return ''
  const projectLabel = labels?.[value]
  if (projectLabel) return projectLabel
  const optionLabel = options?.find((option) => option.value === value)?.label
  if (optionLabel) return formatMemberOptionLabel(optionLabel, formatMessage)
  const message = MEMBER_ROLE_AND_STATUS_MESSAGES[value]
  if (message) return formatMemberOptionLabel(message, formatMessage)
  return capitalizeFirstLetter(value)
}
