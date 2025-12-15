import { FC, useMemo } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

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
  const { data: target } = useCommentList(targetRef)

  const comments = useMemo(
    () => target?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [target?.comments?.edges],
  )

  const renderCommentItem = (comment: any) => {
    if (!comment) return null

    return (
      <CommentItem
        target={target}
        key={`comment-${comment.id}`}
        comment={comment}
        onEdit={onEdit}
        {...CommentItemProps}
      />
    )
  }

  const styles = createStyles()

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <View style={styles.listContainer}>
        {
          // TODO (another story): paginate properly
          comments.map((comment) => renderCommentItem(comment))
        }
      </View>
    </>
  )
}

export default CommentsList
