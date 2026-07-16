import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import { useCommentDeleteMutation } from '../../common'
import { createStyles } from './styles'
import { ICommentDeleteDialogProps } from './types'

const CommentDeleteDialog: React.FC<ICommentDeleteDialogProps> = ({
  visible,
  onClose,
  commentId,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [deleteComment, isDeletingComment] = useCommentDeleteMutation()

  const handleDeleteComment = () => {
    deleteComment({
      variables: { id: commentId },
      // Errors are toasted by the mutation hook; keep the dialog open so the user can retry.
      onCompleted: (_response, errors) => {
        if (!errors) onClose()
      },
    })
  }

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={onClose}>
        <View style={styles.titleContainer}>
          <Dialog.Title style={styles.title}>Delete Comment?</Dialog.Title>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={theme.colors.object.low} width={18} height={18} />
          </TouchableOpacity>
        </View>

        <Dialog.Content>
          <Text variant="body1" color="low">
            Are you sure you want to delete this comment? This action cannot be undone.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <View>
            <View style={styles.actionButtons}>
              <Button mode="outlined" size="medium" onPress={onClose}>
                <Text variant="buttonMedium" color="high">
                  Cancel
                </Text>
              </Button>
              <Button
                color="error"
                mode="contained"
                loading={isDeletingComment}
                disabled={isDeletingComment}
                onPress={handleDeleteComment}
                size="medium"
              >
                <Text variant="buttonMedium" color="contrast">
                  Delete
                </Text>
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default CommentDeleteDialog
