import { FC, lazy, useCallback, useEffect, useRef, useState } from 'react'

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
import { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'
import { Timestamp as DefaultTimestamp } from '../../../__shared__/native'
import { CommentItemFragmentQuery } from '../../common'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import CommentShowRepliesButton from './CommentShowRepliesButton'
import { createStyles } from './styles'
import { CommentItemProps } from './types'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  onEdit,
  onReply,
  commentIdToExpand,
  threadDepth = 0,
  CommentsListProps = {},
  Timestamp = DefaultTimestamp,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false)
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [comment, refetch] = useRefetchableFragment<
    CommentItemRefetchQuery,
    CommentItem_comment$key
  >(CommentItemFragmentQuery, commentRef)

  const theme = useTheme()
  const styles = createStyles(theme)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const hasReplies = (comment.commentsCount?.total ?? 0) > 0

  const showReplies = useCallback(() => {
    if (isRepliesExpanded) {
      setIsRepliesExpanded(false)
      return
    }

    setIsLoadingReplies(true)
    refetch(
      { isRepliesExpanded: true },
      {
        fetchPolicy: 'store-or-network',
        onComplete: (error) => {
          setIsLoadingReplies(false)
          if (error) {
            // eslint-disable-next-line no-console
            console.error('Error loading replies:', error)
          } else {
            setIsRepliesExpanded(true)
          }
        },
      },
    )
  }, [isRepliesExpanded, refetch])

  const replyToComment = () => {
    onReply?.(comment)
  }

  useEffect(() => {
    if (commentIdToExpand === comment.id && !isRepliesExpanded && hasReplies) {
      setIsLoadingReplies(true)
      refetch(
        { isRepliesExpanded: true },
        {
          fetchPolicy: 'network-only',
          onComplete: (error) => {
            setIsLoadingReplies(false)
            if (error) {
              // eslint-disable-next-line no-console
              console.error('Error loading replies:', error)
            } else {
              setIsRepliesExpanded(true)
            }
          },
        },
      )
    }
  }, [commentIdToExpand, comment.id, isRepliesExpanded, hasReplies, refetch])

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

  const renderCommentsReplies = () => {
    const CommentsList = lazy(() => import('../CommentsList'))
    return (
      <CommentsList
        target={comment as CommentsList_comments$key}
        subscriptionsEnabled
        threadDepth={threadDepth + 1}
        onEdit={onEdit}
        onReply={onReply}
        {...CommentsListProps}
      />
    )
  }

  if (!comment) {
    return null
  }

  const dividersArray =
    threadDepth > 0 ? Array.from({ length: threadDepth }, (_, index) => index) : []

  return (
    <>
      <View style={styles.threadDepthContainer}>
        {threadDepth > 0 &&
          dividersArray.map((index) => (
            <View key={`vertical-divider-${index}`} style={styles.threadDepthDivider} />
          ))}
        <Pressable onLongPress={handleLongPress} style={{ flex: 1 }}>
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
              {hasReplies && (
                <CommentShowRepliesButton
                  onShowReplies={showReplies}
                  totalRepliesCount={comment.commentsCount?.total ?? 0}
                />
              )}
            </View>
          </View>
        </Pressable>
      </View>
      {isRepliesExpanded && !isLoadingReplies && renderCommentsReplies()}
      <BottomDrawer
        bottomDrawerRef={bottomDrawerRef}
        handleSheetChanges={handleSheetChanges}
        snapPoints={['30%']}
      >
        <View style={styles.bottomDrawerActionContainer}>
          <Pressable onPress={() => handleMenuAction('share')} style={styles.bottomDrawerPressable}>
            <ShareIcon width={20} height={20} color={theme.colors.object.high} />
            <Text variant="body2" color="high">
              Share Comment
            </Text>
          </Pressable>
          {comment.canPin && (
            <Pressable onPress={() => handleMenuAction('pin')} style={styles.bottomDrawerPressable}>
              <PinIcon width={20} height={20} color={theme.colors.object.high} />
              <Text variant="body2" color="high">
                Pin Comment
              </Text>
            </Pressable>
          )}
          {comment.canChange && (
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
        {comment.canDelete && (
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
    </>
  )
}

export default CommentItem
