'use client'

import { FC, Suspense, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Typography, useTheme } from '@mui/material'
import { ConnectionHandler, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import {
  GroupDetailsQuery,
  MembersListFragment,
  getParticipantCountString,
  useGroupNameAndAvatar,
  useRoomListSubscription,
} from '../../common'
import LeaveGroupDialog from '../__shared__/LeaveGroupDialog'
import { GroupDetailsHeader } from './GroupDetailsHeader'
import DefaultProfileCard from './ProfileCard'
import { CHAT_ROOM_PARTICIPANT_ROLES } from './ProfileCard/constants'
import { GroupMembersEdge } from './ProfileCard/types'
import { GroupHeaderContainer, GroupTitleContainer } from './styled'
import { GroupDetailsProps } from './types'

const GroupDetails: FC<GroupDetailsProps> = ({
  onBackButtonClicked,
  onEditButtonClicked,
  queryRef,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  VirtuosoProps = {},
}) => {
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { currentProfile } = useCurrentProfile()
  const { avatar, title } = useGroupNameAndAvatar(group)
  const theme = useTheme()
  const profileId = currentProfile?.id ?? ''

  const connections = group?.id
    ? [ConnectionHandler.getConnectionID(group.id, 'ChatRoom_participants')]
    : []
  // TODO: Is there a safer way to ensure the current profile id is not undefined?
  useRoomListSubscription({
    profileId,
    connections,
    onRemoval: onBackButtonClicked,
  })

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    ChatRoomParticipantsPaginationQuery,
    MembersListFragment$key
  >(MembersListFragment, group)
  const members = data?.participants
  const me = members?.edges.find((edge) => profileId && edge?.node?.profile?.id === profileId)
  const isAdmin = me?.node?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin

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

  const [removingParticipantId, setRemovingParticipantId] = useState<string | undefined>(undefined)
  const removingParticipantName = useRef<string | null | undefined>(undefined)

  const initiateRemoval = (id: string, name: string | null | undefined) => {
    setRemovingParticipantId(id)
    removingParticipantName.current = name
  }

  const handleRemoveDialogClose = () => {
    setRemovingParticipantId(undefined)
    removingParticipantName.current = undefined
  }

  const renderItem = (item: GroupMembersEdge) => {
    if (item.node) {
      return (
        <ProfileCard
          groupMember={item.node}
          initiateRemoval={initiateRemoval}
          hasAdminPermissions={isAdmin}
          {...ProfileCardProps}
        />
      )
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
      {/* TODO: Deal with sole admin removal (will be done in another story) */}
      <LeaveGroupDialog
        profileId={profileId}
        roomId={group?.id}
        open={!!removingParticipantId}
        removingParticipantId={removingParticipantId}
        removingParticipantName={removingParticipantName.current}
        onClose={handleRemoveDialogClose}
        title={
          profileId === removingParticipantId
            ? undefined
            : `Remove ${removingParticipantName.current}?`
        }
        content={
          profileId === removingParticipantId
            ? undefined
            : `Are you sure you want to remove ${removingParticipantName.current}? This cannot be undone.`
        }
      />
      <GroupDetailsHeader
        onBackButtonClicked={onBackButtonClicked}
        onEditButtonClicked={onEditButtonClicked}
        shouldDisplayEditButton={isAdmin}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <GroupHeaderContainer>
          <CircledAvatar src={avatar} width={144} height={144} hasError={false} />
          <GroupTitleContainer>
            <TypographyWithEllipsis variant="subtitle1" color="text.primary">
              {title}
            </TypographyWithEllipsis>
            <Typography variant="body2" color="text.secondary">
              {getParticipantCountString(group?.participantsCount)}
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
