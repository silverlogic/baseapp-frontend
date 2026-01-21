import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { ArchiveIcon, LeaveIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { OptionsProps } from './type'

const Options: FC<OptionsProps> = ({
  handleArchiveChat,
  handleLeaveGroup,
  isArchiveMutationInFlight,
  isArchived,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.OptionsContainer}>
      <View style={styles.OptionsTextContainer}>
        <Text variant="subtitle2" color="high">
          Options
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="text"
          size="medium"
          onPress={handleArchiveChat}
          disabled={isArchiveMutationInFlight}
        >
          <View style={styles.buttons}>
            <ArchiveIcon />
            <Text variant="buttonMedium" color="high">
              {isArchived ? 'Unarchive' : 'Archive'} Group
            </Text>
          </View>
        </Button>
        <Button mode="text" size="medium" onPress={handleLeaveGroup}>
          <View style={styles.buttons}>
            <LeaveIcon color={theme.colors.error.main} />
            <Text variant="buttonMedium" style={styles.leaveGroupButton}>
              Leave Group
            </Text>
          </View>
        </Button>
      </View>
      {/* TODO: Implement Options List here */}
    </View>
  )
}

export default Options
