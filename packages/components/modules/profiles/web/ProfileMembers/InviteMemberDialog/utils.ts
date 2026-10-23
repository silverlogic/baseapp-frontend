import { InviteMemberExtraValues, SelectedEmail, SelectedMember, SelectedProfile } from './types'

// Profile selections are keyed by `userId` (not `profileId`) because the add-member
// mutation operates on userId — a single user can have multiple profiles, and keying
// by profileId would let the same account be selected/submitted more than once.
// `profileId` is kept on the selection only as display metadata.
export const getMemberKey = (member: SelectedMember): string =>
  member.kind === 'profile' ? `profile:${member.userId}` : `email:${member.email}`

export const isSelectedProfile = (member: SelectedMember): member is SelectedProfile =>
  member.kind === 'profile'

export const isSelectedEmail = (member: SelectedMember): member is SelectedEmail =>
  member.kind === 'email'

/**
 * Error carrying the selections it relates to, so a partially-failed batch submit can keep
 * exactly the failed entries selected for retry.
 */
export class BatchError extends Error {
  members: SelectedMember[]

  constructor(message: string, members: SelectedMember[]) {
    super(message)
    this.name = 'BatchError'
    this.members = members
  }
}

export const isFulfilled = <T>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> => result.status === 'fulfilled'

export const isRejected = (
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult => result.status === 'rejected'

interface InvitationInputOptions {
  profileId: string
  role: string
  extraValues?: InviteMemberExtraValues
}

/**
 * The `profileSendInvitation` input for a batch of emails. Names go out as `invitees` only when
 * one was entered and a message only when it is not blank, so a dialog that uses neither sends
 * the same `emails` input as before.
 */
export const buildSendInvitationInput = ({
  profileId,
  role,
  members,
  message,
  extraValues,
}: InvitationInputOptions & { members: SelectedEmail[]; message?: string }) => {
  const invitees = members.map(({ email, firstName, lastName }) => ({
    email,
    ...(firstName?.trim() && { firstName: firstName.trim() }),
    ...(lastName?.trim() && { lastName: lastName.trim() }),
  }))
  const hasNames = invitees.some((invitee) => 'firstName' in invitee || 'lastName' in invitee)
  const trimmedMessage = message?.trim()

  return {
    // Project fields first, so they can never replace the dialog's own.
    ...extraValues,
    profileId,
    role,
    ...(hasNames ? { invitees } : { emails: members.map((member) => member.email) }),
    ...(trimmedMessage && { message: trimmedMessage }),
  }
}

/** The `profileUserRoleCreate` input that adds the selected profiles' users as members. */
export const buildAddMembersInput = ({
  profileId,
  role,
  members,
  extraValues,
}: InvitationInputOptions & { members: SelectedProfile[] }) => ({
  ...extraValues,
  profileId,
  usersIds: members.map((member) => member.userId),
  roleType: role,
})
