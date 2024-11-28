import { FC, useMemo } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Box, Divider, Typography } from '@mui/material'
import { usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { UserMembersListFragment } from '../../graphql/queries/UserMembersList'
import DefaultMemberItem from '../MemberItem'
import { MemberStatuses, NUMBER_OF_MEMBERS_TO_LOAD_NEXT } from '../constants'
import { MemberListProps } from '../types'

const MembersList: FC<MemberListProps> = ({
  userRef,
  MemberItem = DefaultMemberItem,
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  membersContainerHeight = 400,
}) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    UserMembersListFragment,
    userRef,
  )

  const members = useMemo(
    () => data?.members?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.members?.edges],
  )

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  const renderMemberItem = (member: any, index: number) => {
    if (!member) return null
    if (
      (member.status === MemberStatuses.active &&
        members[index - 1]?.status !== MemberStatuses.active) ||
      (member.status === MemberStatuses.active && !members[index - 1]?.status)
    ) {
      return (
        <>
          <Divider />
          <MemberItem member={data} memberRole="owner" status={MemberStatuses.active} />
          <MemberItem
            member={member?.user?.profile}
            memberRole={member?.role}
            status={member?.status}
            canChangeMember={data?.canChangeRole || false}
            userId={member?.user?.id}
          />
        </>
      )
    }
    if (member.status !== MemberStatuses.active && !members[index + 1]?.status) {
      return (
        <>
          <MemberItem
            member={member?.user?.profile}
            memberRole={member?.role}
            status={member?.status}
            userId={member?.user?.id}
            canChangeMember={data?.canChangeRole || false}
          />
          <Divider />
          <MemberItem member={data} memberRole="owner" status={MemberStatuses.active} />
        </>
      )
    }
    return (
      <MemberItem
        member={member?.user?.profile}
        memberRole={member?.role}
        status={member?.status}
        canChangeMember={data?.canChangeRole || false}
        userId={member?.user?.id}
      />
    )
  }

  if (members.length === 0) {
    return (
      <>
        <Typography variant="subtitle2" mb={4}>
          1 member
        </Typography>
        <MemberItem member={data} memberRole="owner" status={MemberStatuses.active} />
      </>
    )
  }

  return (
    <>
      {data.members?.totalCount && (
        <Typography variant="subtitle2" mb={4}>
          {(data.members?.totalCount ?? 0) + 1} members
        </Typography>
      )}
      <Virtuoso
        style={{ height: membersContainerHeight }}
        data={members}
        overscan={NUMBER_OF_MEMBERS_TO_LOAD_NEXT}
        itemContent={(_index, member) => renderMemberItem(member, _index)}
        components={{
          Footer: renderLoadingState,
        }}
        endReached={() => {
          if (hasNext) {
            loadNext(NUMBER_OF_MEMBERS_TO_LOAD_NEXT)
          }
        }}
      />
    </>
  )
}

export default MembersList
