export const INVITE_MEMBER_DIALOG_COPY = {
  title: 'Add member',
  description: 'Add profiles to your organization or send an invitation email.',
  searchPlaceholder: 'Invite members by name or email',
  cancel: 'Cancel',
  submit: 'Invite',
} as const

/**
 * Role assigned to newly added members / invitations. The design has no role picker in
 * the dialog — the role is changed per-row in the members list afterward — so we default
 * to the lowest-privilege role (mirrors the backend default in `ProfileUserRoleCreate`).
 */
export const DEFAULT_INVITE_ROLE = 'MANAGER' as const

export const SEARCH_DEBOUNCE_MS = 300

export const SEARCH_RESULTS_COUNT = 8

// Domain labels exclude `.` so each `\.` is an unambiguous separator — this avoids the
// super-linear backtracking SonarCloud (S8786) flags on adjacent `+` quantifiers over
// dot-including classes, while still requiring a `local@label.label` shape.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/

/** id linking the search input (combobox) to its options popup (listbox) for ARIA. */
export const LISTBOX_ID = 'invite-member-search-listbox'
