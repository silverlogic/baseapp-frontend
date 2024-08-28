import { FC, useState } from 'react'

import {
  ConfirmDialog,
  SwipeableDrawer as DefaultSwipeableDrawer,
  IconButton,
  TrashCanIcon,
} from '@baseapp-frontend/design-system'

import { LoadingButton } from '@mui/lab'
import { Box, Divider, Typography } from '@mui/material'

import { useCommentReply } from '../../context/comments'
import useCommentDeleteMutation from '../../graphql/mutations/CommentDelete'
import { Container, IconButtonContentContainer } from './styled'
import { CommentOptionsProps } from './types'

const CommentOptions: FC<CommentOptionsProps> = ({
  comment,
  longPressHandler: { isLongPressingComment, shouldOpenCommentOptions },
  onLongPressLeave,
  isHoveringComment,
  onDelete,
  enableDelete,
  options,
  SwipeableDrawerProps,
  SwipeableDrawer = DefaultSwipeableDrawer,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { resetCommentReply } = useCommentReply()

  const [deleteComment, isDeletingComment] = useCommentDeleteMutation()
  const handleDeleteComment = () => {
    deleteComment({ variables: { id: comment.id } })
    onLongPressLeave()
    resetCommentReply()
    onDelete?.()
  }

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true)
  }

  const deviceHasHover = window.matchMedia('(hover: hover)').matches

  const isCommentDeletionAllowed = enableDelete && comment.canDelete

  const renderDeleteDialog = () => (
    <ConfirmDialog
      title="Delete Comment?"
      content="Are you sure you want to delete this comment? This action cannot be undone."
      action={
        <LoadingButton
          color="error"
          onClick={handleDeleteComment}
          disabled={isDeletingComment}
          loading={isDeletingComment}
        >
          Delete
        </LoadingButton>
      }
      onClose={() => setIsDeleteDialogOpen(false)}
      open={isDeleteDialogOpen}
    />
  )

  if (!deviceHasHover) {
    const handleDrawerClose = () => {
      if (!isLongPressingComment) {
        onLongPressLeave()
      }
    }

    return (
      <>
        {renderDeleteDialog()}
        <SwipeableDrawer
          open={shouldOpenCommentOptions && isLongPressingComment}
          onClose={handleDrawerClose}
          aria-label="comment options"
          {...SwipeableDrawerProps}
        >
          <div className="grid grid-cols-[1fr] justify-start gap-2">
            {options?.map(({ label, icon, onClick, disabled, hasPermission }) => {
              if (!hasPermission) return null

              return (
                <IconButton
                  key={label}
                  onClick={onClick}
                  disabled={disabled}
                  sx={{ width: 'fit-content' }}
                >
                  <IconButtonContentContainer>
                    <Box display="grid" justifySelf="center" height="min-content">
                      {icon}
                    </Box>
                    <Typography variant="body2">{label}</Typography>
                  </IconButtonContentContainer>
                </IconButton>
              )
            })}
            {isCommentDeletionAllowed && (
              <>
                <Divider />
                <IconButton
                  onClick={handleDeleteDialogOpen}
                  disabled={isDeletingComment}
                  sx={{ width: 'fit-content' }}
                >
                  <IconButtonContentContainer>
                    <Box display="grid" justifySelf="center" height="min-content">
                      <TrashCanIcon />
                    </Box>
                    <Typography variant="body2" color="error.main">
                      Delete Comment
                    </Typography>
                  </IconButtonContentContainer>
                </IconButton>
              </>
            )}
          </div>
        </SwipeableDrawer>
      </>
    )
  }

  if (deviceHasHover && isHoveringComment) {
    return (
      <>
        {renderDeleteDialog()}
        <Container aria-label="comment options">
          {isCommentDeletionAllowed && (
            <IconButton
              onClick={handleDeleteDialogOpen}
              disabled={isDeletingComment}
              aria-label="delete comment"
            >
              <TrashCanIcon />
            </IconButton>
          )}
          {options?.map(({ label, icon, onClick, disabled, hasPermission }) => {
            if (!hasPermission) return null

            return (
              <IconButton key={label} onClick={onClick} disabled={disabled} aria-label={label}>
                {icon}
              </IconButton>
            )
          })}
        </Container>
      </>
    )
  }

  return renderDeleteDialog()
}

export default CommentOptions
