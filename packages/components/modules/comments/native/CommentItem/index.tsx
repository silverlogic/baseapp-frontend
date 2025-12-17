import { FC, useCallback, useRef } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
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

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'
import { useRefetchableFragment } from 'react-relay'

import { CommentItemRefetchQuery } from '../../../../__generated__/CommentItemRefetchQuery.graphql'
import { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import { Timestamp as DefaultTimestamp } from '../../../__shared__/native'
import { CommentItemFragmentQuery } from '../../common'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import { createStyles } from './styles'
import { CommentItemProps } from './types'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  onEdit,
  Timestamp = DefaultTimestamp,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const [comment] = useRefetchableFragment<CommentItemRefetchQuery, CommentItem_comment$key>(
    CommentItemFragmentQuery,
    commentRef,
  )

  const theme = useTheme()
  const styles = createStyles()
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const replyToComment = () => {
    // TODO (in another story)
    console.log('Reply button clicked')
  }

  const handleLongPress = useCallback(() => {
    bottomDrawerRef.current?.present()
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
        onEdit?.(comment)
      }
    },
    [comment, onEdit],
  )

  if (!comment) {
    return null
  }

  return (
    <>
      <Pressable onLongPress={handleLongPress}>
        <View style={styles.rootContainer}>
          <View style={styles.avatarContainer}>
            <AvatarWithPlaceholder imgSource={comment.user?.avatar?.url} />
          </View>
          <View style={styles.bodyContainer}>
            <Text variant="subtitle2" color="high">
              {comment.user?.fullName}
            </Text>
            <Text variant="body2" color="high">
              {comment.body}
              {comment.isEdited ? (
                <Text variant="body2" color="disabled" style={{ fontSize: 12 }}>
                  {' '}
                  (edited)
                </Text>
              ) : (
                ''
              )}
            </Text>
            <View style={styles.footerContainer}>
              <View style={styles.buttonContainer}>
                <CommentReactionButton target={comment} shouldUseBottomSheetSafeComponents />
                <CommentReplyButton
                  onReply={replyToComment}
                  commentId={comment.id}
                  shouldUseBottomSheetSafeComponents
                />
              </View>
              <View style={styles.timestampContainer}>
                <Timestamp date={comment.created} />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
      <BottomDrawer
        bottomDrawerRef={bottomDrawerRef}
        handleSheetChanges={handleSheetChanges}
        snapPoints={['30%']}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 4,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.surface.disabled,
          }}
        >
          <Pressable
            onPress={() => handleMenuAction('share')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 8,
              padding: 8,
            }}
          >
            <ShareIcon width={20} height={20} color={theme.colors.object.high} />
            <Text variant="body2" color="high">
              Share Comment
            </Text>
          </Pressable>
          {comment.canPin && (
            <Pressable
              onPress={() => handleMenuAction('pin')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 8,
                padding: 8,
              }}
            >
              <PinIcon width={20} height={20} color={theme.colors.object.high} />
              <Text variant="body2" color="high">
                Pin Comment
              </Text>
            </Pressable>
          )}
          {comment.canChange && (
            <Pressable
              onPress={() => handleMenuAction('edit')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 8,
                padding: 8,
              }}
            >
              <EditIcon width={20} height={20} color={theme.colors.object.high} />
              <Text variant="body2" color="high">
                Edit Comment
              </Text>
            </Pressable>
          )}
        </View>
        {comment.canDelete && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 4,
              borderBottomWidth: 0,
            }}
          >
            <Pressable
              onPress={() => handleMenuAction('delete')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 8,
                padding: 8,
              }}
            >
              <TrashIcon width={20} height={20} color={theme.colors.error.main} />
              <Text variant="body2" style={{ color: theme.colors.error.main }}>
                Delete Comment
              </Text>
            </Pressable>
          </View>
        )}
      </BottomDrawer>
    </>
  )
}

export default CommentItem
