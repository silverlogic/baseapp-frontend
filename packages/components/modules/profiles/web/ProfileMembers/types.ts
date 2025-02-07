import type { FC } from 'react'

import { MembersListProps } from './MembersList/types'

export interface ProfileMembersSuspendedProps {
  MembersListProps?: Partial<MembersListProps>
  title?: string
  subtitle?: string
  InitialLoadingState?: FC
}

export interface ProfileMembersProps
  extends Omit<ProfileMembersSuspendedProps, 'title' | 'subtitle' | 'InitialLoadingState'> {}
