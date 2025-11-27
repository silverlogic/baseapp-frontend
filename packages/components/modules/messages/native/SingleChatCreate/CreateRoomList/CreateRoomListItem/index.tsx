import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { ConnectionHandler, useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import { formatHandle } from '../../../../../__shared__/common'
import { ProfileItemFragment } from '../../../../../profiles/common'
import { useCreateChatRoomMutation } from '../../../../common'
import { createStyles } from './styles'

const ChatRoomListItem = ({ profile: profileRef }: { profile: ProfileItemFragment$key }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const node = useFragment(ProfileItemFragment, profileRef)
  const [commit] = useCreateChatRoomMutation()

  const { currentProfile } = useCurrentProfile()

  const handleRoomCompleted = (roomRef: string) => {
    router.replace('/messages') // ensures RoomsList is behind
    router.push(`/rooms/${roomRef}`)
  }

  const handleRoomCreation = () => {
    if (currentProfile?.id) {
      commit({
        variables: {
          input: { profileId: currentProfile.id, participants: [node?.id] },
          connections: [
            ConnectionHandler.getConnectionID(currentProfile.id, 'roomsList_chatRooms', {
              unreadMessages: false,
              archived: false,
              q: '',
            }),
          ],
        },
        onCompleted: (response) => {
          const roomId = response?.chatRoomCreate?.room?.node?.id
          if (roomId) {
            handleRoomCompleted(roomId)
          }
        },
      })
    }
  }

  return (
    <Pressable key={`chat-room-item-${node?.id}`} onPress={handleRoomCreation}>
      <View style={styles.cardContainer}>
        <View>
          <AvatarWithPlaceholder imgSource={node?.image?.url} />
        </View>
        <View>
          <Text variant="subtitle2">{node?.name}</Text>
          {node?.urlPath?.path && (
            <Text variant="caption">{formatHandle(node?.urlPath?.path)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default ChatRoomListItem
