import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useNotification } from '@baseapp-frontend/utils'
import { useAppStateSubscription } from '@baseapp-frontend/utils/hooks/useAppStateSubscription'

import { useRouter } from 'expo-router'
import { useFragment, useLazyLoadQuery, useRefetchableFragment } from 'react-relay'

import { ChatRoomFragment$key } from '../../../../../__generated__/ChatRoomFragment.graphql'
import { ChatRoomFragmentRefetchQuery } from '../../../../../__generated__/ChatRoomFragmentRefetchQuery.graphql'
import { ChatRoomQuery as ChatRoomQueryType } from '../../../../../__generated__/ChatRoomQuery.graphql'
import { MembersListFragment$data } from '../../../../../__generated__/MembersListFragment.graphql'
import { RoomTitleFragment$key } from '../../../../../__generated__/RoomTitleFragment.graphql'
import { TitleFragment$key } from '../../../../../__generated__/TitleFragment.graphql'
import {
  ChatRoomQuery,
  TitleFragment,
  useArchiveChatRoomMutation,
  useCheckIsAdmin,
} from '../../../common'
import { ChatRoomFragment } from '../../../common/graphql/fragments/ChatRoom'
import { RoomTitleFragment } from '../../../common/graphql/fragments/RoomTitle'
import { LeaveGroupDialog } from '../../__shared__/LeaveGroupDialog'
import ChatRoomHeader from '../ChatRoomHeader'
import ChatRoomOptions from '../ChatRoomOptions'
import MessagesList from '../MessagesList'
import { ChatRoomPageComponentProps } from './type'

const ChatRoomPageComponent: FC<ChatRoomPageComponentProps> = ({ roomId }) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [openConfirmLeaveGroupDialog, setOpenConfirmLeaveGroupDialog] = useState(false)
  const [commit, isMutationInFlight] = useArchiveChatRoomMutation()
  const { currentProfile } = useCurrentProfile()
  const { sendToast } = useNotification()

  const chatRoomRef = useLazyLoadQuery<ChatRoomQueryType>(
    ChatRoomQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  const [data, refetch] = useRefetchableFragment<
    ChatRoomFragmentRefetchQuery,
    ChatRoomFragment$key
  >(ChatRoomFragment, chatRoomRef.chatRoom)

  useAppStateSubscription(() => {
    refetch({ id: roomId }, { fetchPolicy: 'store-and-network' })
  })

  useEffect(() => {
    if (!data) {
      router.back()
      sendToast('Error loading chat room', {
        type: 'error',
      })
    }
  }, [data, router, sendToast])
  const roomHeader = useFragment(TitleFragment, data as TitleFragment$key)
  const { participants } = useFragment<RoomTitleFragment$key>(RoomTitleFragment, roomHeader)
  const { isSoleAdmin } = useCheckIsAdmin(participants as MembersListFragment$data['participants'])

  if (!data) {
    return null
  }

  const renderTitleComponent = () => <ChatRoomHeader roomHeader={roomHeader} />

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId) {
      commit({
        variables: {
          input: {
            roomId,
            profileId: currentProfile.id,
            archive: !data.isArchived,
          },
        },
      })
    }
  }

  const handleChatDetails = () => {
    if (data.isGroup) {
      router.push(`/group-details/${roomId}`)
      return
    }
    console.log('Not implemented yet.')
  }

  const handleDeleteChat = () => {
    if (data.isGroup) {
      setOpenConfirmLeaveGroupDialog(true)
      return
    }
    console.log('Not implemented yet.')
  }

  const renderRightAction = (
    <>
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
      <ChatRoomOptions
        visible={visible}
        setVisible={setVisible}
        isArchived={!!data?.isArchived}
        isGroup={!!data?.isGroup}
        handleArchiveChat={handleArchiveChat}
        isArchiveMutationInFlight={isMutationInFlight}
        handleChatDetails={handleChatDetails}
        handleGoToProfile={() => console.log('Not implemented.')}
        handleDeleteChat={handleDeleteChat}
      />
    </>
  )

  return (
    <View style={{ flexGrow: 1, flex: 1 }}>
      <AppBar
        titleComponent={renderTitleComponent()}
        onBack={() => router.back()}
        closeComponent={renderRightAction}
      />
      <MessagesList roomRef={data} />
    </View>
  )
}

export default ChatRoomPageComponent
