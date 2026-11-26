import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'
import { FormattedMessage, useIntl } from 'react-intl'
import { TouchableOpacity } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import {
  LEAVE_GROUP_DIALOG_COPY_MESSAGES,
  LEAVE_GROUP_DIALOG_MESSAGES,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS,
  LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS,
  useLeaveGroup,
} from '../../../common'
import { createStyles } from './styles'
import { LeaveGroupDialogProps } from './types'

export const LeaveGroupDialog: FC<LeaveGroupDialogProps> = ({
  open,
  onClose,
  profileId,
  roomId,
  removingParticipantId,
  isSoleAdmin = false,
  participantsCount,
}) => {
  const intl = useIntl()
  const router = useRouter()
  const theme = useTheme()

  const styles = createStyles(theme)

  const handleLeaveGroupSuccess = () => {
    onClose()
    if (profileId === removingParticipantId) {
      router.replace('/messages')
    }
  }

  const { getLeaveGroupDialogTextCopyKeys, onRemoveConfirmed, isMutationInFlight } = useLeaveGroup({
    profileId,
    removingParticipantId,
    roomId,
    isSoleAdmin,
    participantsCount,
    onClose: handleLeaveGroupSuccess,
    removeSuccessMessage: intl.formatMessage(LEAVE_GROUP_DIALOG_MESSAGES.removeSuccess),
  })

  const { action, role } = getLeaveGroupDialogTextCopyKeys()
  const copyMessages =
    action === LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING
      ? LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][role]
      : LEAVE_GROUP_DIALOG_COPY_MESSAGES[action][LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose} style={styles.dialog}>
        <View style={styles.titleContainer}>
          <Dialog.Title style={styles.title}>
            <FormattedMessage {...copyMessages.title} />
          </Dialog.Title>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={theme.colors.object.low} />
          </TouchableOpacity>
        </View>
        <Dialog.Content>
          <Text variant="body1" color="low">
            <FormattedMessage {...copyMessages.content} />
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <View>
            <View style={styles.actionButtons}>
              <Button mode="text" size="medium" onPress={onClose}>
                <Text variant="buttonMedium" color="high">
                  <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
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
                  {profileId === removingParticipantId ? (
                    <FormattedMessage
                      id="messages.shared.leaveGroup"
                      defaultMessage="Leave Group"
                    />
                  ) : (
                    <FormattedMessage
                      id="messages.leaveGroupDialog.removeMember"
                      defaultMessage="Remove Member"
                    />
                  )}
                </Text>
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
