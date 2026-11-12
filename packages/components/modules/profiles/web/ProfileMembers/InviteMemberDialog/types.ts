import type { ReactNode } from 'react'

import type { MemberRoleOption } from '../MemberItem/types'
import type { INVITE_MEMBER_DIALOG_COPY } from './constants'

export type InviteMemberDialogCopy = { [Key in keyof typeof INVITE_MEMBER_DIALOG_COPY]: string }

/** Extra input values, by GraphQL input field name. */
export type InviteMemberExtraValues = Record<string, unknown>

export interface InviteMemberDialogExtraFieldsProps {
  values: InviteMemberExtraValues
  setValue: (name: string, value: unknown) => void
  /** True while the invitations are being sent. */
  disabled: boolean
  selected: SelectedMember[]
}

export interface InviteMemberDialogProps {
  open: boolean
  onClose: () => void
  /** Relay connection ids to prepend newly added/invited members into. */
  connections: string[]
  /** Role given to added members and invitations. Defaults to `DEFAULT_INVITE_ROLE` (MANAGER). */
  defaultRole?: string
  /** When given, the dialog shows a role picker with these roles. */
  roleOptions?: MemberRoleOption[]
  /**
   * Ask for each invited email's first and last name. Names are sent as `invitees`, which needs a
   * backend whose `profileSendInvitation` accepts them.
   */
  collectInviteeNames?: boolean
  /**
   * Show a field for a personal note sent with the invitation emails (`message`), which needs a
   * backend whose `profileSendInvitation` accepts it.
   */
  showMessageField?: boolean
  /**
   * Renders the project's own fields under the search. Their values are merged into the input of
   * `profileSendInvitation` and `profileUserRoleCreate`, so the project declares the same fields
   * on both mutations (BaseApp's `ExtensibleMutation`).
   */
  renderExtraFields?: (props: InviteMemberDialogExtraFieldsProps) => ReactNode
  /** Initial values of the extra fields, restored whenever the dialog closes. */
  extraFieldsDefaultValues?: InviteMemberExtraValues
  /** Return false to keep the submit button disabled until the extra fields are valid. */
  validateExtraFields?: (values: InviteMemberExtraValues) => boolean
  /** Replaces any of the dialog's texts. */
  copy?: Partial<InviteMemberDialogCopy>
}

export interface SelectedProfile {
  kind: 'profile'
  profileId: string
  userId: string
  name: string
  handle?: string
  avatarUrl?: string
}

export interface SelectedEmail {
  kind: 'email'
  email: string
  firstName?: string
  lastName?: string
}

export type SelectedMember = SelectedProfile | SelectedEmail

export interface MemberSearchProps {
  selected: SelectedMember[]
  onAdd: (member: SelectedMember) => void
  onRemove: (memberKey: string) => void
  /** Placeholder of the search field. */
  placeholder?: string
}

/** A single navigable option in the member search dropdown (profile result or email row). */
export type MemberSearchOption =
  | { kind: 'profile'; profile: SelectedProfile }
  | { kind: 'email'; email: string }
