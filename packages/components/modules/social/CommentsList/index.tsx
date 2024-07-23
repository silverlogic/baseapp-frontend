import { FC, useMemo } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import DefaultCommentItem from '../CommentItem'
import { NUMBER_OF_COMMENTS_TO_LOAD_NEXT } from '../constants'
import { useCommentList } from '../graphql/queries/CommentsList'
import CommentsSubscription from '../graphql/subscriptions/CommentsSubscription'
import { CommentsListProps } from './types'

const CommentsList: FC<CommentsListProps> = ({
  target: targetRef,
  profileId,
  subscriptionsEnabled,
  onReplyClick,
  CommentItem = DefaultCommentItem,
  CommentItemProps,
  VirtuosoProps,
}) => {
  const { data: target, loadNext, isLoadingNext, hasNext } = useCommentList(targetRef)

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
        profileId={profileId}
        currentThreadDepth={1}
        subscriptionsEnabled={subscriptionsEnabled}
        onReplyClick={onReplyClick}
        {...CommentItemProps}
      />
    )
  }

  const renderHeader = () => {
    if (comments.length === 0) return null

    return <div className="h-2" />
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return <LoadingState sx={{ paddingTop: 3 }} CircularProgressProps={{ size: 15 }} />
  }

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <div className="overflow-x-auto">
        <Virtuoso
          useWindowScroll
          data={comments}
          overscan={NUMBER_OF_COMMENTS_TO_LOAD_NEXT}
          itemContent={(_index, comment) => renderCommentItem(comment)}
          components={{
            Header: renderHeader,
            Footer: renderLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext(NUMBER_OF_COMMENTS_TO_LOAD_NEXT)
            }
          }}
          {...VirtuosoProps}
        />
      </div>
    </>
  )
}

export default CommentsList
