import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import { LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS, useLeaveGroup } from '../../../common'
import { createStyles } from './styles'
import { LeaveGroupDialogProps } from './types'

export const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({
  open,
  onClose,
  profileId,
  roomId,
  removingParticipantId,
  isSoleAdmin = false,
}) => {
  const router = useRouter()
  const theme = useTheme()

  const styles = createStyles(theme)

  const handleLeaveGroupSuccess = () => {
    onClose()
    router.replace('/messages')
  }

  const { getLeaveGroupDialogTextCopy, onRemoveConfirmed, isMutationInFlight } = useLeaveGroup({
    profileId,
    removingParticipantId,
    roomId,
    isSoleAdmin,
    onClose: handleLeaveGroupSuccess,
  })

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose} style={styles.dialog}>
        <View style={styles.titleContainer}>
          <Dialog.Title style={styles.title}>
            {getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE)}
          </Dialog.Title>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={theme.colors.object.low} />
          </TouchableOpacity>
        </View>
        <Dialog.Content>
          <View style={styles.confirmationContent}>
            <Text variant="body1" color="low">
              {getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT)}
            </Text>
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.dialogActions}>
          <View>
            <View style={styles.actionButtons}>
              <Button mode="text" color="inherit" onPress={onClose} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button
                color="error"
                textColor="white"
                loading={isMutationInFlight}
                disabled={isMutationInFlight}
                onPress={onRemoveConfirmed}
              >
                Leave Group
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
