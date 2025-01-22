import { FC } from 'react'

import { MemberItemFragment$key } from '../../../../__generated__/MemberItemFragment.graphql'
import { UserMembersListFragment$data } from '../../../../__generated__/UserMembersListFragment.graphql'
import { MemberItemProps } from '../MemberItem/types'

export interface MemberListItemProps {
  member: MemberItemFragment$key
  data: UserMembersListFragment$data
  prevMember: MemberItemFragment$key | null | undefined
  nextMember: MemberItemFragment$key | null | undefined
  MemberItemComponent: FC<MemberItemProps>
  memberItemComponentProps?: Partial<MemberItemProps>
  searchQuery?: string
}
