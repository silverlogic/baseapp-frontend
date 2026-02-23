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

import { createStyles } from './styles'
import { OptionsProps } from './type'

const Options: FC<OptionsProps> = ({
  handleArchiveChat,
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
          onPress={() => {
            // TODO: Implement see profile for single chat
          }}
        >
          <View style={styles.buttons}>
            <ProfileIcon width={20} height={20} />
            <Text variant="buttonMedium" color="high">
              See profile
            </Text>
          </View>
        </Button>
        <Button
          mode="text"
          size="medium"
          onPress={() => {
            // TODO: Implement add contact to group
          }}
        >
          <View style={styles.buttons}>
            <NewGroupIcon />
            <Text variant="buttonMedium" color="high">
              Add contact to a group
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
              {isArchived ? 'Unarchive' : 'Archive'}
            </Text>
          </View>
        </Button>
      </View>
    </View>
  )
}

export default Options
