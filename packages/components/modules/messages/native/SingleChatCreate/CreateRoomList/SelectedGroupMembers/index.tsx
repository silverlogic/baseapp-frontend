import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable, ScrollView, View } from 'react-native'

import { ProfileItemFragment$data } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import { formatHandle } from '../../../../../__shared__/common'
import { useGroupChatCreate } from '../../../../common/context/GroupChatProvider'
import { createStyles } from './styles'

const SelectedGroupMembers = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const groups = useGroupChatCreate()
  const { participants } = groups

  const getParticipantName = (participant: ProfileItemFragment$data) => {
    if (participant?.name?.trim().length !== 0) return participant.name
    if (participant?.urlPath?.path) return formatHandle(participant.urlPath.path)
    return ''
  }

  return (
    <View>
      {(participants || []).length > 0 && (
        <View style={styles.titleContainer}>
          <Text variant="subtitle2" color="high">
            Members{' '}
            <Text variant="body2" color="low">
              {participants?.length}
            </Text>
          </Text>
        </View>
      )}
      {(participants || []).length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={{ marginHorizontal: -16 }}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        >
          {participants?.map((participant) => (
            <Pressable key={participant.id}>
              <View style={{ padding: 6 }}>
                <View style={styles.avatarCloseButtonContainer}>
                  <IconButton
                    onPress={() =>
                      groups.setParticipants(participants.filter((p) => p.id !== participant.id))
                    }
                  >
                    <CloseIcon width={16} height={16} color={theme.colors.surface.background} />
                  </IconButton>
                </View>
                <AvatarWithPlaceholder imgSource={participant?.image?.url} size={60} />
              </View>
              <View style={{ maxWidth: 72, alignItems: 'center' }}>
                <Text variant="caption" numberOfLines={1}>
                  {getParticipantName(participant)}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
      <View style={styles.titleContainer}>
        <Text variant="subtitle2" color="high">
          Connections
        </Text>
      </View>
    </View>
  )
}

export default SelectedGroupMembers
