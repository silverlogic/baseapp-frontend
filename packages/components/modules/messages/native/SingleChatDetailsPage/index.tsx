import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { ScrollView, View } from '@baseapp-frontend/design-system/components/native/views'

import { useRouter } from 'expo-router'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../../__generated__/ChatRoomQuery.graphql'
import { SingleChatDetailsFragment$key } from '../../../../__generated__/SingleChatDetailsFragment.graphql'
import { ChatRoomQuery, useArchiveChatRoomMutation } from '../../common'
import { SingleChatDetailsFragment } from '../../common/graphql/fragments/SingleChatDetailsFragment'
import About from './About'
import Options from './Options'
import ProfileSummary from './ProfileSummary'
import { SingleChatDetailsPageProps } from './type'

const SingleChatDetailsPage: FC<SingleChatDetailsPageProps> = ({ roomId }) => {
  const router = useRouter()
  const { currentProfile } = useCurrentProfile()

  const [commitArchiveRoom, isMutationInFlight] = useArchiveChatRoomMutation()

  const { chatRoom } = useLazyLoadQuery<ChatRoomQueryType>(
    ChatRoomQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  const chatDetails = useFragment<SingleChatDetailsFragment$key>(
    SingleChatDetailsFragment,
    chatRoom,
  )

  const otherParticipant = chatDetails?.otherParticipant

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId && chatRoom) {
      commitArchiveRoom({
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

  const profile = otherParticipant?.profile

  return (
    <View style={{ flexGrow: 1, flex: 1 }}>
      <AppBar title="Chat Details" onBack={() => router.back()} BackIcon={CloseIcon} />
      <ScrollView>
        <ProfileSummary
          name={profile?.name}
          avatar={profile?.image?.url}
          username={profile?.urlPath?.path}
        />
        <Options
          isArchiveMutationInFlight={isMutationInFlight}
          handleArchiveChat={handleArchiveChat}
          isArchived={!!chatRoom?.isArchived}
        />
        <About biography={profile?.biography} />
      </ScrollView>
    </View>
  )
}

export default SingleChatDetailsPage
