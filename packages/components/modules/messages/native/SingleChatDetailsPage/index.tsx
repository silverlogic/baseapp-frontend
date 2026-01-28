import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AppBar } from '@baseapp-frontend/design-system/components/native/appbars'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { ScrollView, View } from '@baseapp-frontend/design-system/components/native/views'

import { useRouter } from 'expo-router'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { ProfileSummaryFragment$key } from '../../../../__generated__/ProfileSummaryFragment.graphql'
import { GroupDetailsQuery, useArchiveChatRoomMutation } from '../../common'
import { ProfileSummaryFragment } from '../../common/graphql/fragments/ProfileSummary'
import About from './About'
import Options from './Options'
import ProfileSummary from './ProfileSummary'
import { SingleChatDetailsPageProps } from './type'

const SingleChatDetailsPage: FC<SingleChatDetailsPageProps> = ({ roomId }) => {
  const router = useRouter()
  const { currentProfile } = useCurrentProfile()

  const [commitArchiveRoom, isMutationInFlight] = useArchiveChatRoomMutation()

  const { chatRoom } = useLazyLoadQuery<GroupDetailsQueryType>(
    GroupDetailsQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )

  const profileSummary = useFragment<ProfileSummaryFragment$key>(ProfileSummaryFragment, chatRoom)

  const otherParticipant = profileSummary?.participants?.edges.find(
    (edge) => edge?.node?.profile?.id && edge?.node?.profile?.id !== currentProfile?.id,
  )

  const handleArchiveChat = () => {
    if (currentProfile?.id && roomId) {
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

  const profile = otherParticipant?.node?.profile

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
