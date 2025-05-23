import { FC, useMemo } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { CommentsSubscription, NUMBER_OF_COMMENTS_TO_LOAD_NEXT, useCommentList } from '../../common'
import DefaultCommentItem from '../CommentItem'
import type { CommentsListProps } from './types'

const CommentsList: FC<CommentsListProps> = ({
  target: targetRef,
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
        currentThreadDepth={1}
        subscriptionsEnabled={subscriptionsEnabled}
        onReplyClick={onReplyClick}
        enableDelete
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

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more comments"
      />
    )
  }

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <div className="overflow-x-auto hide-scrollbar">
        <Virtuoso
          useWindowScroll
          data={comments}
          // TODO: using overscan can cause Maximum call stack size exceeded error
          // overscan={NUMBER_OF_COMMENTS_TO_LOAD_NEXT}
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
