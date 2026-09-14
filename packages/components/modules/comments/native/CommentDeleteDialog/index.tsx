import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/native/dialogs'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'

import { useCommentDeleteMutation } from '../../common'
import { ICommentDeleteDialogProps } from './types'

const CommentDeleteDialog: React.FC<ICommentDeleteDialogProps> = ({
  visible,
  onClose,
  onDeleted,
  commentId,
}) => {
  const [deleteComment, isDeletingComment] = useCommentDeleteMutation()

  const handleDeleteComment = () => {
    deleteComment({
      variables: { id: commentId },
      // Errors are toasted by the mutation hook; keep the dialog open so the user can retry.
      onCompleted: (_response, errors) => {
        if (!errors) {
          onDeleted?.()
          onClose()
        }
      },
    })
  }

  return (
    <ConfirmDialog
      visible={visible}
      onClose={onClose}
      title="Delete Comment?"
      content="Are you sure you want to delete this comment? This action cannot be undone."
      action={
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
      }
    />
  )
}

export default CommentDeleteDialog
