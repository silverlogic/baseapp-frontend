import { FC } from 'react'

import { Divider } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileRoleStatus } from '../../../../../__generated__/MemberItemFragment.graphql'
import { MemberItemFragment } from '../../../common'
import { MEMBER_STATUSES } from '../constants'
import { MemberListItemProps } from './types'

const MemberListItem: FC<MemberListItemProps> = ({
  member,
  data,
  prevMember,
  nextMember,
  MemberItemComponent,
  memberItemComponentProps,
  searchQuery,
}) => {
  const memberFragment = useFragment(MemberItemFragment, member)
  const nextMemberFragment = useFragment(MemberItemFragment, nextMember)
  const prevMemberFragment = useFragment(MemberItemFragment, prevMember)

  const isActiveMember = memberFragment?.status === MEMBER_STATUSES.active
  const isPreviousMemberInactive = prevMemberFragment?.status !== MEMBER_STATUSES.active
  const isPreviousMemberUndefined = !prevMemberFragment?.status
  const isNextMemberUndefined = !nextMemberFragment?.status
  const isFirstActiveMember =
    (isActiveMember && isPreviousMemberInactive) || (isActiveMember && isPreviousMemberUndefined)
  const isLastMemberInactive = !isActiveMember && isNextMemberUndefined

  if (!memberFragment) return null

  if (isFirstActiveMember) {
    return (
      <>
        <Divider />
        <MemberItemComponent
          member={data}
          memberRole="owner"
          status={MEMBER_STATUSES.active as ProfileRoleStatus}
          searchQuery={searchQuery}
          {...memberItemComponentProps}
        />
        <MemberItemComponent
          member={memberFragment?.user?.profile}
          memberRole={memberFragment?.role}
          status={memberFragment?.status}
          userId={memberFragment?.user?.id}
          canChangeMember={data?.canChangeRole || false}
          {...memberItemComponentProps}
        />
      </>
    )
  }

  if (isLastMemberInactive) {
    return (
      <>
        <MemberItemComponent
          member={memberFragment?.user?.profile}
          memberRole={memberFragment?.role}
          status={memberFragment?.status}
          userId={memberFragment?.user?.id}
          canChangeMember={data?.canChangeRole || false}
          {...memberItemComponentProps}
        />
        <Divider />
        <MemberItemComponent
          member={data}
          memberRole="owner"
          status={MEMBER_STATUSES.active as ProfileRoleStatus}
          searchQuery={searchQuery}
          {...memberItemComponentProps}
        />
      </>
    )
  }

  return (
    <MemberItemComponent
      member={memberFragment?.user?.profile}
      memberRole={memberFragment?.role}
      status={memberFragment?.status}
      userId={memberFragment?.user?.id}
      canChangeMember={data?.canChangeRole || false}
      {...memberItemComponentProps}
    />
  )
}

export default MemberListItem
