import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import { createStyles } from './styles'
import { RemoveAdminPermissionsDialogProps } from './type'

export const RemoveAdminPermissionsDialog: FC<RemoveAdminPermissionsDialogProps> = ({
  open,
  onClose,
  isMutationInFlight,
  onRemoveConfirmed,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose} style={styles.dialog}>
        <View style={styles.titleContainer}>
          <Dialog.Title style={styles.title}>Remove admin permissions</Dialog.Title>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={theme.colors.object.low} />
          </TouchableOpacity>
        </View>
        <Dialog.Content>
          <Text variant="body1" color="low">
            This user will no longer be a group admin. You can always reassign them as admin later.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <View>
            <View style={styles.actionButtons}>
              <Button mode="text" size="medium" onPress={onClose}>
                <Text variant="buttonMedium" color="high">
                  Cancel
                </Text>
              </Button>
              <Button
                color="error"
                mode="contained"
                loading={isMutationInFlight}
                disabled={isMutationInFlight}
                onPress={onRemoveConfirmed}
                size="medium"
              >
                <Text variant="buttonMedium" color="contrast">
                  Remove permissions
                </Text>
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
