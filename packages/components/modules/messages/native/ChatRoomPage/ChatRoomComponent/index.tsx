import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useNotification } from '@baseapp-frontend/utils'
import { useAppStateSubscription } from '@baseapp-frontend/utils/hooks/useAppStateSubscription'

import { useRouter } from 'expo-router'
import { useLazyLoadQuery, useRefetchableFragment } from 'react-relay'

import { ChatRoomFragment$key } from '../../../../../__generated__/ChatRoomFragment.graphql'
import { ChatRoomFragmentRefetchQuery } from '../../../../../__generated__/ChatRoomFragmentRefetchQuery.graphql'
import { ChatRoomQuery as ChatRoomQueryType } from '../../../../../__generated__/ChatRoomQuery.graphql'
import { ChatRoomQuery, useArchiveChatRoomMutation } from '../../../common'
import { ChatRoomFragment } from '../../../common/graphql/fragments/ChatRoom'
import ChatRoomHeader from '../ChatRoomHeader'
import ChatRoomOptions from '../ChatRoomOptions'
import MessagesList from '../MessagesList'
import { ChatRoomPageComponentProps } from './type'

const ChatRoomPageComponent: FC<ChatRoomPageComponentProps> = ({ roomId }) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
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

  if (!data) {
    return null
  }

  const renderTitleComponent = () => <ChatRoomHeader roomRef={data} />

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

  const renderRightAction = (
    <ChatRoomOptions
      visible={visible}
      setVisible={setVisible}
      isArchived={!!data?.isArchived}
      handleArchiveChat={handleArchiveChat}
      isArchiveMutationInFlight={isMutationInFlight}
      handleChatDetails={() => console.log('Not implemented.')}
      handleGoToProfile={() => console.log('Not implemented.')}
      handleDeleteChat={() => console.log('Not implemented.')}
    />
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
