import type { FC } from 'react'

import type { GraphQLTaggedNode } from 'react-relay'

import { MembersListProps } from './MembersList/types'

export interface ProfileMembersSuspendedProps extends Pick<
  MembersListProps,
  | 'MemberItem'
  | 'MemberItemProps'
  | 'InviteMemberDialog'
  | 'InviteMemberDialogProps'
  | 'roleOptions'
  | 'inactiveMemberOptions'
  | 'roleLabels'
  | 'statusLabels'
  | 'membersListFragment'
> {
  /**
   * A project query used instead of `UserMembersListPaginationQuery`, to load the profile through
   * a `membersListFragment`. It takes `$profileId`, `$count`, `$orderBy` and `$q` (plus any of its
   * own) and spreads the fragment on `profile(id: $profileId)`.
   */
  membersQuery?: GraphQLTaggedNode
  /** Extra variables for `membersQuery`, e.g. `{ status: 'ACTIVE' }`. They override the defaults. */
  membersQueryVariables?: Record<string, unknown>
  /** Any other `MembersList` prop. Wins over the same prop given directly. */
  MembersListProps?: Partial<MembersListProps>
  title?: string
  subtitle?: string
  InitialLoadingState?: FC
}

export interface ProfileMembersProps extends Omit<
  ProfileMembersSuspendedProps,
  'title' | 'subtitle' | 'InitialLoadingState'
> {}
