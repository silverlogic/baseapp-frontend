import { FC, useCallback, useEffect, useRef } from 'react'

import { InfiniteScrollerView, View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import {
  CommentsSubscription,
  DEFAULT_MAX_THREAD_DEPTH,
  NUMBER_OF_COMMENTS_TO_LOAD_NEXT,
  useCommentList,
} from '../../common'
import CommentShowRepliesButton from '../CommentShowRepliesButton'
import CommentHideRepliesButton from './CommentHideRepliesButton'
import { createStyles } from './styles'
import type { CommentsListProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDefaultCommentItem = () => require('../CommentItem').default

const CommentsList: FC<CommentsListProps> = ({
  target: targetRef,
  subscriptionsEnabled,
  threadDepth = 0,
  maxThreadDepth = DEFAULT_MAX_THREAD_DEPTH,
  isReplyList = false,
  onHideReplies = () => {},
  CommentItem,
  CommentItemProps,
  CommentsListProps = {},
  ListHeaderComponent,
  onRefetchReady,
}) => {
  const CommentItemComponent = CommentItem ?? getDefaultCommentItem()
  const theme = useTheme()
  const styles = createStyles(theme)
  const {
    data: target,
    comments,
    loadNext,
    hasNext,
    isLoadingNext,
    refetchWithOrder,
  } = useCommentList(targetRef)

  const onRefetchReadyRef = useRef(onRefetchReady)
  onRefetchReadyRef.current = onRefetchReady

  useEffect(() => {
    if (onRefetchReadyRef.current) {
      onRefetchReadyRef.current(refetchWithOrder)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        key={`comment-${comment.id}`}
        comment={comment}
        threadDepth={threadDepth}
        maxThreadDepth={maxThreadDepth}
        RepliesListProps={CommentsListProps}
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
        {isReplyList ? (
          <View style={styles.listContainer} {...CommentsListProps}>
            {
              // TODO (another story): paginate properly
              comments.map((comment) => renderCommentItem(comment))
            }
          </View>
        ) : (
          <InfiniteScrollerView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ListHeaderComponent={ListHeaderComponent}
            data={comments}
            renderItem={({ item }) => renderCommentItem(item)}
            onEndReached={() => {
              if (hasNext) {
                showMoreReplies()
              }
            }}
            onEndReachedThreshold={0.9}
            isLoading={isLoadingNext}
          />
        )}
        {shouldShowShowMoreRepliesButton && (
          <CommentShowRepliesButton
            onShowReplies={showMoreReplies}
            totalRepliesCount={remainingRepliesCount}
            body="Show more replies"
            isLoading={isLoadingNext}
          />
        )}
        {shouldShowHideRepliesButton && <CommentHideRepliesButton onHideReplies={onHideReplies} />}
      </View>
    </View>
  )
}

export default CommentsList
