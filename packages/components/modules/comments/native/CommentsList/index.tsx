import { FC, useMemo } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

import { CommentsSubscription, useCommentList } from '../../common'
import { createStyles } from './styles'
import type { CommentsListProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDefaultCommentItem = () => require('../CommentItem').default

const CommentsList: FC<CommentsListProps> = ({
  onEdit = () => {},
  onReply = () => {},
  commentIdToExpand,
  target: targetRef,
  subscriptionsEnabled,
  threadDepth = 0,
  CommentItem,
  CommentItemProps,
  CommentsListProps = {},
}) => {
  const { data: target } = useCommentList(targetRef)
  const CommentItemComponent = CommentItem ?? getDefaultCommentItem()

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
        onEdit={onEdit}
        onReply={onReply}
        commentIdToExpand={commentIdToExpand}
        CommentsListProps={CommentsListProps}
        {...CommentItemProps}
      />
    )
  }

  const styles = createStyles()

  if (!target) {
    return null
  }

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <View style={styles.listContainer} {...CommentsListProps}>
        {
          // TODO (another story): paginate properly
          comments.map((comment) => renderCommentItem(comment))
        }
      </View>
    </>
  )
}

export default CommentsList
