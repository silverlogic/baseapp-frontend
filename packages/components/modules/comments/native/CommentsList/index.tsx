import { FC, useCallback, useMemo } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { CommentsSubscription, NUMBER_OF_COMMENTS_TO_LOAD_NEXT, useCommentList } from '../../common'
import CommentHideRepliesButton from '../CommentItem/CommentHideRepliesButton'
import CommentShowRepliesButton from '../CommentItem/CommentShowRepliesButton'
import { createStyles } from './styles'
import type { CommentsListProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDefaultCommentItem = () => require('../CommentItem').default

const CommentsList: FC<CommentsListProps> = ({
  onReply = () => {},
  commentIdToExpand,
  onLongPress,
  target: targetRef,
  subscriptionsEnabled,
  threadDepth = 0,
  maxThreadDepth = 5,
  isReplyList = false,
  onHideReplies = () => {},
  CommentItem,
  CommentItemProps,
  CommentsListProps = {},
}) => {
  const CommentItemComponent = CommentItem ?? getDefaultCommentItem()
  const theme = useTheme()
  const styles = createStyles(theme)
  const { data: target, loadNext, hasNext } = useCommentList(targetRef)
  const comments = useMemo(
    () => target?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [target?.comments?.edges],
  )

  const totalRepliesCount = target?.commentsCount?.total ?? 0
  const loadedRepliesCount = comments.length
  const remainingRepliesCount = Math.max(0, totalRepliesCount - loadedRepliesCount)
  const shouldShowHideRepliesButton = isReplyList && !hasNext
  const shouldShowShowMoreRepliesButton = isReplyList && hasNext

  const showMoreReplies = useCallback(() => {
    loadNext(NUMBER_OF_COMMENTS_TO_LOAD_NEXT)
  }, [loadNext])

  const renderCommentItem = (comment: any) => {
    if (!comment) return null

    return (
      <CommentItemComponent
        target={target}
        key={`comment-${comment.id}`}
        comment={comment}
        onReply={onReply}
        threadDepth={threadDepth}
        maxThreadDepth={maxThreadDepth}
        commentIdToExpand={commentIdToExpand}
        RepliesListProps={CommentsListProps}
        onLongPress={onLongPress}
        {...CommentItemProps}
      />
    )
  }

  if (!target) {
    return null
  }

  return (
    <View style={styles.threadDepthContainer}>
      {isReplyList && <View style={styles.threadDepthDivider} />}
      <View style={styles.listContainer}>
        {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
        <View style={styles.listContainer} {...CommentsListProps}>
          {
            // TODO (another story): paginate properly
            comments.map((comment) => renderCommentItem(comment))
          }
        </View>
        {shouldShowShowMoreRepliesButton && (
          <CommentShowRepliesButton
            onShowReplies={showMoreReplies}
            totalRepliesCount={remainingRepliesCount}
            body="Show more replies"
          />
        )}
        {shouldShowHideRepliesButton && <CommentHideRepliesButton onHideReplies={onHideReplies} />}
      </View>
    </View>
  )
}

export default CommentsList
