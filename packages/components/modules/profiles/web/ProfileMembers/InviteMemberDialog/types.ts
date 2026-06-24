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
