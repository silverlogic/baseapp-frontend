import { SelectedEmail, SelectedMember, SelectedProfile } from './types'

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
