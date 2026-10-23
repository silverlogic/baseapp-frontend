import type { FC } from 'react'

import { MembersListProps } from './MembersList/types'

export interface ProfileMembersSuspendedProps extends Pick<
  MembersListProps,
  | 'MemberItem'
  | 'MemberItemProps'
  | 'roleOptions'
  | 'inactiveMemberOptions'
  | 'roleLabels'
  | 'statusLabels'
> {
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
