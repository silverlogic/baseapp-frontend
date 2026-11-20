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

  const memberItem = (
    <MemberItemComponent
      member={memberFragment?.user?.profile}
      memberRole={memberFragment?.role}
      status={memberFragment?.status}
      userId={memberFragment?.user?.id}
      canChangeMember={data?.canChangeRole || false}
      invitedEmail={memberFragment?.invitedEmail}
      invitationExpiresAt={memberFragment?.invitationExpiresAt}
      invitationId={memberFragment?.id}
      memberRef={member}
      {...MemberItemComponentProps}
    />
  )

  // An ownerless profile (run by its admins) has no owner row to place.
  const ownerItem = data?.owner?.profile ? (
    <MemberItemComponent
      member={data.owner.profile}
      memberRole={MEMBER_ROLES.owner}
      status={MEMBER_STATUSES.active}
      searchQuery={searchQuery}
      {...MemberItemComponentProps}
    />
  ) : null

  if (isFirstActiveMember) {
    // The divider opens the owner and active block. On an ownerless profile it only separates
    // the active members from the pending and inactive rows above them, so it needs some.
    const shouldRenderDivider = Boolean(ownerItem) || !isPreviousMemberUndefined
    return (
      <>
        {shouldRenderDivider && <Divider />}
        {ownerItem}
        {memberItem}
      </>
    )
  }

  if (isLastMemberInactive && ownerItem) {
    return (
      <>
        {memberItem}
        <Divider />
        {ownerItem}
      </>
    )
  }

  return memberItem
}

export default MemberListItem
