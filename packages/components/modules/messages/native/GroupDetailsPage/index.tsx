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
import { LeaveGroupDialog } from '../__shared__/LeaveGroupDialog'
import GroupProfile from './GroupProfile'
import Members from './Members'
import Options from './Options'
import { GroupDetailsPageProps } from './type'

const GroupDetailsPage: FC<GroupDetailsPageProps> = ({ roomId }) => {
  const router = useRouter()
  const [openConfirmLeaveGroupDialog, setOpenConfirmLeaveGroupDialog] = useState(false)
  const { currentProfile } = useCurrentProfile()
  const [commitMarkAsRead, isMutationInFlight] = useArchiveChatRoomMutation()

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
      commitMarkAsRead({
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
          onClose={() => setOpenConfirmLeaveGroupDialog(false)}
          profileId={currentProfile?.id}
          roomId={roomId}
          removingParticipantId={currentProfile?.id}
          isSoleAdmin={isSoleAdmin}
        />
      )}
      <ScrollView>
        <GroupProfile group={group} />
        <Members
          participantsCount={group?.participantsCount}
          members={members}
          loadNext={handleLoadMoreMembers}
          isLoadingNext={isLoadingNext}
          hasNext={hasNext}
          currentProfileIsAdmin={currentProfileIsAdmin}
          groupId={roomId}
        />
        <Options
          isArchiveMutationInFlight={isMutationInFlight}
          handleArchiveChat={handleArchiveChat}
          handleLeaveGroup={() => setOpenConfirmLeaveGroupDialog(true)}
          isArchived={!!group?.isArchived}
        />
      </ScrollView>
    </View>
  )
}

export default GroupDetailsPage
