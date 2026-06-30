export interface InviteMemberDialogProps {
  open: boolean
  onClose: () => void
  /** Called after members are successfully added/invited (e.g. to refetch the list). */
  onInvited?: () => void
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
}

export type SelectedMember = SelectedProfile | SelectedEmail

export interface MemberSearchProps {
  selected: SelectedMember[]
  onAdd: (member: SelectedMember) => void
  onRemove: (memberKey: string) => void
}

/** A single navigable option in the member search dropdown (profile result or email row). */
export type MemberSearchOption =
  | { kind: 'profile'; profile: SelectedProfile }
  | { kind: 'email'; email: string }

/** Shape of the `errors` field returned by the invite-flow mutation payloads. */
export type MutationErrors =
  | ReadonlyArray<{ readonly messages: ReadonlyArray<string> } | null | undefined>
  | null
  | undefined
