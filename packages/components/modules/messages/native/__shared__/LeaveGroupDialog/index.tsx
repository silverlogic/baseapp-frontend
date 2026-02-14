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
          <Text variant="body1" color="low">
            {getLeaveGroupDialogTextCopy(LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT)}
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
                  {profileId === removingParticipantId ? 'Leave Group' : 'Remove Member'}
                </Text>
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
