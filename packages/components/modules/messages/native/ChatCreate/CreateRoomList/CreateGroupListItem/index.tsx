import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import { formatHandle } from '../../../../../__shared__/common'
import { ProfileItemFragment } from '../../../../../profiles/common'
import { useGroupChatCreate } from '../../../../common/context/GroupChatProvider'
import { createStyles } from './styles'

const CreateGroupListItem = ({ profile: profileRef }: { profile: ProfileItemFragment$key }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const groups = useGroupChatCreate()
  const { participants } = groups

  const node = useFragment(ProfileItemFragment, profileRef)

  const onMemberPress = () => {
    if (participants?.some((participant) => participant.id === node.id)) {
      groups.setParticipants(participants.filter((participant) => participant.id !== node.id))
    } else {
      groups.setParticipants([...(participants || []), node])
    }
  }

  const isSelected = () => {
    const { existingParticipants } = groups
    const currentParticipants = groups.participants?.map((participant) => participant.id) || []
    const allParticipants = [...(existingParticipants || []), ...currentParticipants]
    return allParticipants.some((participant) => participant === node.id)
  }

  return (
    <Pressable>
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
        <View style={styles.spacer} />
        <Checkbox.Android
          disabled={groups.existingParticipants?.some((participant) => participant === node.id)}
          status={isSelected() ? 'checked' : 'unchecked'}
          onPress={onMemberPress}
          color={theme.colors.primary.main}
        />
      </View>
    </Pressable>
  )
}

export default CreateGroupListItem
