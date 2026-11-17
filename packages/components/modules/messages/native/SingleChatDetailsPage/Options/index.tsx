import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import {
  ArchiveIcon,
  NewGroupIcon,
  ProfileIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage } from 'react-intl'

import { createStyles } from './styles'
import { OptionsProps } from './type'

const Options: FC<OptionsProps> = ({
  handleArchiveChat,
  handleGoToProfile,
  handleAddContactToGroup,
  isArchiveMutationInFlight,
  isArchived,
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
        <Button mode="text" size="medium" onPress={handleGoToProfile}>
          <View style={styles.buttons}>
            <ProfileIcon width={20} height={20} />
            <Text variant="buttonMedium" color="high">
              <FormattedMessage id="messages.chatDetails.seeProfile" defaultMessage="See profile" />
            </Text>
          </View>
        </Button>
        <Button mode="text" size="medium" onPress={handleAddContactToGroup}>
          <View style={styles.buttons}>
            <NewGroupIcon />
            <Text variant="buttonMedium" color="high">
              <FormattedMessage
                id="messages.addContactToGroup.title"
                defaultMessage="Add contact to a group"
              />
            </Text>
          </View>
        </Button>
        <Button
          mode="text"
          size="medium"
          onPress={handleArchiveChat}
          disabled={isArchiveMutationInFlight}
        >
          <View style={styles.buttons}>
            <ArchiveIcon />
            <Text variant="buttonMedium" color="high">
              {isArchived ? (
                <FormattedMessage id="messages.chatDetails.unarchive" defaultMessage="Unarchive" />
              ) : (
                <FormattedMessage id="messages.chatDetails.archive" defaultMessage="Archive" />
              )}
            </Text>
          </View>
        </Button>
      </View>
    </View>
  )
}

export default Options
