import { FC, createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { CommentItem_comment$data } from '../../../../../__generated__/CommentItem_comment.graphql'
import {
  CommentAction,
  toCommentEditTarget,
  useCommentActions,
  useCommentReply,
} from '../../../common'
import CommentActionSheet from '../../CommentActionSheet'
import CommentDeleteDialog from '../../CommentDeleteDialog'
import { CommentActionsContextValue, CommentActionsProviderProps } from './types'

const CommentActionsContext = createContext<CommentActionsContextValue | undefined>(undefined)

export const useCommentActionsContext = (): CommentActionsContextValue => {
  const context = useContext(CommentActionsContext)

  if (!context) {
    throw new Error('Missing CommentActionsProvider')
  }

  return context
}

/**
 * Hosts the long-press action sheet and the delete dialog for the whole thread, so comment
 * items just call `openCommentActions(comment)` instead of prop-drilling handlers. The
 * actions themselves come from the shared `useCommentActions` descriptors; this provider
 * only decides native presentation and selection state.
 */
const CommentActionsProvider: FC<CommentActionsProviderProps> = ({ children, onPinToggled }) => {
  const [selectedComment, setSelectedComment] = useState<CommentItem_comment$data | undefined>(
    undefined,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)
  const { inReplyToId, editingComment, resetCommentReply, resetCommentEdit, setCommentEdit } =
    useCommentReply()

  const openCommentActions = useCallback((comment: CommentItem_comment$data) => {
    bottomDrawerRef.current?.present()
    setSelectedComment(comment)
  }, [])

  const closeCommentActions = useCallback(() => {
    bottomDrawerRef.current?.close()
  }, [])

  const contextValue = useMemo(
    () => ({ openCommentActions, closeCommentActions }),
    [openCommentActions, closeCommentActions],
  )

  const actions = useCommentActions({
    comment: selectedComment,
    onEdit: () => {
      if (selectedComment) {
        setCommentEdit(toCommentEditTarget(selectedComment))
      }
    },
    onDelete: () => setIsDeleting(true),
    onPinToggled,
    enableShare: true,
    shareDisabled: false,
  })

  const handleActionPress = useCallback((action: CommentAction) => {
    if (action.closeOnSelect) {
      bottomDrawerRef.current?.close()
    }
    action.onSelect()
    if (action.id === 'edit' || action.id === 'pin') {
      setSelectedComment(undefined)
    }
  }, [])

  const closeDeleteDialog = useCallback(() => {
    setIsDeleting(false)
    setSelectedComment(undefined)
  }, [])

  // Deleting the comment currently targeted by the composer must also clear that mode.
  const handleDeleted = useCallback(() => {
    if (selectedComment?.id && inReplyToId === selectedComment.id) {
      resetCommentReply()
    }
    if (selectedComment?.id && editingComment?.id === selectedComment.id) {
      resetCommentEdit()
    }
  }, [selectedComment?.id, inReplyToId, editingComment?.id, resetCommentReply, resetCommentEdit])

  return (
    <CommentActionsContext.Provider value={contextValue}>
      {children}
      {/* Always mounted (closed): gorhom's BottomSheetModal only opens via present() on a
          mounted ref, so gating the sheet on selectedComment would make the FIRST long-press
          a no-op — present() would run before the modal exists. */}
      <CommentActionSheet
        actions={actions}
        bottomDrawerRef={bottomDrawerRef}
        onActionPress={handleActionPress}
      />
      {selectedComment?.id && (
        <CommentDeleteDialog
          visible={isDeleting}
          onClose={closeDeleteDialog}
          onDeleted={handleDeleted}
          commentId={selectedComment.id}
        />
      )}
    </CommentActionsContext.Provider>
  )
}

export default CommentActionsProvider
