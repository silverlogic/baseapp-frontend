import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import {
  ArchiveIcon as DefaultArchiveIcon,
  LeaveIcon as DefaultLeaveIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage } from 'react-intl'

import { createStyles } from './styles'
import { OptionsProps } from './type'

const Options: FC<OptionsProps> = ({
  handleArchiveChat,
  handleLeaveGroup,
  isArchiveMutationInFlight,
  isArchived,
  ArchiveIcon = DefaultArchiveIcon,
  ArchiveIconProps = {},
  LeaveIcon = DefaultLeaveIcon,
  LeaveIconProps = {},
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.OptionsContainer}>
      <View style={styles.OptionsTextContainer}>
        <Text variant="subtitle2" color="high">
          <FormattedMessage id="messages.chatDetails.optionsTitle" defaultMessage="Options" />
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
            <ArchiveIcon {...ArchiveIconProps} />
            <Text variant="buttonMedium" color="high">
              {isArchived ? (
                <FormattedMessage
                  id="messages.chatRoomOptions.unarchiveGroup"
                  defaultMessage="Unarchive Group"
                />
              ) : (
                <FormattedMessage
                  id="messages.chatRoomOptions.archiveGroup"
                  defaultMessage="Archive Group"
                />
              )}
            </Text>
          </View>
        </Button>
        <Button mode="text" size="medium" onPress={handleLeaveGroup}>
          <View style={styles.buttons}>
            <LeaveIcon color={theme.colors.error.main} {...LeaveIconProps} />
            <Text variant="buttonMedium" style={styles.leaveGroupButton}>
              <FormattedMessage id="messages.shared.leaveGroup" defaultMessage="Leave Group" />
            </Text>
          </View>
        </Button>
      </View>
    </View>
  )
}

export default Options
