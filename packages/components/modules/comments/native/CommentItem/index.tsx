import { FC, Suspense, lazy, useMemo } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { type Href, useRouter } from 'expo-router'
import { Pressable } from 'react-native'

import { Timestamp as DefaultTimestamp } from '../../../__shared__/native'
import { DEFAULT_MAX_THREAD_DEPTH, useCommentItem } from '../../common'
import CommentShowRepliesButton from '../CommentShowRepliesButton'
import { useCommentActionsContext } from '../context/CommentActionsProvider'
import CommentPinBadge from './CommentPinBadge'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import { createStyles } from './styles'
import { CommentItemProps } from './types'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  threadDepth = 0,
  maxThreadDepth = DEFAULT_MAX_THREAD_DEPTH,
  RepliesList,
  RepliesListProps,
  Timestamp = DefaultTimestamp,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const DefaultCommentsList = useMemo(() => lazy(() => import('../CommentsList')), [])

  const SelectedRepliesList = RepliesList ?? DefaultCommentsList

  const {
    comment,
    isRepliesExpanded,
    isLoadingReplies,
    showReplies,
    hideReplies,
    setAsReplyTarget,
    hasUser,
    hasReplies,
    canReply,
  } = useCommentItem({ comment: commentRef, threadDepth, maxThreadDepth })
  const { openCommentActions } = useCommentActionsContext()
  const router = useRouter()

  const styles = createStyles()

  // Navigate only to a registered urlPath: the id fallback (`/profile/<id>`) is a web route
  // with no native equivalent — the [...path] catch-all would land on "Not Found".
  const profileUrlPath = comment?.profile?.urlPath?.path
  const goToProfile = () => {
    if (!hasUser || !profileUrlPath) return
    router.push(profileUrlPath as Href)
  }

  const openActions = () => openCommentActions(comment)

  const renderCommentsReplies = () => {
    if (!isRepliesExpanded || isLoadingReplies || !canReply) {
      return null
    }

    const CommentsListComponent = (
      <SelectedRepliesList
        target={comment}
        subscriptionsEnabled
        threadDepth={threadDepth + 1}
        maxThreadDepth={maxThreadDepth}
        isReplyList
        onHideReplies={hideReplies}
        {...RepliesListProps}
      />
    )

    if (!RepliesList) {
      return <Suspense fallback={null}>{CommentsListComponent}</Suspense>
    }
    return CommentsListComponent
  }

  if (!comment) {
    return null
  }

  return (
    <>
      <Pressable onLongPress={openActions}>
        <View style={styles.rootContainer}>
          <View style={styles.avatarContainer}>
            {/* onLongPress mirrors the row's handler: without it, a long press starting on
                the avatar/name would be claimed by the inner pressable and never open the
                action sheet. */}
            <Pressable onPress={goToProfile} onLongPress={openActions}>
              <AvatarWithPlaceholder imgSource={comment.profile?.image?.url} />
            </Pressable>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.headerContainer}>
              <Pressable onPress={goToProfile} onLongPress={openActions}>
                <Text variant="subtitle2" color="high">
                  {comment.profile?.name}
                </Text>
              </Pressable>
              {comment.isPinned && <CommentPinBadge />}
            </View>
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
                {/* hasUser: replying targets the author; a deleted-user comment would render
                    an enabled button whose shared handler no-ops (setAsReplyTarget guards on
                    hasUser), so hide it instead. */}
                {canReply && hasUser && (
                  <CommentReplyButton
                    onReply={setAsReplyTarget}
                    commentId={comment.id}
                    shouldUseBottomSheetSafeComponents
                  />
                )}
              </View>
              <View style={styles.timestampContainer}>
                <Timestamp date={comment.created} />
              </View>
            </View>
            {hasReplies && !isRepliesExpanded && (
              <CommentShowRepliesButton
                onShowReplies={showReplies}
                totalRepliesCount={comment.commentsCount?.total ?? 0}
                isLoading={isLoadingReplies}
              />
            )}
          </View>
        </View>
      </Pressable>
      {renderCommentsReplies()}
    </>
  )
}

export default CommentItem
