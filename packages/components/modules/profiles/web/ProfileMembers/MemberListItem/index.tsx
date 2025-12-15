import { FC } from 'react'

import { Divider } from '@mui/material'
import { useFragment } from 'react-relay'

import { MemberItemFragment } from '../../../common'
import { MEMBER_ROLES, MEMBER_STATUSES } from '../constants'
import { MemberListItemProps } from './types'

const MemberListItem: FC<MemberListItemProps> = ({
  member,
  data,
  prevMember,
  nextMember,
  MemberItemComponent,
  MemberItemComponentProps,
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
          memberRole={MEMBER_ROLES.owner}
          status={MEMBER_STATUSES.active}
          searchQuery={searchQuery}
          {...MemberItemComponentProps}
        />
        <MemberItemComponent
          member={memberFragment?.user?.profile}
          memberRole={memberFragment?.role}
          status={memberFragment?.status}
          userId={memberFragment?.user?.id}
          canChangeMember={data?.canChangeRole || false}
          {...MemberItemComponentProps}
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
          {...MemberItemComponentProps}
        />
        <Divider />
        <MemberItemComponent
          member={data}
          memberRole={MEMBER_ROLES.owner}
          status={MEMBER_STATUSES.active}
          searchQuery={searchQuery}
          {...MemberItemComponentProps}
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
      {...MemberItemComponentProps}
    />
  )
}

export default MemberListItem
