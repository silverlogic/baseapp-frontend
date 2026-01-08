import { FC } from 'react'

import { FabButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { MembersProps } from './type'

const Members: FC<MembersProps> = ({ participantsCount }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.membersContainer}>
      <View style={styles.membersTextContainer}>
        <Text variant="subtitle2" color="high">
          Members
        </Text>
        <Text variant="body2" color="low">
          {participantsCount}
        </Text>
      </View>
      <View style={styles.addMemberContainer}>
        <FabButton
          onPress={() => console.log('not implemented yet')}
          iconName="add"
          iconSize={28}
          iconColor={theme.colors.primary.contrast}
          style={styles.addMemberButton}
        />
        <Text variant="subtitle2" color="high">
          Add Member
        </Text>
      </View>
      {/* TODO: Implement Members List here */}
    </View>
  )
}

export default Members
