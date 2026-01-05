import { FC, useMemo } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { CommentsSubscription, useCommentList } from '../../common'
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
  CommentItem,
  CommentItemProps,
  CommentsListProps = {},
}) => {
  const CommentItemComponent = CommentItem ?? getDefaultCommentItem()
  const theme = useTheme()
  const styles = createStyles(theme)
  const { data: target } = useCommentList(targetRef)
  const comments = useMemo(
    () => target?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [target?.comments?.edges],
  )

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
        CommentsListProps={CommentsListProps}
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
      {threadDepth > 0 && <View style={styles.threadDepthDivider} />}
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <View style={styles.listContainer} {...CommentsListProps}>
        {
          // TODO (another story): paginate properly
          comments.map((comment) => renderCommentItem(comment))
        }
      </View>
    </View>
  )
}

export default CommentsList
