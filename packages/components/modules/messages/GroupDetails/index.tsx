'use client'

import { FC, Suspense } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CircledAvatar, LoadingState } from '@baseapp-frontend/design-system'

import { Box, Typography, useTheme } from '@mui/material'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { ChatRoomParticipantsPaginationQuery } from '../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../__generated__/MembersListFragment.graphql'
import { GroupDetailsQuery } from '../graphql/queries/GroupDetailsQuery'
import { MembersListFragment } from '../graphql/queries/MembersList'
import { GroupDetailsHeader } from './GroupDetailsHeader'
import DefaultProfileCard from './ProfileCard'
import { GroupHeaderContainer, GroupTitleContainer } from './styled'
import { GroupDetailsProps, GroupMembersEdge } from './types'

const GroupDetails: FC<GroupDetailsProps> = ({
  onBackButtonClicked,
  onEditButtonClicked,
  queryRef,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  VirtuosoProps = {},
}) => {
  const theme = useTheme()
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { currentProfile } = useCurrentProfile()

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    ChatRoomParticipantsPaginationQuery,
    MembersListFragment$key
  >(MembersListFragment, group)
  const members = data?.participants
  const me = members?.edges.find(
    (edge) => currentProfile?.id && edge?.node?.profile?.id === currentProfile?.id,
  )
  const isAdmin = me?.node?.role === 'ADMIN'

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more profiles"
      />
    )
  }

  const renderItem = (item: GroupMembersEdge) => {
    const profile = item?.node?.profile
    if (profile) {
      return <ProfileCard role={item?.node?.role} profile={profile} {...ProfileCardProps} />
    }
    return null
  }

  const renderMembers = () => (
    <Virtuoso
      data={members?.edges}
      itemContent={(_index, item: GroupMembersEdge) => renderItem(item)}
      style={{ scrollbarWidth: 'none' }}
      components={{
        Footer: renderLoadingState,
      }}
      endReached={() => {
        if (hasNext) {
          loadNext(5)
        }
      }}
      {...VirtuosoProps}
    />
  )

  return (
    <>
      <GroupDetailsHeader
        onBackButtonClicked={onBackButtonClicked}
        onEditButtonClicked={onEditButtonClicked}
        shouldDisplayEditButton={isAdmin}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <GroupHeaderContainer>
          <CircledAvatar src={group?.image?.url} width={144} height={144} />
          <GroupTitleContainer>
            <Typography variant="subtitle1" color="text.primary">
              {group?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {members?.totalCount} member{members?.totalCount !== 1 ? 's' : ''}
            </Typography>
          </GroupTitleContainer>
        </GroupHeaderContainer>
        <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
          <Box role="list" aria-label="group members">
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{
                padding: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Members
            </Typography>
          </Box>
          <Box height="100%" width="100%">
            {renderMembers()}
          </Box>
        </Box>
      </Box>
    </>
  )
}

const SuspendedGroupDetails: FC<GroupDetailsProps> = ({ onBackButtonClicked, ...props }) => (
  // Displays a 'preliminary' header and a spinner below
  // Header has "Group Details" label and back button, but no edit button (appears if the group details are loaded and current user has admin permissions)
  <Suspense
    fallback={
      <>
        <GroupDetailsHeader
          onBackButtonClicked={onBackButtonClicked}
          shouldDisplayEditButton={false}
        />
        <LoadingState />
      </>
    }
  >
    <GroupDetails onBackButtonClicked={onBackButtonClicked} {...props} />
  </Suspense>
)

export default SuspendedGroupDetails
