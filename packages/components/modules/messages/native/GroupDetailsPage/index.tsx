import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { CloseIcon, EditIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { ScrollView, View } from '@baseapp-frontend/design-system/components/native/views'

import { useRouter } from 'expo-router'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import {
  GroupDetailsQuery,
  MembersListFragment,
  useArchiveChatRoomMutation,
  useCheckIsAdmin,
} from '../../common'
import { LeaveGroupDialog as DefaultLeaveGroupDialog } from '../__shared__/LeaveGroupDialog'
import { useMessagesListSubscription } from '../graphql/subscriptions/useMessagesListSubscription'
import DefaultGroupProfile from './GroupProfile'
import DefaultMembers from './Members'
import DefaultOptions from './Options'
import { GroupDetailsPageProps } from './type'

const GroupDetailsPage: FC<GroupDetailsPageProps> = ({
  roomId,
  LeaveGroupDialog = DefaultLeaveGroupDialog,
  LeaveGroupDialogProps = {},
  GroupProfile = DefaultGroupProfile,
  GroupProfileProps = {},
  Members = DefaultMembers,
  MembersProps = {},
  Options = DefaultOptions,
  OptionsProps = {},
}) => {
  const router = useRouter()
  const [openConfirmLeaveGroupDialog, setOpenConfirmLeaveGroupDialog] = useState(false)
  const { currentProfile } = useCurrentProfile()
  const [memberToRemoveId, setMemberToRemoveId] = useState<string | null>(null)
  const [commitArchiveRoom, isMutationInFlight] = useArchiveChatRoomMutation()

  const handleSetMemberToRemove = (id: string | null) => {
    setMemberToRemoveId(id)
    if (id) {
      setOpenConfirmLeaveGroupDialog(true)
    }
  }

  const { chatRoom: group } = useLazyLoadQuery<GroupDetailsQueryType>(
    GroupDetailsQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    ChatRoomParticipantsPaginationQuery,
    MembersListFragment$key
  >(MembersListFragment, group)
  const members = data?.participants
  const { isSoleAdmin, isAdmin: currentProfileIsAdmin } = useCheckIsAdmin(members)

  const handleLoadMoreMembers = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10)
    }
  }

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId) {
      commitArchiveRoom({
        variables: {
          input: {
            roomId,
            profileId: currentProfile.id,
            archive: !group?.isArchived,
          },
        },
      })
    }
  }

  useMessagesListSubscription(roomId, currentProfile?.id ?? '')

  return (
    <View style={{ flexGrow: 1, flex: 1 }}>
      <AppBar
        title="Group Details"
        onBack={() => router.back()}
        BackIcon={CloseIcon}
        CloseIcon={EditIcon}
        onClose={() => {
          /* TODO: Implement edit action */
        }}
      />
      {currentProfile?.id && (
        <LeaveGroupDialog
          open={openConfirmLeaveGroupDialog}
          onClose={() => {
            setMemberToRemoveId(null)
            setOpenConfirmLeaveGroupDialog(false)
          }}
          profileId={currentProfile?.id}
          roomId={roomId}
          removingParticipantId={memberToRemoveId ?? currentProfile?.id}
          isSoleAdmin={isSoleAdmin}
          {...LeaveGroupDialogProps}
        />
      )}
      <ScrollView>
        <GroupProfile group={group} {...GroupProfileProps} />
        <Members
          participantsCount={group?.participantsCount}
          members={members}
          loadNext={handleLoadMoreMembers}
          isLoadingNext={isLoadingNext}
          hasNext={hasNext}
          currentProfileIsAdmin={currentProfileIsAdmin}
          groupId={roomId}
          setMemberToRemoveId={handleSetMemberToRemove}
          {...MembersProps}
        />
        <Options
          isArchiveMutationInFlight={isMutationInFlight}
          handleArchiveChat={handleArchiveChat}
          handleLeaveGroup={() => setOpenConfirmLeaveGroupDialog(true)}
          isArchived={!!group?.isArchived}
          {...OptionsProps}
        />
      </ScrollView>
    </View>
  )
}

export default GroupDetailsPage
