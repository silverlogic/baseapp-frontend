import { FC, lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

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
  onLongPress,
  threadDepth = 0,
  onReply,
  commentIdToExpand,
  RepliesList: RepliesListProp,
  RepliesListProps,
  Timestamp = DefaultTimestamp,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const DefaultCommentsList = useMemo(() => lazy(() => import('../CommentsList')), [])

  const RepliesList = RepliesListProp ?? DefaultCommentsList
  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false)
  const [isLoadingReplies, setIsLoadingReplies] = useState(false)
  const [comment, refetch] = useRefetchableFragment<
    CommentItemRefetchQuery,
    CommentItem_comment$key
  >(CommentItemFragmentQuery, commentRef)

  const styles = createStyles()

  // const canReply = comment.canReply
  const replyCount = comment.commentsCount?.total ?? 0
  const hasReplies = replyCount > 0

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

  const hideReplies = useCallback(() => {
    setIsRepliesExpanded(false)
  }, [])

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

  const renderCommentsReplies = () => {
    const CommentsListComponent = (
      <RepliesList
        target={comment}
        subscriptionsEnabled
        threadDepth={threadDepth + 1}
        onReply={onReply}
        onLongPress={onLongPress}
        isReplyList
        onHideReplies={hideReplies}
        {...RepliesListProps}
      />
    )

    if (!RepliesListProp) {
      return <Suspense fallback={null}>{CommentsListComponent}</Suspense>
    }
    return CommentsListComponent
  }

  if (!comment) {
    return null
  }

  if (comment.id === 'Q29tbWVudDo3') {
    console.log('--------------------------------')
    console.log('comment', comment)
    console.log('threadDepth', threadDepth)
    console.log('canReply', comment?.canReply)
    console.log('----------------X---------------')
  }

  return (
    <>
      <Pressable onLongPress={() => onLongPress?.(comment)}>
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
                {/* {canReply && ( */}
                <CommentReplyButton
                  onReply={replyToComment}
                  commentId={comment.id}
                  shouldUseBottomSheetSafeComponents
                />
                {/* )} */}
              </View>
              <View style={styles.timestampContainer}>
                <Timestamp date={comment.created} />
              </View>
            </View>
            {threadDepth === 0 && hasReplies && !isRepliesExpanded && (
              <CommentShowRepliesButton
                onShowReplies={showReplies}
                totalRepliesCount={comment.commentsCount?.total ?? 0}
              />
            )}
            </View>
          </View>
        </Pressable>
      {isRepliesExpanded && !isLoadingReplies && renderCommentsReplies()}
    </>
  )
}

export default CommentItem
