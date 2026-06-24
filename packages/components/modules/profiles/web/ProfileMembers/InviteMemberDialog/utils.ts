import { SelectedEmail, SelectedMember, SelectedProfile } from './types'

export const getMemberKey = (member: SelectedMember): string =>
  member.kind === 'profile' ? `profile:${member.profileId}` : `email:${member.email}`

export const isSelectedProfile = (member: SelectedMember): member is SelectedProfile =>
  member.kind === 'profile'

export const isSelectedEmail = (member: SelectedMember): member is SelectedEmail =>
  member.kind === 'email'
