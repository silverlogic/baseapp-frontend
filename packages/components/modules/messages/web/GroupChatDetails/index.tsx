'use client'

import { FC, Suspense, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box } from '@mui/material'
import { ConnectionHandler, usePaginationFragment, usePreloadedQuery } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import {
  GroupDetailsQuery,
  MembersListFragment,
  useCheckIsAdmin,
  useGroupNameAndAvatar,
  useRoomListSubscription,
} from '../../common'
import LeaveGroupDialog from '../__shared__/LeaveGroupDialog'
import DefaultBody from './Body'
import DefaultHeader from './Header'
import DefaultProfileCard from './ProfileCard'
import { GroupMembersEdge } from './ProfileCard/types'
import { GroupChatDetailsProps } from './types'

const GroupChatDetails: FC<GroupChatDetailsProps> = ({
  onBackButtonClicked,
  onEditButtonClicked,
  queryRef,
  Header = DefaultHeader,
  HeaderProps = {},
  Body = DefaultBody,
  BodyProps = {},
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  VirtuosoProps = {},
}) => {
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { currentProfile } = useCurrentProfile()
  const { avatar, title } = useGroupNameAndAvatar(group)
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
  const { isAdmin, isSoleAdmin } = useCheckIsAdmin(members)
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
        removingParticipantId={removingParticipantId ?? ''}
        onClose={handleRemoveDialogClose}
        isSoleAdmin={isSoleAdmin}
      />
      <Header
        onBackButtonClicked={onBackButtonClicked}
        onEditButtonClicked={onEditButtonClicked}
        shouldDisplayEditButton={isAdmin}
        {...HeaderProps}
      />
      <Body
        title={title}
        avatar={avatar}
        participantsCount={group?.participantsCount}
        {...BodyProps}
      >
        {renderMembers()}
      </Body>
    </>
  )
}

const SuspendedGroupDetails: FC<GroupChatDetailsProps> = ({
  onBackButtonClicked,
  Header = DefaultHeader,
  HeaderProps = {},
  ...props
}) => (
  // Displays a 'preliminary' header and a spinner below
  // Header has "Group Details" label and back button, but no edit button (appears if the group details are loaded and current user has admin permissions)
  <Suspense
    fallback={
      <>
        <Header
          onBackButtonClicked={onBackButtonClicked}
          shouldDisplayEditButton={false}
          {...HeaderProps}
        />
        <LoadingState />
      </>
    }
  >
    <GroupChatDetails onBackButtonClicked={onBackButtonClicked} {...props} />
  </Suspense>
)

export default SuspendedGroupDetails
