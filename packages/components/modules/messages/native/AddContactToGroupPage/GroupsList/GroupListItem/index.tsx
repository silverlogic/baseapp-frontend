import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useFragment } from 'react-relay'

import { getParticipantCountString } from '../../../../common'
import { AddContactToGroupItemFragment } from '../../../../common/graphql/fragments/AddContactToGroupItem'
import { createStyles } from './styles'
import { GroupListItemProps } from './types'

const GroupListItem: FC<GroupListItemProps> = ({ roomRef, selected, onToggle }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const node = useFragment(AddContactToGroupItemFragment, roomRef)

  const isAlreadyMember = !!node.isParticipant
  const isChecked = isAlreadyMember || selected

  const handlePress = () => {
    if (!isAlreadyMember) onToggle(node.id)
  }

  return (
    <Pressable onPress={handlePress} disabled={isAlreadyMember}>
      <View style={styles.cardContainer}>
        <View>
          <AvatarWithPlaceholder imgSource={node.image?.url} />
        </View>
        <View style={styles.textContainer}>
          <Text variant="subtitle2" numberOfLines={1}>
            {node.title}
          </Text>
          <View style={styles.subtitleRow}>
            <Text variant="caption" color="low">
              {getParticipantCountString(node.participantsCount)}
            </Text>
            {isAlreadyMember && (
              <Text variant="caption" color="disabled">
                {' • Already added'}
              </Text>
            )}
          </View>
        </View>
        <Checkbox.Android
          disabled={isAlreadyMember}
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handlePress}
          color={theme.colors.primary.main}
        />
      </View>
    </Pressable>
  )
}

export default GroupListItem
