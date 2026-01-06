import { FC, useCallback, useMemo } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import {
  CommentsSubscription,
  NUMBER_OF_COMMENTS_TO_LOAD_NEXT,
  useCommentList,
} from '../../common'
import { createStyles } from './styles'
import type { CommentsListProps } from './types'
import CommentHideRepliesButton from '../CommentItem/CommentHideRepliesButton'
import CommentShowRepliesButton from '../CommentItem/CommentShowRepliesButton'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDefaultCommentItem = () => require('../CommentItem').default

const CommentsList: FC<CommentsListProps> = ({
  onReply = () => {},
  commentIdToExpand,
  onLongPress,
  target: targetRef,
  subscriptionsEnabled,
  threadDepth = 0,
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

  const pageInfoHasNextPage = target?.comments?.pageInfo?.hasNextPage ?? false
  const hasMorePages = pageInfoHasNextPage || hasNext

  const totalRepliesCount = target?.commentsCount?.total ?? 0
  const loadedRepliesCount = comments.length
  const remainingRepliesCount = Math.max(0, totalRepliesCount - loadedRepliesCount)
  const shouldShowHideRepliesButton = isReplyList && remainingRepliesCount === 0
  const shouldShowShowMoreRepliesButton = isReplyList && remainingRepliesCount > 0

  // if (target?.id === 'Q29tbWVudDo3' && isReplyList) {
  //   console.log('--------------------------------')
  //   console.log('target', target)
  //   console.log('comments', comments)
  //   console.log('hasNext', hasNext)
  //   console.log('hasMorePages', hasMorePages)
  //   console.log('remainingRepliesCount', remainingRepliesCount)
  //   console.log('shouldShowShowMoreRepliesButton', shouldShowShowMoreRepliesButton)
  //   console.log('----------------X---------------')
  // }

  const showMoreReplies = useCallback(() => {
    if (remainingRepliesCount > 0 && loadNext) {
      loadNext(NUMBER_OF_COMMENTS_TO_LOAD_NEXT)
    }
  }, [remainingRepliesCount, loadNext])

  const renderCommentItem = (comment: any) => {
    if (!comment) return null

    return (
      <CommentItemComponent
        target={target}
        key={`comment-${comment.id}`}
        comment={comment}
        threadDepth={threadDepth}
        onReply={onReply}
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
            // onShowReplies={() => {
            //   console.log('--------------------------------')
            //   console.log('show more replies')
            //   console.log('----------------X---------------')
            // }}
            onShowReplies={showMoreReplies}
            totalRepliesCount={remainingRepliesCount}
            body="Show more replies"
          />
        )}
        {shouldShowHideRepliesButton && (
          <CommentHideRepliesButton
            onHideReplies={onHideReplies}
          />
        )}
      </View>
    </View>
  )
}

export default CommentsList
