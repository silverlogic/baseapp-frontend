import { FC, useCallback, useMemo, useRef, useState } from 'react'

import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import {
  EditIcon,
  PinIcon,
  ShareIcon,
  TrashIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'

import { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import { CommentsSubscription, useCommentList } from '../../common'
import DefaultCommentItem from '../CommentItem'
import { createStyles } from './styles'
import type { CommentsListProps } from './types'

const CommentsList: FC<CommentsListProps> = ({
  onEdit,
  target: targetRef,
  subscriptionsEnabled,
  CommentItem = DefaultCommentItem,
  CommentItemProps,
}) => {
  const [selectedComment, setSelectedComment] = useState<CommentItem_comment$data | undefined>(
    undefined,
  )

  const theme = useTheme()
  const styles = createStyles()
  const { data: target } = useCommentList(targetRef)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)
  const comments = useMemo(
    () => target?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [target?.comments?.edges],
  )

  const handleLongPress = useCallback((comment: CommentItem_comment$data) => {
    bottomDrawerRef.current?.present()
    setSelectedComment(comment)
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // Sheet is closed
    }
  }, [])

  const handleMenuAction = useCallback(
    (_action: string) => {
      bottomDrawerRef.current?.close()
      if (_action === 'edit') {
        onEdit?.(selectedComment as CommentItem_comment$data)
      }
      setSelectedComment(undefined)
    },
    [selectedComment, onEdit],
  )

  const renderCommentItem = (comment: any) => {
    if (!comment) return null

    return (
      <CommentItem
        target={target}
        key={`comment-${comment.id}`}
        comment={comment}
        onLongPress={handleLongPress}
        {...CommentItemProps}
      />
    )
  }

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <View style={styles.listContainer}>
        {
          // TODO (another story): paginate properly
          comments.map((comment) => renderCommentItem(comment))
        }
        {selectedComment && (
          <BottomDrawer
            bottomDrawerRef={bottomDrawerRef}
            handleSheetChanges={handleSheetChanges}
            snapPoints={['30%']}
          >
            <View style={styles.bottomDrawerActionContainer}>
              <Pressable
                onPress={() => handleMenuAction('share')}
                style={styles.bottomDrawerPressable}
              >
                <ShareIcon width={20} height={20} color={theme.colors.object.high} />
                <Text variant="body2" color="high">
                  Share Comment
                </Text>
              </Pressable>
              {selectedComment.canPin && (
                <Pressable
                  onPress={() => handleMenuAction('pin')}
                  style={styles.bottomDrawerPressable}
                >
                  <PinIcon width={20} height={20} color={theme.colors.object.high} />
                  <Text variant="body2" color="high">
                    Pin Comment
                  </Text>
                </Pressable>
              )}
              {selectedComment.canChange && (
                <Pressable
                  onPress={() => handleMenuAction('edit')}
                  style={styles.bottomDrawerPressable}
                >
                  <EditIcon width={20} height={20} color={theme.colors.object.high} />
                  <Text variant="body2" color="high">
                    Edit Comment
                  </Text>
                </Pressable>
              )}
            </View>
            {selectedComment.canDelete && (
              <View style={styles.bottomDrawerDivider}>
                <Pressable
                  onPress={() => handleMenuAction('delete')}
                  style={styles.bottomDrawerPressable}
                >
                  <TrashIcon width={20} height={20} color={theme.colors.error.main} />
                  <Text variant="body2" style={{ color: theme.colors.error.main }}>
                    Delete Comment
                  </Text>
                </Pressable>
              </View>
            )}
          </BottomDrawer>
        )}
      </View>
    </>
  )
}

export default CommentsList
