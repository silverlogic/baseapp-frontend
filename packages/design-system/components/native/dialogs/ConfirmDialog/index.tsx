import { FC } from 'react'

import { TouchableOpacity } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { Button } from '../../buttons'
import { CloseIcon } from '../../icons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { createStyles } from './styles'
import { ConfirmDialogProps } from './types'

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  visible,
  onClose,
  title,
  content,
  cancelText = 'Cancel',
  action,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={onClose}>
        <View style={styles.titleContainer}>
          <Dialog.Title style={styles.title}>{title}</Dialog.Title>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={theme.colors.object.low} width={18} height={18} />
          </TouchableOpacity>
        </View>
        {content && (
          <Dialog.Content>
            {typeof content === 'string' ? (
              <Text variant="body1" color="low">
                {content}
              </Text>
            ) : (
              content
            )}
          </Dialog.Content>
        )}
        <Dialog.Actions style={styles.dialogActions}>
          <View style={styles.actionButtons}>
            <Button mode="outlined" size="medium" onPress={onClose}>
              <Text variant="buttonMedium" color="high">
                {cancelText}
              </Text>
            </Button>
            {action}
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ConfirmDialog
