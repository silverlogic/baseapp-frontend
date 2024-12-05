import { FC, useMemo } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { MemberItemFragment$key } from '../../../../__generated__/MemberItemFragment.graphql'
import { UserMembersListFragment } from '../../graphql/queries/UserMembersList'
import DefaultMemberItem from '../MemberItem'
import MemberListItem from '../MemberListItem'
import { MemberStatuses, NUMBER_OF_MEMBERS_TO_LOAD_NEXT } from '../constants'
import { MemberListProps } from '../types'

const MembersList: FC<MemberListProps> = ({
  userRef,
  MemberItem = DefaultMemberItem,
  MemberItemProps = {},
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

  const renderMemberItem = (member: MemberItemFragment$key, index: number) => (
    <MemberListItem
      member={member}
      data={data}
      prevMember={members[index - 1]}
      nextMember={members[index + 1]}
      MemberItemComponent={MemberItem}
      memberItemComponentProps={MemberItemProps}
    />
  )

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
      <Typography variant="subtitle2" mb={4}>
        {(data.members?.totalCount ?? 0) + 1} members
      </Typography>
      <Virtuoso
        style={{ height: membersContainerHeight }}
        data={members}
        itemContent={(_index, member) => member && renderMemberItem(member, _index)}
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
