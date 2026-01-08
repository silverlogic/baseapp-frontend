import { FC, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { CloseIcon, EditIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { useRouter } from 'expo-router'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../../__generated__/ChatRoomQuery.graphql'
import { MembersListFragment$data } from '../../../../__generated__/MembersListFragment.graphql'
import { RoomTitleFragment$key } from '../../../../__generated__/RoomTitleFragment.graphql'
import { TitleFragment$key } from '../../../../__generated__/TitleFragment.graphql'
import {
  ChatRoomQuery,
  TitleFragment,
  useArchiveChatRoomMutation,
  useCheckIsAdmin,
} from '../../common'
import { RoomTitleFragment } from '../../common/graphql/fragments/RoomTitle'
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

  const chatRoomRef = useLazyLoadQuery<ChatRoomQueryType>(
    ChatRoomQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  const { chatRoom } = chatRoomRef

  const roomHeader = useFragment(TitleFragment, chatRoom as TitleFragment$key)
  const { participants } = useFragment<RoomTitleFragment$key>(RoomTitleFragment, roomHeader)
  const { isSoleAdmin } = useCheckIsAdmin(participants as MembersListFragment$data['participants'])

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId) {
      commitMarkAsRead({
        variables: {
          input: {
            roomId,
            profileId: currentProfile.id,
            archive: !chatRoom?.isArchived,
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
      <GroupProfile roomHeader={roomHeader} participantsCount={chatRoom?.participantsCount} />
      <Members participantsCount={chatRoom?.participantsCount} />
      <Options
        isArchiveMutationInFlight={isMutationInFlight}
        handleArchiveChat={handleArchiveChat}
        handleLeaveGroup={() => setOpenConfirmLeaveGroupDialog(true)}
        isArchived={!!chatRoom?.isArchived}
      />
    </View>
  )
}

export default GroupDetailsPage
