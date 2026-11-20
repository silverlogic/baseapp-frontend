import { defineMessages } from 'react-intl'

export const INVITE_MEMBER_DIALOG_MESSAGES = defineMessages({
  title: {
    id: 'profiles.inviteMemberDialog.title',
    defaultMessage: 'Add member',
  },
  description: {
    id: 'profiles.inviteMemberDialog.description',
    defaultMessage: 'Add profiles to your organization or send an invitation email.',
  },
  searchPlaceholder: {
    id: 'profiles.inviteMemberDialog.searchPlaceholder',
    defaultMessage: 'Invite members by name or email',
  },
  cancel: {
    id: 'common.cancel',
    defaultMessage: 'Cancel',
  },
  submit: {
    id: 'profiles.inviteMemberDialog.submit',
    defaultMessage: 'Invite',
  },
  addMembersFailed: {
    id: 'profiles.inviteMemberDialog.addMembersFailed',
    defaultMessage: 'Failed to add members',
  },
  sendInvitationsFailed: {
    id: 'profiles.inviteMemberDialog.sendInvitationsFailed',
    defaultMessage: 'Failed to send invitations',
  },
  membersAdded: {
    id: 'profiles.inviteMemberDialog.membersAdded',
    defaultMessage: '{count, plural, one {Member added} other {# members added}}',
  },
  removeMember: {
    id: 'profiles.inviteMemberDialog.removeMember',
    defaultMessage: 'Remove member',
  },
  roleLabel: {
    id: 'profiles.inviteMemberDialog.roleLabel',
    defaultMessage: 'Role',
  },
  inviteeNamesTitle: {
    id: 'profiles.inviteMemberDialog.inviteeNamesTitle',
    defaultMessage: 'Invitee names',
  },
  firstNameLabel: {
    id: 'profiles.inviteMemberDialog.firstNameLabel',
    defaultMessage: 'First name',
  },
  lastNameLabel: {
    id: 'profiles.inviteMemberDialog.lastNameLabel',
    defaultMessage: 'Last name',
  },
  messageLabel: {
    id: 'profiles.inviteMemberDialog.messageLabel',
    defaultMessage: 'Message (optional)',
  },
  messagePlaceholder: {
    id: 'profiles.inviteMemberDialog.messagePlaceholder',
    defaultMessage: 'Add a personal note to the invitation email',
  },
})

/** The dialog texts a project can replace through the `copy` prop. */
export const INVITE_MEMBER_DIALOG_COPY_KEYS = [
  'title',
  'description',
  'searchPlaceholder',
  'cancel',
  'submit',
  'roleLabel',
  'inviteeNamesTitle',
  'firstNameLabel',
  'lastNameLabel',
  'messageLabel',
  'messagePlaceholder',
] as const

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
